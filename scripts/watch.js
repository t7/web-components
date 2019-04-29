const config = require('./config/rollup.config.js');
const fse = require('fse');
const gzipSize = require('gzip-size');
const path = require('path');
const rollup = require('rollup');

const opts = {
	componentBase: path.basename(process.cwd()),
	componentDir: process.cwd(),
	componentName: path.basename(process.cwd()).replace(/(?:^|-)([a-z])/g, ($0, $1) => $1.toUpperCase()),
	ghpagesDir: path.join(path.dirname(__dirname), '.gh-pages'),
	rootDir: path.dirname(__dirname),
	templatesDir: path.join(__dirname, 'templates')
};

function startWatcher () {
	let hasBrowserJS = false;

	try {
		hasBrowserJS = fse.readFileSync('src/browser.js', 'utf8');

		opts.iifeName = (hasBrowserJS.match(/export default (?:(?:class|function) )?([A-z0-9_-]+)/) || [opts.componentName])[1];
	} catch (error) {
		opts.iifeName = (fse.readFileSync('src/index.js', 'utf8').match(/export default (?:(?:class|function) )?([A-z0-9_-]+)/) || [opts.componentName])[1];
	}

	const nodeConfig = {
		...config,
		input: 'src/index.js',
		output: [
			{ file: 'index.js', format: 'cjs', sourcemap: false, strict: false },
			{ file: 'index.mjs', format: 'esm', sourcemap: false, strict: false }
		],
		plugins: config.plugins.slice(0, -1)
	};

	const browserConfig = {
		...config,
		input: hasBrowserJS ? 'src/browser.js' : 'src/index.js',
		output: { file: 'browser.js', format: 'iife', name: opts.iifeName, sourcemap: false, strict: false }
	};

	const watcher = rollup.watch(nodeConfig);

	watcher.on('event', event => {
		if (event.code === 'END') {
			Promise.all([
				readPackageJson(),
				rollup.rollup(browserConfig).then(
					bundle => bundle.write(browserConfig.output)
				)
			]).then(
				([ pkg, { output } ]) => {
					opts.code = output[0].code;
					opts.codeSize = gzipSize.sync(opts.code, { level: 9 });
					opts.pkg = pkg;
					opts.description = `${opts.componentName} is ${opts.pkg.description[0].toLowerCase()}${opts.pkg.description.slice(1)}.`;

					return Promise.all([
						generateExampleJs(),
						generateExampleFile()
					]).then(
						() => {
							console.log(`browser.js is ${opts.codeSize} bytes`); // eslint-disable-line no-console
						}
					)
				}
			);
		}
	});
}

function generateExampleJs () {
	const ghpagesIndexJs = path.join(opts.ghpagesDir, opts.componentBase, 'index.js');

	return fse.writeFile(ghpagesIndexJs, opts.code);
}

function generateExampleFile () {
	const componentExampleFile = path.join(opts.componentDir, 'src', 'example.html');
	const templatesExampleFile = path.join(opts.templatesDir, 'example.html');
	const ghpagesIndexHtml = path.join(opts.ghpagesDir, opts.componentBase, 'index.html');

	return Promise.all([
		fse.readFile(componentExampleFile, 'utf8'),
		fse.readFile(templatesExampleFile, 'utf8')
	]).then(([componentExampleHtml, templatesExampleHtml]) => {
		const templatesExampleCode = `return (\`${templatesExampleHtml}\`)`;
		const templateFunction = new Function(templatesExampleCode);

		opts.html = componentExampleHtml;

		const templateReturnValue = templateFunction.call(opts);

		return fse.writeFile(ghpagesIndexHtml, String(templateReturnValue));
	})
}

function readPackageJson () {
	return fse.readJson(path.join(opts.componentDir, 'package.json'));
}

startWatcher();

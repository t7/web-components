const { terser } = require('rollup-plugin-terser');
const babel = require('rollup-plugin-babel');
const babelConfig = require('./babel.config')
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

module.exports = {
	plugins: [
		nodeResolve(),
		commonjs({
			include: 'node_modules/**'
		}),
		babel(babelConfig),
		terser({
			compress: {
				unsafe: true
			}
		}),
		compressIIFE()
	]
};

function compressIIFE () {
	return {
		name: 'compress-iife',
		renderChunk (code, chunk, options) {
			if (options.format === 'iife') {
				const xRegExp = new RegExp(`^(?:var ${options.name}=function\\(\\){return function)(\\([\\W\\w]+})(?:}\\(\\);)$`);

				if (xRegExp.test(code)) {
					const [, body] = code.match(xRegExp);

					const newCode = `function ${options.name}${body}`;

					return newCode;
				}
			}

			return null;
		}
	};
}

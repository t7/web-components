const browserslist = require('fs').readFileSync('../../.browserslistrc', 'utf8').trim().replace(/\n+/g, ', ');
const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
	plugins: [
		['@babel/plugin-proposal-class-properties', {
			loose: true
		}],
		['import-postcss', {
			plugins: [
				postcssPresetEnv({
					browsers: browserslist,
					stage: 0,
					features: {
						'color-mod-function': { unresolved: 'warn' },
						'logical-properties-and-values': {
							dir: 'ltr'
						}
					}
				}),
				cssnano()
			]
		}]
	],
	presets: [
		['@babel/preset-env', {
			corejs: 3,
			loose: true,
			modules: false,
			targets: browserslist,
			useBuiltIns: 'entry'
		}]
	]
};

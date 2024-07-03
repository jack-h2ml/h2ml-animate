/**
 * WordPress Dependencies
 */
const wordpressConfig = require('@wordpress/scripts/config/webpack.config.js');

/**
 * External Dependencies
 */
const path = require('path');

/**
 * Export
 */

function basicConfig(config) {
	return {
		...config,
		module: {
			...config.module,
			rules: [
				...config.module.rules,
				{
					test: /\.svg$/i,
					type: 'asset/source'
				},
				{
					test: /\.svg$/i,
					include: [
						path.resolve(__dirname, 'images')
					],
					type: 'asset/resource'
				}
			],
		}
	};
}

/**
 * 
 */

module.exports = (() => {
	if (Array.isArray(wordpressConfig)) {
		const [scriptConfig, moduleConfig] = wordpressConfig;

		const extendedScriptConfig = basicConfig(scriptConfig);
		const extendedModuleConfig = basicConfig(moduleConfig);

		return [extendedScriptConfig, extendedModuleConfig];
	} else {
		return basicConfig(blocksScriptConfig(wordpressConfig));
	}
})();
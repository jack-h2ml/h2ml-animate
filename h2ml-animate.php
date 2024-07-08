<?php

/*
Plugin Name: H2ML Animate
Author: Jack Notman
Version: 1.0.12
*/

/**
 * Handle Updates
 */

require 'plugin-update-checker-5.0/plugin-update-checker.php';
use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

add_action('init', function() {
	$themeUpdateChecker = PucFactory::buildUpdateChecker(
		'https://github.com/jack-h2ml/h2ml-animate/',
		__FILE__,
		'h2ml-animate'
	);
	$themeUpdateChecker->setBranch('main');
});


/**
 * Register the Blocks
 */

add_action('init', function() {
	foreach (glob(__DIR__ . "/blocks/build/*") as $blockPath) {
		register_block_type($blockPath);
	}
});
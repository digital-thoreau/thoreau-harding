<?php
/**
 * Thoreau Harding
 *
 * Plugin Name:       Thoreau Harding
 * Description:       Better handling of Walter Harding comments on the Digital Thoreau Website.
 * Plugin URI:        https://github.com/digital-thoreau/thoreau-harding
 * GitHub Plugin URI: https://github.com/digital-thoreau/thoreau-harding
 * Version:           1.0
 * Author:            Christian Wach
 * Author URI:        https://haystack.co.uk
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Requires at least: 5.7
 * Requires PHP:      7.4
 * Text Domain:       thoreau-harding
 * Domain Path:       /languages
 *
 * @package Thoreau_Harding
 * @link    https://github.com/digital-thoreau/thoreau-harding
 * @license GPL v2 or later
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

// Set our version here.
define( 'THOREAU_HARDING_VERSION', '1.0' );

// Store reference to this file.
if ( ! defined( 'THOREAU_HARDING_FILE' ) ) {
	define( 'THOREAU_HARDING_FILE', __FILE__ );
}

// Store URL to this plugin's directory.
if ( ! defined( 'THOREAU_HARDING_URL' ) ) {
	define( 'THOREAU_HARDING_URL', plugin_dir_url( THOREAU_HARDING_FILE ) );
}

// Store PATH to this plugin's directory.
if ( ! defined( 'THOREAU_HARDING_PATH' ) ) {
	define( 'THOREAU_HARDING_PATH', plugin_dir_path( THOREAU_HARDING_FILE ) );
}

/**
 * Thoreau Harding Class.
 *
 * A class that encapsulates plugin functionality.
 *
 * @since 1.0
 */
class Thoreau_Harding {

	/**
	 * Constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {

		// Register hooks.
		$this->register_hooks();

	}

	/**
	 * Register WordPress hooks.
	 *
	 * @since 1.0
	 */
	public function register_hooks() {

		// Include scripts.
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ], 20 );

	}

	/**
	 * Enqueue any scripts needed by our public pages.
	 *
	 * @since 1.0
	 */
	public function enqueue_scripts() {

		// Enqueue our custom Javascript.
		wp_enqueue_script(
			'thoreau_harding_custom_js',
			THOREAU_HARDING_URL . 'assets/js/thoreau-harding.js',
			[ 'jquery' ],
			THOREAU_HARDING_VERSION,
			false
		);

	}

}

/**
 * Utility to get a reference to this plugin.
 *
 * @since 1.0
 *
 * @return Thoreau_Harding $plugin The plugin reference.
 */
function thoreau_harding_plugin() {

	// Instantiate if not yet done.
	static $plugin;
	if ( ! isset( $plugin ) ) {
		$plugin = new Thoreau_Harding();
	}

	// --<
	return $plugin;

}

// Bootstrap the plugin.
thoreau_harding_plugin();

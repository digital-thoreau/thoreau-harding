<?php
/**
 * Plugin Name: Thoreau Harding
 * Plugin URI: https://github.com/digital-thoreau/thoreau-harding
 * Description: Better handling of Walter Harding comments on the Digital Thoreau Website.
 * Author: Christian Wach
 * Version: 1.0
 * Author URI: https://haystack.co.uk
 *
 * @package Thoreau_Harding
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

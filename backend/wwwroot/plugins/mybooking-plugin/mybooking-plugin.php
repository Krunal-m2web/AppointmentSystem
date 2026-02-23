<?php
/**
 * Plugin Name: MyBooking Appointment System
 * Description: Embeds the MyBooking appointment widget into your WordPress site.
 * Version: 1.0.0
 * Author: MyBooking Team
 * Text Domain: mybooking-plugin
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

// Define plugin constants
define( 'MYBOOKING_VERSION', '1.0.0' );
define( 'MYBOOKING_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'MYBOOKING_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

// Include the shortcode and block handlers
require_once MYBOOKING_PLUGIN_DIR . 'includes/class-mybooking-shortcodes.php';
require_once MYBOOKING_PLUGIN_DIR . 'includes/class-mybooking-blocks.php';
require_once MYBOOKING_PLUGIN_DIR . 'includes/class-mybooking-classic.php';

/**
 * Begins execution of the plugin.
 */
function run_mybooking_plugin() {
	$plugin_shortcodes = new MyBooking_Shortcodes();
	$plugin_shortcodes->init();

	$plugin_blocks = new MyBooking_Blocks();
	$plugin_blocks->init();

	$plugin_classic = new MyBooking_Classic();
	$plugin_classic->init();
}

run_mybooking_plugin();

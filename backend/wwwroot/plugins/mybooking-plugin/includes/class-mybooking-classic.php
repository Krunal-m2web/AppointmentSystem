<?php

class MyBooking_Classic {

	public function init() {
		add_action( 'init', array( $this, 'register_button' ) );
	}

	public function register_button() {
		// specific checks for access
		if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) {
			return;
		}

		if ( get_user_option( 'rich_editing' ) !== 'true' ) {
			return;
		}

		add_filter( 'mce_external_plugins', array( $this, 'add_tinymce_plugin' ) );
		add_filter( 'mce_buttons', array( $this, 'add_tinymce_button' ) );
	}

	public function add_tinymce_plugin( $plugin_array ) {
		$plugin_array['mybooking_button'] = MYBOOKING_PLUGIN_URL . 'assets/mybooking-tinymce.js';
		return $plugin_array;
	}

	public function add_tinymce_button( $buttons ) {
		array_push( $buttons, 'mybooking_button' );
		return $buttons;
	}
}

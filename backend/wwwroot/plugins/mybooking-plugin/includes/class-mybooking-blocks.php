<?php

class MyBooking_Blocks {

	public function init() {
		add_action( 'init', array( $this, 'register_blocks' ) );
	}

	public function register_blocks() {
		// Register the editor script
		wp_register_script(
			'mybooking-blocks-script',
			MYBOOKING_PLUGIN_URL . 'assets/mybooking-blocks.js',
			array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
			MYBOOKING_VERSION,
			true
		);

		// Register the block
		register_block_type( 'mybooking/form', array(
			'editor_script' => 'mybooking-blocks-script',
			'render_callback' => array( 'MyBooking_Shortcodes', 'render_booking_form' ),
			'attributes' => array(
				'company' => array(
					'type' => 'string',
					'default' => '',
				),
				'theme' => array(
					'type' => 'string',
					'default' => 'light',
				),
			),
		) );
	}
}

<?php

class MyBooking_Shortcodes {

	/**
	 * Initialize hooks.
	 */
	public function init() {
		add_shortcode( 'mybooking-form', array( __CLASS__, 'render_booking_form' ) );
		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'register_scripts' ) );
	}

	/**
	 * Register the embed script.
	 */
	public static function register_scripts() {
		// In a real scenario, this URL would be configurable via an options page.
		// For now, we point to the SaaS backend URL.
		$api_url = 'http://localhost:5289'; 
		
		wp_register_script( 
			'mybooking-embed', 
			$api_url . '/widget/embed.js', 
			array(), 
			MYBOOKING_VERSION, 
			true 
		);
	}

	/**
	 * Render the [mybooking-form] shortcode.
	 */
	public static function render_booking_form( $atts ) {
		$atts = shortcode_atts(
			array(
				'company' => '',
				'service' => '',
				'staff'   => '',
                'theme'   => 'light',
			),
			$atts,
			'mybooking-form'
		);

		if ( empty( $atts['company'] ) ) {
			// For Blocks, we might want a friendlier message or just return empty if in editor
			return '<div class="mybooking-error" style="border:1px solid red; padding:10px; color:red;">MyBooking: Please select a company in the block settings.</div>';
		}

        // Enqueue the embed script
        wp_enqueue_script( 'mybooking-embed' );

		// Render the container div
        // The embed.js script will auto-detect elements with class 'mybooking-widget' (if we update it)
        // OR we can stick to the embed.js data-attribute API.
        
        // Let's generate a unique ID for this instance
        $unique_id = 'booking-widget-' . uniqid();

        // Output the script tag required for the current embed.js to pick it up
        // Currently embed.js looks for script tags with data-company.
        // To support MULTIPLE widgets or generic shortcode placement, we need to adapt embed.js slightly 
        // OR we can manually initialize it here using inline JS.
        
        // Approach: Output the container and an inline script to init this specific instance.
		ob_start();
		?>
        <div id="<?php echo esc_attr( $unique_id ); ?>" class="mybooking-widget-container"></div>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                if (window.BookingWidget) {
                    window.BookingWidget.init({
                        companySlug: '<?php echo esc_js( $atts['company'] ); ?>',
                        containerId: '<?php echo esc_js( $unique_id ); ?>',
                        theme: '<?php echo esc_js( $atts['theme'] ); ?>',
                        // apiBaseUrl will use the default from the widget unless overridden
                    });
                }
            });
        </script>
		<?php
		return ob_get_clean();
	}
}

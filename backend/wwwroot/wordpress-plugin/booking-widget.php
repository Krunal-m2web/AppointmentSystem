<?php
/**
 * Plugin Name: Appointment Booking Widget
 * Plugin URI:  http://example.com
 * Description: Embeds the Appointment Booking Widget using a shortcode [booking_widget slug="your-company-slug"].
 * Version:     1.0.0
 * Author:      Appointment System
 * Author URI:  http://example.com
 * License:     GPL2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Register the shortcode [booking_widget]
 *
 * Usage: [booking_widget slug="my-company"]
 * If slug is not provided, it will display a message.
 */
function abw_render_widget( $atts ) {
	// Normalize attribute keys, lowercase
	$atts = shortcode_atts(
		array(
			'slug'  => '',
			'theme' => 'light',
		),
		$atts,
		'booking_widget'
	);

	$slug  = sanitize_text_field( $atts['slug'] );
	$theme = sanitize_text_field( $atts['theme'] );

	if ( empty( $slug ) ) {
		return '<p style="color:red;">Error: Please provide a company slug. Example: <code>[booking_widget slug="demo-company"]</code></p>';
	}

    // Define the backend URL (Update this in production to your actual domain)
    // For local dev, we assume the user needs to change this, or we build it dynamically.
    // Ideally, this plugin would have a settings page to set the API URL.
    // For this MVP, we hardcode the known backend URL (localhost:5289 for dev, or the production URL).
    // INSTRUCTION: Replace the URL below with your production backend URL before distributing.
    $api_url = 'http://localhost:5289'; 

	// Generate the embed code
    // We use a unique ID for the container to allow multiple widgets if needed (though usually one per page)
    $unique_id = 'booking-widget-' . uniqid();

	ob_start();
	?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="abw-booking-widget-container"></div>
    <script 
        src="<?php echo esc_url($api_url); ?>/widget/embed.js"
        data-company="<?php echo esc_attr($slug); ?>"
        data-container="<?php echo esc_attr($unique_id); ?>"
        data-theme="<?php echo esc_attr($theme); ?>"
        async
    ></script>
	<?php
	return ob_get_clean();
}
add_shortcode( 'booking_widget', 'abw_render_widget' );

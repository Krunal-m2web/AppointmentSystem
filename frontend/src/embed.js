/**
 * Booking Widget Embed Script
 * 
 * This lightweight loader script (~2KB) is what clients add to their websites.
 * It loads the main widget bundle and CSS from the CDN and auto-initializes.
 * 
 * Usage:
 *   <div id="booking-widget"></div>
 *   <script 
 *     src="https://cdn.yourapp.com/widget/v1/embed.js"
 *     data-company="your-company-slug"
 *     data-theme="light"
 *   ></script>
 */
(function() {
  'use strict';

  // Get configuration from script tag data attributes
  var currentScript = document.currentScript;
  if (!currentScript) {
    console.error('[BookingWidget] Unable to detect current script');
    return;
  }

  var config = {
    companySlug: currentScript.getAttribute('data-company'),
    containerId: currentScript.getAttribute('data-container') || 'booking-widget',
    theme: currentScript.getAttribute('data-theme') || 'light',
    apiBaseUrl: currentScript.getAttribute('data-api-url') || null
  };

  // Validate required config
  if (!config.companySlug) {
    console.error('[BookingWidget] Error: data-company attribute is required');
    return;
  }

  // Base URL for widget assets - defaults to your backend API
  // For production, update this to your deployed backend URL
  var CDN_BASE = currentScript.getAttribute('data-cdn') || 'http://localhost:5289/widget';

  // Prevent double loading
  if (window.BookingWidgetLoaded) {
    console.warn('[BookingWidget] Widget already loaded');
    return;
  }
  window.BookingWidgetLoaded = true;

  /**
   * Load JavaScript file
   */
  function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.crossOrigin = 'anonymous';
    script.onload = callback;
    script.onerror = function() {
      console.error('[BookingWidget] Failed to load widget bundle');
    };
    document.body.appendChild(script);
  }

  /**
   * Initialize the widget once loaded
   */
  function initWidget() {
    if (window.BookingWidget && typeof window.BookingWidget.init === 'function') {
      window.BookingWidget.init({
        companySlug: config.companySlug,
        containerId: config.containerId,
        theme: config.theme,
        apiBaseUrl: config.apiBaseUrl
      });
    } else {
      console.error('[BookingWidget] Widget API not found');
    }
  }

  /**
   * Wait for DOM ready then load resources
   */
  function onReady(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // Start loading
  onReady(function() {
    // Check if container exists
    var container = document.getElementById(config.containerId);
    if (!container) {
      console.error('[BookingWidget] Container #' + config.containerId + ' not found');
      return;
    }

    // Load widget bundle (CSS is injected automatically)
    loadScript(CDN_BASE + '/booking-widget.iife.js', initWidget);
  });
})();

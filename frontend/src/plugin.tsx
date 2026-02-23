import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, MemoryRouter } from 'react-router-dom';
import { BookingForm } from './components/BookingForm';
import './index.css';

/**
 * Configuration options for the BookingWidget
 */
interface WidgetConfig {
  /** Company slug (required) - identifies which company's booking page to show */
  companySlug: string;
  /** Custom API base URL (optional) - defaults to production API */
  apiBaseUrl?: string;
  /** Target container element ID (optional) - defaults to 'booking-widget' */
  containerId?: string;
  /** Theme preference (optional) - defaults to 'light' */
  theme?: 'light' | 'dark';
  /** Callback when booking is complete (optional) */
  onBookingComplete?: (details: BookingDetails) => void;
}

/**
 * Booking details returned after successful booking
 */
interface BookingDetails {
  id: number;
  serviceName: string;
  staffName: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  status: string;
}

/**
 * Internal widget state
 */
interface WidgetInstance {
  root: ReactDOM.Root | null;
  container: HTMLElement | null;
  config: WidgetConfig | null;
}

// Global widget instance
let widgetInstance: WidgetInstance = {
  root: null,
  container: null,
  config: null
};

/**
 * Wrapper component that provides routing context for the BookingForm
 */
function BookingWidget({ config }: { config: WidgetConfig }) {
  const handleComplete = (details: BookingDetails) => {
    if (config.onBookingComplete) {
      config.onBookingComplete(details);
    }
  };

  // Use MemoryRouter with initial entry for the company slug
  return (
    <MemoryRouter initialEntries={[`/book/${config.companySlug}`]}>
      <Routes>
        <Route 
          path="/book/:slug" 
          element={<BookingForm onComplete={handleComplete} />} 
        />
      </Routes>
    </MemoryRouter>
  );
}

/**
 * Initialize and render the booking widget
 */
function init(config: WidgetConfig): void {
  // Validate required config
  if (!config.companySlug) {
    console.error('[BookingWidget] Error: companySlug is required');
    return;
  }

  // Find or create container
  const containerId = config.containerId || 'booking-widget';
  let container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`[BookingWidget] Error: Container element #${containerId} not found`);
    return;
  }

  // Clean up existing instance if any
  if (widgetInstance.root) {
    destroy();
  }

  // Apply theme
  if (config.theme === 'dark') {
    container.classList.add('dark');
  }

  // Override API base URL if provided
  if (config.apiBaseUrl) {
    (window as any).__BOOKING_WIDGET_API_URL__ = config.apiBaseUrl;
  }

  // Create React root and render widget
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <BookingWidget config={config} />
    </React.StrictMode>
  );

  // Store instance
  widgetInstance = {
    root,
    container,
    config
  };

  console.log('[BookingWidget] Initialized for company:', config.companySlug);
}

/**
 * Destroy and cleanup the widget
 */
function destroy(): void {
  if (widgetInstance.root) {
    widgetInstance.root.unmount();
    console.log('[BookingWidget] Destroyed');
  }

  // Reset instance
  widgetInstance = {
    root: null,
    container: null,
    config: null
  };
}

/**
 * Check if widget is currently mounted
 */
function isInitialized(): boolean {
  return widgetInstance.root !== null;
}

/**
 * Get current configuration
 */
function getConfig(): WidgetConfig | null {
  return widgetInstance.config;
}

// Expose global API
const BookingWidgetAPI = {
  init,
  destroy,
  isInitialized,
  getConfig,
  version: '1.0.0'
};

// Attach to window object
declare global {
  interface Window {
    BookingWidget: typeof BookingWidgetAPI;
    __BOOKING_WIDGET_API_URL__?: string;
  }
}

window.BookingWidget = BookingWidgetAPI;

// Auto-initialize if script has data attributes
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const scripts = document.querySelectorAll('script[data-company]');
    scripts.forEach((script) => {
      const company = script.getAttribute('data-company');
      const container = script.getAttribute('data-container') || 'booking-widget';
      const theme = script.getAttribute('data-theme') as 'light' | 'dark' || 'light';
      
      if (company) {
        init({
          companySlug: company,
          containerId: container,
          theme
        });
      }
    });
  });
}

export { BookingWidgetAPI, init, destroy, isInitialized, getConfig };
export type { WidgetConfig, BookingDetails };

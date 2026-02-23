# Booking Widget Integration Guide

## Quick Start (2 Minutes)

### Step 1: Add Container

Add a container div where you want the booking widget to appear:

```html
<div id="booking-widget"></div>
```

### Step 2: Add Embed Script

Add this script before the closing `</body>` tag:

```html
<script
  src="https://cdn.yourapp.com/widget/v1/embed.js"
  data-company="YOUR_COMPANY_SLUG"
></script>
```

Replace `YOUR_COMPANY_SLUG` with your unique company identifier.

---

## Configuration Options

| Attribute        | Required | Default          | Description              |
| ---------------- | -------- | ---------------- | ------------------------ |
| `data-company`   | ✅ Yes   | —                | Your unique company slug |
| `data-container` | No       | `booking-widget` | Target element ID        |
| `data-theme`     | No       | `light`          | `light` or `dark`        |
| `data-api-url`   | No       | Production API   | Custom API URL           |
| `data-cdn`       | No       | Default CDN      | Custom CDN URL           |

---

## Advanced: JavaScript API

For more control, use the JavaScript API directly:

```html
<div id="my-booking-form"></div>
<script src="https://cdn.yourapp.com/widget/v1/booking-widget.iife.js"></script>
<link
  rel="stylesheet"
  href="https://cdn.yourapp.com/widget/v1/booking-widget.css"
/>
<script>
  BookingWidget.init({
    companySlug: "your-company",
    containerId: "my-booking-form",
    theme: "dark",
    onBookingComplete: function (details) {
      console.log("Booking completed:", details);
      // Your custom logic here
    },
  });
</script>
```

### Available Methods

| Method                          | Description               |
| ------------------------------- | ------------------------- |
| `BookingWidget.init(config)`    | Initialize the widget     |
| `BookingWidget.destroy()`       | Remove the widget         |
| `BookingWidget.isInitialized()` | Check if widget is active |
| `BookingWidget.getConfig()`     | Get current configuration |

---

## Booking Complete Callback

The `onBookingComplete` callback receives booking details:

```javascript
{
  id: 123,
  serviceName: "Consultation",
  staffName: "Dr. Smith",
  date: "Monday, January 20, 2026",
  time: "10:00 AM",
  duration: "60 min",
  price: "$50",
  status: "Pending"
}
```

---

## Styling Customization

Override CSS variables to match your brand:

```css
#booking-widget {
  --booking-primary: #your-brand-color;
  --booking-radius: 8px;
}
```

---

## Example: Full Integration

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Book an Appointment</title>
  </head>
  <body>
    <h1>Schedule Your Visit</h1>

    <div id="booking-widget"></div>

    <script
      src="https://cdn.yourapp.com/widget/v1/embed.js"
      data-company="acme-clinic"
      data-theme="light"
    ></script>
  </body>
</html>
```

---

## Troubleshooting

| Issue               | Solution                                    |
| ------------------- | ------------------------------------------- |
| Widget not showing  | Check container ID matches `data-container` |
| "Company not found" | Verify `data-company` slug is correct       |
| Styles broken       | Ensure CSS file is loaded                   |
| CORS errors         | Contact support to whitelist your domain    |

---

## Support

For integration help, contact: support@yourapp.com

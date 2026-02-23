import { BookingBlock } from './blocks/booking-form';

// Register all blocks
document.addEventListener('DOMContentLoaded', () => {
  if (window.wp && window.wp.blocks) {
    BookingBlock();
  } else {
    console.error('WordPress globals not found. Is dependencies enqueued?');
  }
});

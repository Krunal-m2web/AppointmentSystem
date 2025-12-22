// import { useState } from 'react';
// import { X, ChevronLeft, ChevronRight, DollarSign, CreditCard } from 'lucide-react';
// import { EnhancedCalendar } from './EnhancedCalendar';

// interface BookingCardProps {
//   onComplete: (details: any) => void;
//   onClose: () => void;
// }

// const SERVICES = ['Web Design', 'Software Development'];
// const LOCATIONS = ['In Person', 'Phone Call', 'Zoom'];
// const DURATIONS = ['60 min', '90 min', 'Custom'];

// // Mock pricing data - in real app, this would come from admin settings
// const SERVICE_PRICING = {
//   'Web Design': { priceUSD: 150, displayCurrency: 'USD', displaySymbol: '$' },
//   'Software Development': { priceUSD: 200, displayCurrency: 'EUR', displaySymbol: '€' },
// };

// // Mock exchange rates - in real app, this would come from API
// const EXCHANGE_RATES: { [key: string]: number } = {
//   USD: 1,
//   EUR: 0.92,
//   GBP: 0.79,
//   JPY: 149.50,
//   INR: 83.12,
// };

// const PAYMENT_METHODS = ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer'];

// export function BookingCard({ onComplete, onClose }: BookingCardProps) {
//   const [step, setStep] = useState(1);
//   const [service, setService] = useState('');
//   const [description, setDescription] = useState('');
//   const [location, setLocation] = useState('');
//   const [duration, setDuration] = useState('');
//   const [customDuration, setCustomDuration] = useState('');
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedTime, setSelectedTime] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [paymentTiming, setPaymentTiming] = useState<'now' | 'later'>('now');

//   const canProceed = () => {
//     switch (step) {
//       case 1:
//         return service && location && (duration !== 'Custom' ? duration : customDuration);
//       case 2:
//         return selectedDate && selectedTime;
//       case 3:
//         return paymentTiming === 'later' || paymentMethod;
//       default:
//         return false;
//     }
//   };

//   const handleNext = () => {
//     if (canProceed()) {
//       setStep(step + 1);
//     }
//   };

//   // Check if "Pay Later" option should be available
//   const showPayLater = location === 'In Person';

//   const getServicePricing = () => {
//     return SERVICE_PRICING[service as keyof typeof SERVICE_PRICING];
//   };

//   const getDisplayPrice = () => {
//     const pricing = getServicePricing();
//     if (!pricing) return { price: '0', currency: 'USD', symbol: '$' };
    
//     const rate = EXCHANGE_RATES[pricing.displayCurrency] || 1;
//     const convertedPrice = (pricing.priceUSD * rate).toFixed(2);
    
//     return {
//       price: convertedPrice,
//       currency: pricing.displayCurrency,
//       symbol: pricing.displaySymbol,
//     };
//   };

//   const handleConfirm = () => {
//     if (canProceed()) {
//       const displayPrice = getDisplayPrice();
      
//       const details = {
//         service,
//         description,
//         location,
//         duration: duration === 'Custom' ? `${customDuration} min` : duration,
//         date: selectedDate?.toLocaleDateString('en-US', { 
//           weekday: 'long', 
//           year: 'numeric', 
//           month: 'long', 
//           day: 'numeric' 
//         }),
//         time: selectedTime,
//         price: `${displayPrice.symbol}${displayPrice.price} ${displayPrice.currency}`,
//         paymentMethod: paymentTiming === 'later' ? 'Pay Later' : paymentMethod,
//         paymentTiming,
//       };
//       onComplete(details);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <h2>Book an Appointment</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Progress Indicator */}
//         <div className="px-6 pt-6">
//           <div className="flex items-center gap-2">
//             <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-gray-200'}`} />
//             <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`} />
//             <div className={`flex-1 h-2 rounded-full ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`} />
//           </div>
//           <div className="flex justify-between mt-2 text-sm text-gray-600">
//             <span>Service Details</span>
//             <span>Date & Time</span>
//             <span>Payment</span>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {step === 1 && (
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm text-gray-700 mb-2">
//                   Select Service *
//                 </label>
//                 <select
//                   value={service}
//                   onChange={(e) => setService(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value="">Choose a service...</option>
//                   {SERVICES.map((s) => {
//                     const pricing = SERVICE_PRICING[s as keyof typeof SERVICE_PRICING];
//                     if (pricing) {
//                       const rate = EXCHANGE_RATES[pricing.displayCurrency] || 1;
//                       const price = (pricing.priceUSD * rate).toFixed(2);
//                       return (
//                         <option key={s} value={s}>
//                           {s} - {pricing.displaySymbol}{price} {pricing.displayCurrency}
//                         </option>
//                       );
//                     }
//                     return (
//                       <option key={s} value={s}>
//                         {s}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-700 mb-2">
//                   Description (Optional)
//                 </label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Add any additional details..."
//                   rows={3}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-700 mb-2">
//                   Location *
//                 </label>
//                 <div className="grid grid-cols-3 gap-2">
//                   {LOCATIONS.map((loc) => (
//                     <button
//                       key={loc}
//                       onClick={() => setLocation(loc)}
//                       className={`py-3 px-4 rounded-lg border-2 transition-all ${
//                         location === loc
//                           ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
//                           : 'border-gray-300 hover:border-gray-400'
//                       }`}
//                     >
//                       {loc}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-700 mb-2">
//                   Duration *
//                 </label>
//                 <div className="grid grid-cols-3 gap-2 mb-3">
//                   {DURATIONS.map((dur) => (
//                     <button
//                       key={dur}
//                       onClick={() => setDuration(dur)}
//                       className={`py-3 px-4 rounded-lg border-2 transition-all ${
//                         duration === dur
//                           ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
//                           : 'border-gray-300 hover:border-gray-400'
//                       }`}
//                     >
//                       {dur}
//                     </button>
//                   ))}
//                 </div>
//                 {duration === 'Custom' && (
//                   <input
//                     type="number"
//                     value={customDuration}
//                     onChange={(e) => setCustomDuration(e.target.value)}
//                     placeholder="Enter duration in minutes"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     min="15"
//                     step="15"
//                   />
//                 )}
//               </div>
//             </div>
//           )}

//           {step === 2 && (
//             <div className="space-y-6">
//               <Calendar
//                 selectedDate={selectedDate}
//                 onSelectDate={setSelectedDate}
//                 selectedTime={selectedTime}
//                 onSelectTime={setSelectedTime}
//               />
//             </div>
//           )}

//           {step === 3 && (
//             <div className="space-y-6">
//               {/* Price Display - Admin Selected Currency */}
//               <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600">Service Price</p>
//                     <p className="text-3xl mt-1">
//                       {getDisplayPrice().symbol}{getDisplayPrice().price}
//                     </p>
//                     <p className="text-sm text-gray-600 mt-1">{getDisplayPrice().currency}</p>
//                   </div>
//                   <div className="bg-indigo-100 p-3 rounded-lg">
//                     <DollarSign className="w-8 h-8 text-indigo-600" />
//                   </div>
//                 </div>
//               </div>

//               {/* Payment Timing */}
//               <div>
//                 <label className="block text-sm text-gray-700 mb-3">
//                   When would you like to pay? *
//                 </label>
//                 <div className="grid grid-cols-2 gap-3">
//                   <button
//                     onClick={() => {
//                       setPaymentTiming('now');
//                       setPaymentMethod('');
//                     }}
//                     className={`py-4 px-4 rounded-lg border-2 transition-all ${
//                       paymentTiming === 'now'
//                         ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
//                         : 'border-gray-300 hover:border-gray-400'
//                     }`}
//                   >
//                     <div className="flex items-center justify-center gap-2">
//                       <CreditCard className="w-5 h-5" />
//                       <span>Pay Now</span>
//                     </div>
//                   </button>
//                   {showPayLater && (
//                     <button
//                       onClick={() => {
//                         setPaymentTiming('later');
//                         setPaymentMethod('');
//                       }}
//                       className={`py-4 px-4 rounded-lg border-2 transition-all ${
//                         paymentTiming === 'later'
//                           ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
//                           : 'border-gray-300 hover:border-gray-400'
//                       }`}
//                     >
//                       <div className="flex items-center justify-center gap-2">
//                         <DollarSign className="w-5 h-5" />
//                         <span>Pay Later</span>
//                       </div>
//                     </button>
//                   )}
//                 </div>
//                 {!showPayLater && (
//                   <p className="text-sm text-amber-600 mt-2 flex items-center gap-1">
//                     <span>ℹ️</span>
//                     <span>Pay Later option is only available for In Person appointments</span>
//                   </p>
//                 )}
//               </div>

//               {/* Payment Method (only if Pay Now is selected) */}
//               {paymentTiming === 'now' && (
//                 <div>
//                   <label className="block text-sm text-gray-700 mb-3 flex items-center gap-2">
//                     <CreditCard className="w-4 h-4" />
//                     Select Payment Method *
//                   </label>
//                   <div className="grid grid-cols-2 gap-3">
//                     {PAYMENT_METHODS.map((method) => (
//                       <button
//                         key={method}
//                         onClick={() => setPaymentMethod(method)}
//                         className={`py-3 px-4 rounded-lg border-2 transition-all text-sm ${
//                           paymentMethod === method
//                             ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
//                             : 'border-gray-300 hover:border-gray-400'
//                         }`}
//                       >
//                         {method}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Summary */}
//               <div className="bg-gray-50 rounded-lg p-4 space-y-2">
//                 <h3 className="text-sm mb-3">Booking Summary</h3>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Service:</span>
//                     <span>{service}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Location:</span>
//                     <span>{location}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Duration:</span>
//                     <span>{duration === 'Custom' ? `${customDuration} min` : duration}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Date:</span>
//                     <span>
//                       {selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Time:</span>
//                     <span>{selectedTime}</span>
//                   </div>
//                   <div className="border-t border-gray-300 pt-2 mt-2">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Total:</span>
//                       <span className="font-medium">
//                         {getDisplayPrice().symbol}{getDisplayPrice().price} {getDisplayPrice().currency}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="p-6 border-t border-gray-200 flex items-center justify-between">
//           {step > 1 ? (
//             <button
//               onClick={() => setStep(step - 1)}
//               className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <ChevronLeft className="w-5 h-5" />
//               Back
//             </button>
//           ) : (
//             <div />
//           )}

//           {step < 3 ? (
//             <button
//               onClick={handleNext}
//               disabled={!canProceed()}
//               className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
//                 canProceed()
//                   ? 'bg-indigo-600 text-white hover:bg-indigo-700'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               Next
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           ) : (
//             <button
//               onClick={handleConfirm}
//               disabled={!canProceed()}
//               className={`px-6 py-3 rounded-lg transition-colors ${
//                 canProceed()
//                   ? 'bg-indigo-600 text-white hover:bg-indigo-700'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               {paymentTiming === 'now' ? 'Proceed to Payment' : 'Confirm Booking'}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
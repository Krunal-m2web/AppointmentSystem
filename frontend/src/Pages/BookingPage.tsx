import { useState, useEffect } from 'react';
import { LogOut, Check } from 'lucide-react';
import { BookingForm } from '../components/BookingForm';

interface UserBookingProps {
  user: { name: string; email: string };
  onLogout: () => void;
}

export function UserBooking({ user, onLogout }: UserBookingProps) {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  // Automatically open the booking card when user logs in
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBookingForm(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleBookingComplete = (details: any) => {
    setBookingDetails(details);
    setBookingComplete(true);
    setShowBookingForm(false);
  };

  const handleNewBooking = () => {
    setBookingComplete(false);
    setShowBookingForm(true);
  };

  return (
    <>
      {!showBookingForm && !bookingComplete && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {/* Header */}
          <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <div>
                <h1>Appointment Booking</h1>
                <p className="text-gray-600">Welcome, {user.name}</p>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </header>
        </div>
      )}

      {/* Booking Form */}
      {showBookingForm && !bookingComplete && (
        <BookingForm
          onComplete={handleBookingComplete}
        
        />
      )}

      {/* Confirmation Screen */}
      {bookingComplete && (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
          <header className="bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Appointment Booking</h1>
                <p className="text-slate-600">Welcome, {user.name}</p>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-slate-300"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" aria-hidden="true" />
                Logout
              </button>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-12" role="main">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-12 max-w-3xl mx-auto animate-fadeIn">
              {/* Success Icon with Animation */}
              <div className="relative mb-6">
                <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  <Check className="w-10 h-10 text-emerald-700" aria-hidden="true" />
                </div>
                <div className="absolute inset-0 bg-emerald-400 w-20 h-20 rounded-full mx-auto animate-ping opacity-20"></div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Booking Confirmed!</h2>
                <p className="text-slate-600 text-lg">Your appointment has been successfully scheduled</p>
              </div>
              
              {/* Booking Details Card */}
              <div 
                className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl p-6 sm:p-8 mb-8 border-2 border-indigo-100"
                role="region"
                aria-label="Booking details"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-4 pb-3 border-b-2 border-indigo-200">Appointment Details</h3>
                <div className="grid gap-4">
                  <div className="flex justify-between items-start py-2">
                    <span className="text-slate-700 font-medium">Service:</span>
                    <span className="text-slate-900 font-semibold text-right">{bookingDetails?.serviceName}</span>
                  </div>
                  
                  <div className="flex justify-between items-start py-2">
                    <span className="text-slate-700 font-medium">Staff:</span>
                    <span className="text-slate-900 font-semibold text-right">{bookingDetails?.staffName}</span>
                  </div>

                  <div className="flex justify-between items-start py-2">
                    <span className="text-slate-700 font-medium">Location:</span>
                    <span className="text-slate-900 font-semibold text-right">{bookingDetails?.location}</span>
                  </div>

                  <div className="flex justify-between items-start py-2">
                    <span className="text-slate-700 font-medium">Date & Time:</span>
                    <span className="text-slate-900 font-semibold text-right">
                      {bookingDetails?.date} at {bookingDetails?.time}
                    </span>
                  </div>

                  <div className="flex justify-between items-start py-2">
                    <span className="text-slate-700 font-medium">Duration:</span>
                    <span className="text-slate-900 font-semibold text-right">{bookingDetails?.duration}</span>
                  </div>

                  <div className="flex justify-between items-start py-2">
                    <span className="text-slate-700 font-medium">Price:</span>
                    <span className="text-indigo-700 font-bold text-lg text-right">{bookingDetails?.price}</span>
                  </div>

                  <div className="flex justify-between items-start py-2">
                    <span className="text-slate-700 font-medium">Payment Method:</span>
                    <span className="text-slate-900 font-semibold text-right">{bookingDetails?.paymentMethod}</span>
                  </div>

                  {bookingDetails?.description && (
                    <div className="pt-3 border-t-2 border-indigo-100">
                      <span className="text-slate-700 font-medium block mb-2">Description:</span>
                      <p className="text-slate-800 bg-white p-3 rounded-lg border border-slate-200">{bookingDetails.description}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center">
                <button
                  onClick={handleNewBooking}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                  aria-label="Book another appointment"
                >
                  Book Another Appointment
                </button>
              </div>

              {/* Success Message */}
              <div className="mt-8 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-emerald-800 text-sm text-center">
                  A confirmation email has been sent to your email address with all the details.
                </p>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
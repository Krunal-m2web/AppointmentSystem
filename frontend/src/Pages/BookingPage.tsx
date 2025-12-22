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
          onClose={() => setShowBookingForm(false)}
        />
      )}

      {/* Confirmation Screen */}
      {bookingComplete && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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

          <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-6">Your appointment has been successfully scheduled</p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <div className="grid gap-3">
                  <div>
                    <span className="text-gray-600">Service:</span>
                    <span className="ml-2">{bookingDetails?.service}</span>
                  </div>
                  
                   <div>
                    <span className="text-gray-600">Staff:</span>
                    <span className="ml-2">{bookingDetails?.staff}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <span className="ml-2">{bookingDetails?.location}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <span className="ml-2">{bookingDetails?.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="ml-2">
                      {bookingDetails?.date} at {bookingDetails?.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Price:</span>
                    <span className="ml-2">{bookingDetails?.price}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="ml-2">{bookingDetails?.paymentMethod}</span>
                  </div>
                  {bookingDetails?.description && (
                    <div>
                      <span className="text-gray-600">Description:</span>
                      <p className="mt-1 text-gray-800">{bookingDetails.description}</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleNewBooking}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Book Another Appointment
              </button>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
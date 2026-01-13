import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export type UserRole = 'admin' | 'staff' | 'user';
import { TimezoneProvider } from './context/TimezoneContext';
import { PublicBooking } from './Pages/PublicBookingPage';
import { UserBooking } from './Pages/BookingPage';
import StaffAuth from './components/Auth/StaffAuth';
import AdminLogin from './components/Auth/AdminLogin';
import AdminRegister from './components/Auth/AdminRegister';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { AdminDashboard } from './Pages/AdminPage';
import { SettingsPage } from './components/admin/SettingsPage';
import { getToken, clearToken } from './utils/auth';
import { jwtDecode } from 'jwt-decode';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const handleLogout = (redirectPath: string) => {
    clearToken();
    window.location.href = redirectPath;
  };

  return (
    <TimezoneProvider>
    <BrowserRouter>
      <Routes>
        {/* Public Booking Routes - No Authentication Required */}
        <Route path="/book/:slug" element={<PublicBooking />} />
        <Route path="/book" element={<PublicBooking />} />
        
        
        {/* Auth Routes */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/auth/admin/register" element={<AdminRegister />} />
        <Route path="/auth/staff" element={<StaffAuth />} />

        
        {/* Protected Dashboard Routes */}
        <Route 
          path="/appointment/staff" 
          element={
            <ProtectedRoute>
              <AdminDashboard onLogout={() => handleLogout('/auth/staff')} />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
    </TimezoneProvider>
  );
}


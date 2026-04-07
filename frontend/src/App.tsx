import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export type UserRole = 'admin' | 'staff' | 'user';
import { TimezoneProvider } from './context/TimezoneContext';
import { PublicBooking } from './Pages/PublicBookingPage';
import { UserBooking } from './Pages/BookingPage';
import StaffAuth from './components/Auth/StaffAuth';
import ResetPasswordPage from './components/Auth/ResetPasswordPage';
import AdminLogin from './components/Auth/AdminLogin';
import AdminRegister from './components/Auth/AdminRegister';
import ForgotPasswordPage from './components/Auth/ForgotPasswordPage';
import AdminResetPasswordPage from './components/Auth/AdminResetPasswordPage';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { AdminDashboard } from './Pages/AdminPage';
import { SettingsPage } from './components/admin/SettingsPage';
import { getToken, clearToken, getRoleFromToken } from './utils/auth';
import { jwtDecode } from 'jwt-decode';
import { Toaster } from './components/ui/sonner';

import { ManageBookingPage } from './Pages/ManageBookingPage';

export default function App() {
  const handleLogout = () => {
    const token = getToken();
    let redirectPath = '/auth/staff'; // Default to staff login
    
    if (token) {
      const role = getRoleFromToken(token);
      if (role === 'Admin') {
        redirectPath = '/auth/admin'; // Admin login path
      }
    }
    
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
        <Route path="/booking/manage/:token" element={<ManageBookingPage />} />
        
        
        {/* Auth Routes */}
        <Route path="/" element={<StaffAuth />} />
        <Route path="/auth/admin" element={<AdminLogin />} />
        <Route path="/auth/admin/register" element={<AdminRegister />} />
        <Route path="/auth/staff" element={<Navigate to="/" replace />} />
        <Route path="/auth/staff/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/staff/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/admin/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/admin/reset-password" element={<AdminResetPasswordPage />} />

        
        {/* Protected Dashboard Routes */}
        <Route 
          path="/appointment/staff" 
          element={
            <ProtectedRoute>
              <AdminDashboard onLogout={handleLogout} />
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


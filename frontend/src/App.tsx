import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserBooking } from './Pages/BookingPage';
import StaffAuth from './components/Auth/StaffAuth';
import AdminLogin from './components/Auth/AdminLogin';
import AdminRegister from './components/Auth/AdminRegister';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { AdminDashboard } from './Pages/AdminPage';
import { getToken, clearToken } from './utils/auth';
import { jwtDecode } from 'jwt-decode';

export default function App() {
  const handleLogout = (redirectPath: string) => {
    clearToken();
    window.location.href = redirectPath;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Booking Route */}
        <Route 
          path="/" 
          element={
            <UserBooking 
              user={{ 
                name: getToken() ? (jwtDecode(getToken()!) as any).name || 'User' : 'Guest', 
                email: getToken() ? (jwtDecode(getToken()!) as any).email || '' : ''
              }} 
              onLogout={() => handleLogout('/auth/staff')} 
            />
          } 
        />
        
        {/* Auth Routes */}
        <Route path="/auth/admin" element={<AdminLogin />} />
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
    </BrowserRouter>
  );
}


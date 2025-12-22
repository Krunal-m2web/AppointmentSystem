
import { useState } from 'react';
import { Building2, ShieldCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { adminLogin, saveToken, saveCompanyId, saveUserRole } from '../../services/authService';
import type { AdminLoginDto } from '../../types/auth.types';

const AdminLogin = () => {
  const navigate = useNavigate();

  // LOGIN STATE
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // LOGIN HANDLER
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const loginData: AdminLoginDto = {
        email: loginEmail,
        password: loginPassword,
      };

      const response = await adminLogin(loginData);
      
      // Save auth data
      saveToken(response.token);
      if (response.companyId) saveCompanyId(response.companyId);
      saveUserRole(response.role);

      console.log('Admin login successful:', response);

      // Redirect to admin dashboard
      navigate('/appointment/staff');
    } catch (err: any) {
      console.error('Login error:', err);
      setLoginError(err.message || 'Invalid email or password');
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <Building2 className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Admin Login
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
            Sign in to manage your company
        </p>

        {/* ERROR MESSAGE */}
        {loginError && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
            {loginError}
            </div>
        )}
          
        <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Email Address</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                placeholder="admin@company.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all font-semibold shadow-lg shadow-indigo-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                'Signing in...'
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3 text-center">
            <Link to="/auth/admin/register" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            New here? Create a Company Account →
            </Link>
            <Link to="/auth/staff" className="text-sm text-gray-500 hover:text-gray-700">
            Staff member? Sign in here →
            </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { staffLogin, staffRegister, saveToken, saveCompanyId, saveUserRole } from '../../services/authService';
import type { StaffLoginDto, StaffRegisterDto } from '../../types/auth.types';

const StaffAuth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // LOGIN STATE
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // REGISTER STATE
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regCompanyId, setRegCompanyId] = useState('');
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState<string | null>(null);
  const [regLoading, setRegLoading] = useState(false);

  // LOGIN HANDLER
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const loginData: StaffLoginDto = {
        email: loginEmail,
        password: loginPassword,
      };

      const response = await staffLogin(loginData);
      
      // Save auth data
      saveToken(response.token);
      if (response.companyId) saveCompanyId(response.companyId);
      saveUserRole(response.role);

      console.log('Staff login successful:', response);

      // Redirect to staff portal
      navigate('/appointment/staff');
    } catch (err: any) {
      console.error('Login error:', err);
      setLoginError(err.message || 'Invalid email or password');
    } finally {
      setLoginLoading(false);
    }
  };

  // REGISTER HANDLER
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);
    setRegSuccess(null);

    // Frontend validation
    if (regPassword.length < 5) {
      setRegError('Password must be at least 5 characters');
      return;
    }
    if (regFirstName.length < 2) {
      setRegError('First name must be at least 2 characters');
      return;
    }
    if (regLastName.length < 2) {
      setRegError('Last name must be at least 2 characters');
      return;
    }
    if (!regCompanyId) {
      setRegError('Company ID is required');
      return;
    }

    setRegLoading(true);

    try {
      const registerData: StaffRegisterDto = {
        companyId: parseInt(regCompanyId, 10),
        firstName: regFirstName,
        lastName: regLastName,
        email: regEmail,
        password: regPassword,
      };

      const result = await staffRegister(registerData);
      
      setRegSuccess('Staff account created successfully! You can now log in.');
      
      // Clear form
      setRegEmail('');
      setRegFirstName('');
      setRegLastName('');
      setRegPassword('');
      setRegCompanyId('');

      // Switch to login tab after 1.5 seconds
      setTimeout(() => {
        setActiveTab('login');
        setRegSuccess(null);
      }, 1500);
    } catch (err: any) {
      console.error('Registration error:', err);
      setRegError(err.message || 'Registration failed');
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <ShieldCheck className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          {activeTab === 'login' ? 'Staff Login' : 'Staff Registration'}
        </h1>

        {/* TABS */}
        <div className="flex gap-2 mb-6 bg-gray-50 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 px-4 rounded-lg transition-all text-sm font-medium ${
              activeTab === 'login'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 px-4 rounded-lg transition-all text-sm font-medium ${
              activeTab === 'register'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Register
          </button>
        </div>

        {/* LOGIN TAB */}
        {activeTab === 'login' && (
          <>
            <p className="text-center text-gray-500 text-sm mb-6">
              Access your schedule and appointments
            </p>

            {loginError && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="loginEmail"
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="loginEmail"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="loginPassword"
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1"
                >
                  Password
                </label>
                <input
                  id="loginPassword"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all font-semibold shadow-lg shadow-indigo-200 disabled:opacity-50"
              >
                {loginLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </>
        )}

        {/* REGISTER TAB */}
        {activeTab === 'register' && (
          <>
            {regError && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                {regError}
              </div>
            )}

            {regSuccess && (
              <div className="mb-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3">
                {regSuccess}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="regCompanyId"
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1"
                >
                  Company ID (Provided by your Admin)
                </label>
                <input
                  id="regCompanyId"
                  type="number"
                  value={regCompanyId}
                  onChange={(e) => setRegCompanyId(e.target.value)}
                  placeholder="e.g. 101"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="regFirstName"
                    className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    id="regFirstName"
                    type="text"
                    value={regFirstName}
                    onChange={(e) => setRegFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="regLastName"
                    className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    id="regLastName"
                    type="text"
                    value={regLastName}
                    onChange={(e) => setRegLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="regEmail"
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="regEmail"
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="your.name@company.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="regPassword"
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1"
                >
                  Password
                </label>
                <input
                  id="regPassword"
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="At least 5 characters"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={regLoading}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all font-semibold shadow-lg shadow-indigo-200 disabled:opacity-50"
              >
                {regLoading ? 'Creating Account...' : 'Create Staff Account'}
              </button>
            </form>
          </>
        )}

        <div className="mt-6 text-center">
          <Link to="/auth/admin" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            Business owner? Manage your company →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StaffAuth;

import { useState, useEffect } from 'react';
import { ShieldCheck, Building, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { staffLogin, staffRegister, saveToken, saveCompanyId, saveUserRole } from '../../services/authService';
import { validateInvite } from '../../services/inviteApi';
import { StaffLoginDto, StaffRegisterDto } from '../../types/auth.types';
import { getToken, isTokenExpired } from '../../utils/auth';
import { parseApiError } from '../../utils/error';

interface LoginFieldErrors {
  email?: string;
  password?: string;
}

interface RegFieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

const StaffAuth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get('token');
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(inviteToken ? 'register' : 'login');

  // LOGIN STATE
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginFieldErrors, setLoginFieldErrors] = useState<LoginFieldErrors>({});
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // REGISTER STATE
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regCompanyId, setRegCompanyId] = useState('');
  const [regFieldErrors, setRegFieldErrors] = useState<RegFieldErrors>({});
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState<string | null>(null);
  const [regLoading, setRegLoading] = useState(false);
  
  // INVITE STATE
  // params moved up
  const [inviteValid, setInviteValid] = useState(false);
  const [checkingInvite, setCheckingInvite] = useState(false);
  const [inviteCompanyName, setInviteCompanyName] = useState('');
  const [inviteEmailRestricted, setInviteEmailRestricted] = useState<string | null>(null);

  // CHECK AUTH ON MOUNT
  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
      navigate('/appointment/staff', { replace: true });
    }
  }, [navigate]);

  // VALIDATE INVITE TOKEN
  useEffect(() => {
    if (activeTab === 'register') {
      if (!inviteToken) {
        setInviteValid(false);
        return;
      }
      
      setCheckingInvite(true);
      validateInvite(inviteToken)
        .then(res => {
          setInviteValid(res.isValid);
          if (res.isValid) {
            setRegCompanyId(res.companyId?.toString() || '');
            setInviteCompanyName(res.companyName || 'Unknown Company');
            if (res.email) {
                setRegEmail(res.email);
                setInviteEmailRestricted(res.email);
            }
          }
        })
        .catch(() => setInviteValid(false))
        .finally(() => setCheckingInvite(false));
    }
  }, [activeTab, inviteToken]);

  // VALIDATE LOGIN FORM
  const validateLoginForm = (): boolean => {
    const errors: LoginFieldErrors = {};
    
    if (!loginEmail.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!loginPassword) {
      errors.password = 'Password is required';
    } else if (loginPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setLoginFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Clear login field error when user starts typing
  const handleLoginEmailChange = (value: string) => {
    setLoginEmail(value);
    if (loginFieldErrors.email) setLoginFieldErrors(prev => ({ ...prev, email: undefined }));
    setLoginError(null);
  };

  const handleLoginPasswordChange = (value: string) => {
    setLoginPassword(value);
    if (loginFieldErrors.password) setLoginFieldErrors(prev => ({ ...prev, password: undefined }));
    setLoginError(null);
  };

  // LOGIN HANDLER
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    
    if (!validateLoginForm()) return;
    
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

      // Redirect to staff portal
      navigate('/appointment/staff', { replace: true });
    } catch (err: any) {
      const apiError = parseApiError(err.message || '');
      if (apiError.field) {
        setLoginFieldErrors(prev => ({ ...prev, [apiError.field!]: apiError.message }));
      } else {
        setLoginError(apiError.message || 'Invalid email or password');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  // VALIDATE REGISTRATION FORM
  const validateRegForm = (): boolean => {
    const errors: RegFieldErrors = {};
    
    if (!regFirstName.trim()) errors.firstName = 'First name is required';
    else if (regFirstName.length < 3) errors.firstName = 'First name must be at least 3 characters';
    
    if (!regLastName.trim()) errors.lastName = 'Last name is required';
    else if (regLastName.length < 3) errors.lastName = 'Last name must be at least 3 characters';
    
    if (!regEmail.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) errors.email = 'Invalid email address';
    
    if (!regPassword) errors.password = 'Password is required';
    else if (regPassword.length < 6) errors.password = 'Password must be at least 6 characters';
    
    setRegFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Field change handlers for registration
  const handleRegFirstNameChange = (value: string) => {
    setRegFirstName(value);
    if (regFieldErrors.firstName) setRegFieldErrors(prev => ({ ...prev, firstName: undefined }));
    setRegError(null);
  };

  const handleRegLastNameChange = (value: string) => {
    setRegLastName(value);
    if (regFieldErrors.lastName) setRegFieldErrors(prev => ({ ...prev, lastName: undefined }));
    setRegError(null);
  };

  const handleRegEmailChange = (value: string) => {
    setRegEmail(value);
    if (regFieldErrors.email) setRegFieldErrors(prev => ({ ...prev, email: undefined }));
    setRegError(null);
  };

  const handleRegPasswordChange = (value: string) => {
    setRegPassword(value);
    if (regFieldErrors.password) setRegFieldErrors(prev => ({ ...prev, password: undefined }));
    setRegError(null);
  };

  // REGISTER HANDLER
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);
    setRegSuccess(null);

    if (!validateRegForm()) return;

    // Company ID is populated by token, but check just in case
    if (!regCompanyId && !inviteToken) {
      setRegError('Invitation is required');
      return;
    }

    setRegLoading(true);

    try {
      const registerData: StaffRegisterDto = {
        inviteToken: inviteToken || undefined,
        companyId: regCompanyId ? parseInt(regCompanyId, 10) : undefined,
        firstName: regFirstName,
        lastName: regLastName,
        email: regEmail,
        password: regPassword,
      };

      await staffRegister(registerData);
      
      setRegSuccess('Staff account created successfully! You can now log in.');
      
      // Clear form
      setRegEmail('');
      setRegFirstName('');
      setRegLastName('');
      setRegPassword('');
      setRegFieldErrors({});
      
      // Switch to login tab after 1.5 seconds
      setTimeout(() => {
        setActiveTab('login');
        setRegSuccess(null);
      }, 1500);
    } catch (err: any) {
      const apiError = parseApiError(err.message || '');
      if (apiError.field) {
        setRegFieldErrors(prev => ({ ...prev, [apiError.field!]: apiError.message }));
      } else {
        setRegError(apiError.message || 'Registration failed');
      }
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
                  onChange={(e) => handleLoginEmailChange(e.target.value)}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 bg-gray-50 ${
                    loginFieldErrors.email 
                      ? 'border-red-400 focus:ring-red-500' 
                      : 'border-gray-200 focus:ring-indigo-500'
                  }`}
                />
                {loginFieldErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{loginFieldErrors.email}</p>
                )}
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
                  onChange={(e) => handleLoginPasswordChange(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 bg-gray-50 ${
                    loginFieldErrors.password 
                      ? 'border-red-400 focus:ring-red-500' 
                      : 'border-gray-200 focus:ring-indigo-500'
                  }`}
                />
                {loginFieldErrors.password && (
                  <p className="mt-1 text-sm text-red-500">{loginFieldErrors.password}</p>
                )}
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

              {/* INVITE VALIDATION UI */}
              {!inviteToken ? (
                 <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-center">
                    <ShieldCheck className="w-10 h-10 text-gray-300 mb-3" />
                    <h3 className="text-gray-900 font-semibold mb-1">Invitation Required</h3>
                    <p className="text-sm text-gray-500">Please use the invite link provided by your administrator to create an account.</p>
                 </div>
              ) : checkingInvite ? (
                 <div className="flex flex-col items-center justify-center p-10">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-2" />
                    <p className="text-sm text-gray-500 font-medium">Verifying invitation...</p>
                 </div>
              ) : !inviteValid ? (
                 <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center">
                    <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <h3 className="text-red-800 font-semibold mb-1">Invalid or Expired Link</h3>
                    <p className="text-sm text-red-600">This invitation link is invalid, expired, or has already been used.</p>
                 </div>
              ) : (
                /* VALID FORM */
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  
                  {/* COMPANY INFO BADGE */}
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Building className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-indigo-500">Joining Company</p>
                        <p className="text-sm font-bold text-gray-900 leading-tight">{inviteCompanyName}</p>
                    </div>
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
                        onChange={(e) => handleRegFirstNameChange(e.target.value)}
                        placeholder="John"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 bg-gray-50 ${
                          regFieldErrors.firstName 
                            ? 'border-red-400 focus:ring-red-500' 
                            : 'border-gray-200 focus:ring-indigo-500'
                        }`}
                      />
                      {regFieldErrors.firstName && (
                        <p className="mt-1 text-sm text-red-500">{regFieldErrors.firstName}</p>
                      )}
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
                        onChange={(e) => handleRegLastNameChange(e.target.value)}
                        placeholder="Doe"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 bg-gray-50 ${
                          regFieldErrors.lastName 
                            ? 'border-red-400 focus:ring-red-500' 
                            : 'border-gray-200 focus:ring-indigo-500'
                        }`}
                      />
                      {regFieldErrors.lastName && (
                        <p className="mt-1 text-sm text-red-500">{regFieldErrors.lastName}</p>
                      )}
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
                      onChange={(e) => handleRegEmailChange(e.target.value)}
                      placeholder="your.name@company.com"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                        regFieldErrors.email 
                          ? 'border-red-400 focus:ring-red-500' 
                          : 'border-gray-200 focus:ring-indigo-500'
                      } ${inviteEmailRestricted ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-gray-50'}`}
                      readOnly={!!inviteEmailRestricted}
                    />
                    {regFieldErrors.email && (
                      <p className="mt-1 text-sm text-red-500">{regFieldErrors.email}</p>
                    )}
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
                      onChange={(e) => handleRegPasswordChange(e.target.value)}
                      placeholder="At least 6 characters"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 bg-gray-50 ${
                        regFieldErrors.password 
                          ? 'border-red-400 focus:ring-red-500' 
                          : 'border-gray-200 focus:ring-indigo-500'
                      }`}
                    />
                    {regFieldErrors.password && (
                      <p className="mt-1 text-sm text-red-500">{regFieldErrors.password}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={regLoading}
                    className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all font-semibold shadow-lg shadow-indigo-200 disabled:opacity-50"
                  >
                    {regLoading ? 'Creating Account...' : 'Join Team'}
                  </button>
                </form>
              )}
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

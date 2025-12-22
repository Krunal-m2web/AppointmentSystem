import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { UserRole } from '../../App';


interface LoginPageProps {
  onLogin: (role: UserRole, userData: { name: string; email: string }) => void;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5289';

interface LoginResponse {
  token: string;
  username: string;
  email: string;
  role: string; // "Admin" | "User" | "Staff"
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // register form state
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState<string | null>(null);
  const [regLoading, setRegLoading] = useState(false);

  const mapApiRoleToUserRole = (apiRole: string): UserRole => {
    switch (apiRole.toLowerCase()) {
      case 'admin':
        return 'admin';
      case 'staff':
        return 'staff';
      default:
        return 'user';
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Login failed');
      }

      const data = (await response.json()) as LoginResponse;

      // save jwt for future api calls
      localStorage.setItem('auth_token', data.token);

      console.log('Login successful! Data from API:', data);
      const role = mapApiRoleToUserRole(data.role);
      console.log('Mapped role:', data.role, '->', role);

      const userData = {
        name: data.username || data.email.split('@')[0],
        email: data.email,
      };

      console.log('Calling onLogin with role:', role, 'userData:', userData);
      onLogin(role, userData);
    } catch (err: any) {
      console.error('Login error caught:', err);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      setLoginError(err.message || 'Invalid email or password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);
    setRegSuccess(null);

    if (regPassword.length < 5) {
      setRegError('Password must be at least 5 characters.');
      return;
    }
    setRegLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: regEmail,
          password: regPassword,
          username: regUsername,
          // 🔹 no role sent – backend will make it "User"
        }),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to register.');
      }

      setRegSuccess('User registered successfully. You can now log in.');
      setRegEmail('');
      setRegUsername('');
      setRegPassword('');

      setActiveTab('login');
    } catch (err: any) {
      console.error('Register error:', err);
      setRegError(err.message || 'Registration failed.');
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 ">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <LogIn className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-4">
          {activeTab === 'login' ? 'Welcome Back' : 'Create Account to register'}
        </h1>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors cursor-pointer ${activeTab === 'login'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors cursor-pointer ${activeTab === 'register'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Register
          </button>
        </div>

        {/* LOGIN TAB */}

        {activeTab === 'login' && (
          <>


            <p className="text-center text-gray-600 mb-6">
              Sign in with your email and password
            </p>

            {loginError && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="loginEmail"
                  className="block text-sm text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="loginEmail"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="loginPassword"
                  className="block text-sm text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="loginPassword"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {regError}
              </div>
            )}

            {regSuccess && (
              <div className="mb-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                {regSuccess}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="regEmail"
                  className="block text-sm text-gray-700 mb-1"
                >
                  Email (Gmail, Outlook or .in)
                </label>
                <input
                  id="regEmail"
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="you@gmail.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="regUsername"
                  className="block text-sm text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  id="regUsername"
                  type="text"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="Enter a username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="regPassword"
                  className="block text-sm text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="regPassword"
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="At least 5 characters"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={regLoading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {regLoading ? 'Signing in...' : 'Sign Up'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

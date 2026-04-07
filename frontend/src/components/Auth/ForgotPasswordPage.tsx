import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, Building2, ShieldCheck } from 'lucide-react';
import { adminForgotPassword, forgotPassword } from '../../services/authService';

const ForgotPasswordPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  // Determine role from URL path: /auth/admin/forgot-password → admin
  const isAdmin = location.pathname.includes('/auth/admin/');
  const role = isAdmin ? 'admin' : 'staff';

  const [email, setEmail] = useState('');
  const [isEmailPreFilled, setIsEmailPreFilled] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [generalError, setGeneralError] = useState('');

  // Pre-fill email from query param if available
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
      setIsEmailPreFilled(true);
    }
  }, [searchParams]);

  const loginPath = isAdmin ? '/auth/admin' : '/';
  const Icon = isAdmin ? Building2 : ShieldCheck;
  const accentColor = 'indigo';

  const validateEmail = (val: string) => {
    if (!val.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Please enter a valid email address';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }

    setLoading(true);
    try {
      if (role === 'admin') {
        await adminForgotPassword(email.trim());
      } else {
        await forgotPassword(email.trim());
      }
      setSent(true);
    } catch (err: any) {
      setGeneralError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Check your email</h2>
          <p className="text-gray-500 text-sm mb-2">
            We've sent a password reset link to:
          </p>
          <p className="font-semibold text-indigo-600 text-sm mb-6 break-all">{email}</p>
          <p className="text-gray-400 text-xs mb-8 leading-relaxed">
            The link will expire in <strong>1 hour</strong>. If you don't see it, check your spam folder.
          </p>
          <Link
            to={loginPath}
            className={`inline-flex items-center gap-2 text-sm font-medium text-${accentColor}-600 hover:text-${accentColor}-800 transition-colors`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {isAdmin ? 'Admin' : 'Staff'} Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <Icon className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Forgot Password?
        </h1>
        <p className="text-center text-gray-500 text-sm mb-8">
          Enter your {isAdmin ? 'admin' : 'staff'} email address and we'll send you a link to reset your password.
        </p>

        {/* General Error */}
        {generalError && (
          <div className="mb-5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="forgot-email"
                type="email"
                value={email}
                readOnly={isEmailPreFilled}
                onChange={(e) => {
                  if (!isEmailPreFilled) {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                    if (generalError) setGeneralError('');
                  }
                }}
                placeholder={isAdmin ? 'admin@company.com' : 'staff@company.com'}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                  isEmailPreFilled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-gray-50'
                } ${
                  emailError
                    ? 'border-red-400 focus:ring-red-500'
                    : 'border-gray-200 focus:ring-indigo-500'
                }`}
              />
            </div>
            {emailError && (
              <p className="mt-1 text-sm text-red-500">{emailError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all font-semibold shadow-lg shadow-indigo-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        {/* Back to login */}
        <div className="mt-6 text-center">
          <Link
            to={loginPath}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {isAdmin ? 'Admin' : 'Staff'} Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

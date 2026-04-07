import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { adminResetPassword, adminVerifyResetToken } from '../../services/authService';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { PASSWORD_REQUIREMENTS, validatePassword } from '../../utils/passwordValidation';

export default function AdminResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failedRequirements, setFailedRequirements] = useState<string[]>([]);
  const [showFailedReqs, setShowFailedReqs] = useState(false);

  const [tokenValidating, setTokenValidating] = useState(true);
  const [tokenError, setTokenError] = useState('');

  useEffect(() => {
    console.log('[ResetPassword] Page loaded with token:', token);
    
    if (!token) {
      setTokenError('Invalid reset link: Token is missing.');
      setTokenValidating(false);
      return;
    }

    const validateToken = async () => {
      try {
        console.log('[ResetPassword] Attempting to verify token...');
        await adminVerifyResetToken(token);
        console.log('[ResetPassword] Token verification successful.');
        setTokenValidating(false);
      } catch (err: any) {
        console.error('[ResetPassword] Token verification failed:', err);
        setTokenError(err.message || 'This reset link has expired or is invalid.');
        setTokenValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const validation = validatePassword(password);
    if (!validation.isValid) {
      setFailedRequirements(validation.errors);
      setShowFailedReqs(true);
      toast.error('Password does not meet requirements');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await adminResetPassword({ token, newPassword: password });
      setSuccess(true);
      toast.success('Password reset successfully');
      setTimeout(() => navigate('/'), 3000);
    } catch (err: any) {
      toast.error(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (tokenValidating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (tokenError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Link</h2>
          <p className="text-gray-500 mb-8">{tokenError}</p>
          <button
            onClick={() => navigate('/auth/admin/forgot-password')}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Request New Reset Link
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset!</h2>
          <p className="text-gray-500 mb-8">
            Your admin password has been successfully updated. You will be redirected to the login page shortly.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
            <Lock className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Set New Admin Password</h2>
          <p className="text-gray-500 mt-2 text-sm">Please enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (showFailedReqs) {
                    const v = validatePassword(e.target.value);
                    setFailedRequirements(v.errors);
                  }
                }}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 pr-10"
                placeholder="Enter a strong password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Failed Requirements */}
            {showFailedReqs && failedRequirements.length > 0 && (
              <div className="mt-3 bg-red-50 rounded-xl p-4 border border-red-100">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-xs font-bold text-red-700 uppercase tracking-wider">Required Improvements:</p>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {PASSWORD_REQUIREMENTS.map((req) => {
                    const isMet = req.test(password);
                    if (isMet) return null;
                    return (
                      <div key={req.id} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                        <span className="text-sm text-red-600 font-medium leading-tight">{req.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Password checklist (live) */}
            {password.length > 0 && !showFailedReqs && (
              <div className="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Password Requirements</p>
                <div className="grid grid-cols-1 gap-1.5">
                  {PASSWORD_REQUIREMENTS.map((req) => {
                    const isMet = req.test(password);
                    return (
                      <div key={req.id} className="flex items-center gap-2">
                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${isMet ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                          {isMet && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-[11px] ${isMet ? 'text-emerald-600 font-medium' : 'text-gray-500'}`}>
                          {req.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
              Confirm New Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50"
              placeholder="Confirm password"
              required
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}

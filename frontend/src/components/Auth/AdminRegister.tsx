import { useState, useMemo, useRef, useEffect } from 'react';
import { Building2, ArrowRight, ArrowLeft, Eye, EyeOff, Mail, RotateCcw } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { adminRegister, sendOtp, verifyOtp } from '../../services/authService';
import type { AdminRegisterDto } from '../../types/auth.types';
import { parseApiError } from '../../utils/error';
import { getCountries, Country } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en';

interface FieldErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    companyName?: string;
    companyCountry?: string;
    otpCode?: string;
}

// 'otp' is a virtual step between step 1 and step 2
type RegistrationStep = 1 | 'otp' | 2;

const AdminRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<RegistrationStep>(1);
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [otpSentTo, setOtpSentTo] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // OTP: array of 6 digits
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // STEP 1: ADMIN USER INFO
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // STEP 2: COMPANY INFO
  const [companyName, setCompanyName] = useState('');
  const [companyCountry, setCompanyCountry] = useState('');
  const [companyCountryCode, setCompanyCountryCode] = useState<Country | undefined>();
  const [currency, setCurrency] = useState('USD');

  // --- Resend cooldown timer ---
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Country List Logic
  const countryOptions = useMemo(() => {
    return getCountries().map((country) => ({
      value: country,
      label: en[country] || country,
    }));
  }, []);

  const getCurrencyForCountry = (country: Country | undefined) => {
    if (!country) return 'USD';
    switch(country) {
      case 'IN': return 'INR';
      case 'GB': return 'GBP';
      case 'DE': case 'FR': case 'IT': case 'ES': return 'EUR';
      case 'AU': return 'AUD';
      case 'CA': return 'CAD';
      default: return 'USD';
    }
  };

  const handleCompanyCountryChange = (code: Country) => {
    setCompanyCountryCode(code);
    setCompanyCountry(en[code] || code);
    setCurrency(getCurrencyForCountry(code));
    clearFieldError('companyCountry');
  };

  const validateStep1 = (): boolean => {
    const errors: FieldErrors = {};
    if (!firstName.trim()) errors.firstName = 'First name is required';
    else if (firstName.length < 3) errors.firstName = 'At least 3 characters';
    else if (firstName.length > 15) errors.firstName = 'Max 15 characters';

    if (!lastName.trim()) errors.lastName = 'Last name is required';
    else if (lastName.length < 3) errors.lastName = 'At least 3 characters';
    else if (lastName.length > 15) errors.lastName = 'Max 15 characters';

    if (!email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email address';

    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Min 6 characters';

    setFieldErrors(prev => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: FieldErrors = {};
    if (!companyName.trim()) errors.companyName = 'Company name is required';
    if (!companyCountry) errors.companyCountry = 'Company country is required';
    setFieldErrors(prev => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const clearFieldError = (field: keyof FieldErrors) => {
    if (fieldErrors[field]) setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    setGeneralError(null);
  };

  const handleTextInput = (setter: (val: string) => void, field: keyof FieldErrors, value: string) => {
    if (value.length <= 50 && /^[a-zA-Z\s]*$/.test(value)) {
      setter(value);
      if (value.length > 15) {
        setFieldErrors(prev => ({ ...prev, [field]: `${field === 'firstName' ? 'First' : 'Last'} name max 15 characters` }));
      } else {
        clearFieldError(field);
      }
    }
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (!val.trim()) clearFieldError('email');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) setFieldErrors(prev => ({ ...prev, email: 'Invalid email address' }));
    else clearFieldError('email');
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (val.length > 0 && val.length < 6) setFieldErrors(prev => ({ ...prev, password: 'Min 6 characters' }));
    else clearFieldError('password');
  };

  // --- OTP input handlers ---
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // digits only
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only last digit
    setOtp(newOtp);
    clearFieldError('otpCode');
    setGeneralError(null);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) otpRefs.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      otpRefs.current[5]?.focus();
    }
  };

  const getOtpString = () => otp.join('');

  // --- Verify Email: send OTP ---
  const handleVerifyEmail = async () => {
    setGeneralError(null);
    setFieldErrors({});
    if (!validateStep1()) return;

    setSendingOtp(true);
    try {
      await sendOtp(email);
      setOtpSentTo(email);
      setOtp(['', '', '', '', '', '']);
      setStep('otp');
      setResendCooldown(60);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      const apiError = parseApiError(err.message || '');
      if (apiError.field === 'email') setFieldErrors(prev => ({ ...prev, email: apiError.message }));
      else setGeneralError(apiError.message || 'Failed to send verification code');
    } finally {
      setSendingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setSendingOtp(true);
    setGeneralError(null);
    try {
      await sendOtp(email);
      setOtp(['', '', '', '', '', '']);
      setResendCooldown(60);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      const apiError = parseApiError(err.message || '');
      setGeneralError(apiError.message || 'Failed to resend code');
    } finally {
      setSendingOtp(false);
    }
  };

  // --- Verify OTP: move to Step 2 ---
  const handleVerifyOtp = () => {
    const code = getOtpString();
    if (code.length < 6) {
      setFieldErrors(prev => ({ ...prev, otpCode: 'Please enter all 6 digits' }));
      return;
    }
    setGeneralError(null);
    setVerifyingOtp(true);
    verifyOtp(email.trim(), code)
      .then(() => setStep(2))
      .catch((err: any) => {
        const apiError = parseApiError(err.message || '');
        setFieldErrors(prev => ({ ...prev, otpCode: apiError.message || 'Invalid verification code' }));
      })
      .finally(() => setVerifyingOtp(false));
  };

  const handlePrevStep = () => {
    setGeneralError(null);
    if (step === 2) setStep('otp');
    else if (step === 'otp') setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    if (!validateStep2()) return;

    const code = getOtpString();
    if (code.length < 6) {
      setGeneralError('OTP verification is required. Please go back and verify your email.');
      return;
    }

    setLoading(true);
    try {
      const registerData: AdminRegisterDto = {
        firstName,
        lastName,
        email,
        password,
        companyName,
        companyCountry,
        currency,
        otpCode: code,
      };
      await adminRegister(registerData);
      setSuccess(`Company "${companyName}" created successfully!`);
      setTimeout(() => navigate('/auth/admin'), 2000);
    } catch (err: any) {
      const apiError = parseApiError(err.message || '');
      if (apiError.field) {
        setFieldErrors(prev => ({ ...prev, [apiError.field!]: apiError.message }));
        if (['firstName', 'lastName', 'email', 'password', 'otpCode'].includes(apiError.field!)) {
          setStep(apiError.field === 'otpCode' ? 'otp' : 1);
        }
      } else {
        setGeneralError(apiError.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getInputClass = (fieldName: keyof FieldErrors) =>
    `w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 bg-gray-50 ${
      fieldErrors[fieldName]
        ? 'border-red-400 focus:ring-red-500'
        : 'border-gray-200 focus:ring-indigo-500'
    }`;

  const stepLabel = step === 1 ? 'Admin Profile' : step === 'otp' ? 'Email Verification' : 'Company Details';
  const stepNumber = step === 1 ? 1 : step === 'otp' ? 'V' : 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        {/* ===== OTP MODAL STEP ===== */}
        {step === 'otp' && (
          <div className="flex flex-col items-center">
            {/* Icon */}
            <div className="bg-indigo-100 p-4 rounded-full mb-5">
              <Mail className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Please check your email</h1>
            <p className="text-center text-gray-500 text-sm mb-7">
              We've sent a code to <span className="font-semibold text-gray-800">{otpSentTo}</span>
            </p>

            {generalError && (
              <div className="mb-4 w-full text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3 text-center">
                {generalError}
              </div>
            )}

            {/* OTP Boxes */}
            <div className="flex gap-3 mb-6" onPaste={handleOtpPaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => { otpRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(index, e.target.value)}
                  onKeyDown={e => handleOtpKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition-all
                    ${digit ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-gray-50 text-gray-800'}
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200`}
                />
              ))}
            </div>

            {fieldErrors.otpCode && (
              <p className="mb-3 text-sm text-red-500 text-center">{fieldErrors.otpCode}</p>
            )}

            {/* Verify Button */}
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={getOtpString().length < 6 || verifyingOtp}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all font-semibold shadow-lg shadow-indigo-200 disabled:opacity-40 disabled:cursor-not-allowed mb-4"
            >
              {verifyingOtp ? 'Verifying...' : 'Verify'}
            </button>

            {/* Resend */}
            <p className="text-sm text-gray-500">
              Didn't receive an email?{' '}
              {resendCooldown > 0 ? (
                <span className="font-semibold text-gray-400">Resend in {resendCooldown}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={sendingOtp}
                  className="font-semibold text-indigo-600 hover:underline disabled:opacity-50"
                >
                  {sendingOtp ? (
                    <span className="flex items-center gap-1 inline-flex"><RotateCcw className="w-3 h-3 animate-spin" /> Sending...</span>
                  ) : 'Resend'}
                </button>
              )}
            </p>

            {/* Back to Step 1 */}
            <button
              type="button"
              onClick={handlePrevStep}
              className="mt-4 text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Change email
            </button>
          </div>
        )}

        {/* ===== STEP 1 & STEP 2 ===== */}
        {step !== 'otp' && (
          <>
            <div className="flex justify-center mb-6">
              <div className="bg-indigo-100 p-4 rounded-full">
                <Building2 className="w-8 h-8 text-indigo-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">Create Account</h1>
            <p className="text-center text-gray-500 text-sm mb-6">
              Step {step} of 2: {stepLabel}
            </p>

            {generalError && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                {generalError}
              </div>
            )}
            {success && (
              <div className="mb-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={e => handleTextInput(setFirstName, 'firstName', e.target.value)}
                        className={getInputClass('firstName')}
                        placeholder="John"
                      />
                      {fieldErrors.firstName && <p className="mt-1 text-sm text-red-500">{fieldErrors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={e => handleTextInput(setLastName, 'lastName', e.target.value)}
                        className={getInputClass('lastName')}
                        placeholder="Doe"
                      />
                      {fieldErrors.lastName && <p className="mt-1 text-sm text-red-500">{fieldErrors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => handleEmailChange(e.target.value)}
                      className={getInputClass('email')}
                      placeholder="admin@company.com"
                    />
                    {fieldErrors.email && <p className="mt-1 text-sm text-red-500">{fieldErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => handlePasswordChange(e.target.value)}
                        className={getInputClass('password')}
                        placeholder="Min 6 characters"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {fieldErrors.password && <p className="mt-1 text-sm text-red-500">{fieldErrors.password}</p>}
                  </div>

                  {/* VERIFY EMAIL button (replaces Next Step) */}
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    disabled={sendingOtp}
                    className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all font-semibold shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                  >
                    {sendingOtp ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">⏳</span> Sending Code...
                      </span>
                    ) : (
                      <><Mail className="w-5 h-5" /> Verify Email</>
                    )}
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  {/* Email verified badge */}
                  <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-2">
                    <span className="text-emerald-500">✓</span>
                    <span>Email verified: <strong>{email}</strong></span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={e => { setCompanyName(e.target.value); if (e.target.value.trim()) clearFieldError('companyName'); }}
                      className={getInputClass('companyName')}
                      placeholder="Acme Salon"
                    />
                    {fieldErrors.companyName && <p className="mt-1 text-sm text-red-500">{fieldErrors.companyName}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Country</label>
                      <select
                        value={companyCountryCode || ''}
                        onChange={e => handleCompanyCountryChange(e.target.value as Country)}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 bg-gray-50 ${
                          fieldErrors.companyCountry ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 focus:ring-indigo-500'
                        }`}
                      >
                        <option value="">Select Country</option>
                        {countryOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      {fieldErrors.companyCountry && <p className="mt-1 text-sm text-red-500">{fieldErrors.companyCountry}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Currency</label>
                      <select
                        value={currency}
                        onChange={e => setCurrency(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="INR">INR (₹)</option>
                        <option value="AUD">AUD (A$)</option>
                        <option value="CAD">CAD (C$)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-2">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 px-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 disabled:opacity-50"
                    >
                      {loading ? <span className="animate-spin">⏳</span> : 'Create Account'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </>
        )}

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Link to="/auth/admin" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            Already have an account? Sign in here →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;


import { useState } from 'react';
import { Building2, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { adminRegister } from '../../services/authService';
import type { AdminRegisterDto } from '../../types/auth.types';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // STEP 1: ADMIN USER INFO
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userCountry, setUserCountry] = useState('');

  // STEP 2: COMPANY INFO
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [companyCountry, setCompanyCountry] = useState('');
  const [currency, setCurrency] = useState('USD');

  const handleNextStep = () => {
    setError(null);
    if (step === 1) {
      if (!firstName || !lastName || !email || !password || !userPhone || !userCountry) {
        setError('Please fill in all personal details, including phone and country.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setError(null);
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!companyName || !phone || !companyCountry) {
        setError("Company name, phone, and country are required.");
        return;
    }

    setLoading(true);

    try {
      const registerData: AdminRegisterDto = {
        firstName,
        lastName,
        email,
        password,
        userPhone,
        userCountry,
        companyName,
        companyPhone: phone,
        companyAddress: address || undefined,
        companyCountry,
        currency,
      };

      await adminRegister(registerData);
      
      setSuccess(`Company "${companyName}" created successfully!`);
      
      // Redirect to login after success
      setTimeout(() => navigate('/auth/admin'), 2000);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
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
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Create Account
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
            Step {step} of 2: {step === 1 ? 'Admin Profile' : 'Company Details'}
        </p>

        {/* ERROR/SUCCESS MESSAGES */}
        {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
              {error}
            </div>
        )}
        {success && (
            <div className="mb-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3">
              {success}
            </div>
        )}

        <form onSubmit={handleSubmit}>
            {/* STEP 1 FORM */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                            placeholder="John"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                            placeholder="Doe"
                        />
                    </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                    placeholder="admin@company.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                    placeholder="Min 6 characters"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Phone</label>
                        <input
                            type="tel"
                            value={userPhone}
                            onChange={e => setUserPhone(e.target.value.replace(/[^\d+]/g, ''))}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                            placeholder="+1 234 567 890"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Country</label>
                        <input
                            type="text"
                            value={userCountry}
                            onChange={e => setUserCountry(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                            placeholder="USA"
                        />
                    </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all font-semibold shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 mt-2"
                >
                  Next Step <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* STEP 2 FORM */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                   <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Company Name</label>
                   <input
                     type="text"
                     value={companyName}
                     onChange={e => setCompanyName(e.target.value)}
                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                     placeholder="Acme Salon"
                   />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Country</label>
                     
                       <input
                     type="text"
                     value={companyCountry}
                     onChange={e => setCompanyCountry(e.target.value)}
                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                     placeholder="USA"
                   />
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
                      </select>
                    </div>
                </div>
                
                <div>
                   <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Address</label>
                   <input
                     type="text"
                     value={address}
                     onChange={e => setAddress(e.target.value)}
                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                     placeholder="Optional"
                   />
                </div>

                <div>
                   <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Phone</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value.replace(/[^\d+]/g, ''))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                        placeholder="+1 234 567 890"
                      />
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

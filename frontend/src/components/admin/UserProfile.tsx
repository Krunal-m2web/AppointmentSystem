import { useState, useEffect } from 'react';
import { User, Mail, Lock, Shield, Save, Eye, EyeOff, Key } from 'lucide-react';
import { getToken, getUserNameFromToken, getRoleFromToken, getEmailFromToken } from '../../utils/auth';
import { changePassword } from '../../services/authService';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';

export function UserProfile() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});


  useEffect(() => {
    const token = getToken();
    if (token) {
      const name = getUserNameFromToken(token);
      const email = getEmailFromToken(token);
      const role = getRoleFromToken(token);
      
      setUserName(name || 'User');
      setUserEmail(email || '');
      setUserRole(role || 'Admin');
    }
  }, []);

  const validatePasswordForm = () => {
    const errors: Record<string, string> = {};
    
    if (!passwords.current) {
      errors.current = "Current password is required";
    }

    if (!passwords.new) {
      errors.new = "New password is required";
    } else if (passwords.new.length < 6) {
      errors.new = "Password must be at least 6 characters long";
    }

    if (!passwords.confirm) {
      errors.confirm = "Please confirm your new password";
    } else if (passwords.new !== passwords.confirm) {
      errors.confirm = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;

    setIsUpdating(true);
    try {
      await changePassword({
        currentPassword: passwords.current,
        newPassword: passwords.new
      });
      
      toast.success("Password updated successfully!");
      setPasswords({ current: '', new: '', confirm: '' });
      setFormErrors({});
    } catch (error: any) {
      let errorMessage = "Failed to update password.";
      if (typeof error.message === 'string') {
          errorMessage = error.message;
          
          if (errorMessage.toLowerCase().includes("current") || errorMessage.toLowerCase().includes("incorrect")) {
            setFormErrors({ current: errorMessage });
          }
      }
      toast.error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };


  return (
    <div className="p-6 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Profile</h1>
        <p className="text-gray-500 mt-1">View your profile details and update security settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Info Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-xl">
              <span className="text-3xl font-bold text-white">
                {userName.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">{userName}</h2>
            <p className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mt-3 font-bold uppercase tracking-widest">
              {userRole.toLowerCase()}
            </p>
            
            <div className="w-full mt-10 space-y-5 text-left">
               <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="truncate flex-1">{userEmail}</span>
               </div>
               <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
                    <Shield className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="flex-1 font-medium text-emerald-600">Verified Account</span>
               </div>
            </div>
          </div>
        </div>

        {/* Right: Detailed Sections */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information (Read Only) */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-gray-900">Personal Details</h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Display Name</label>
                  <div className="px-4 py-2.5 bg-gray-100/50 border border-gray-200 rounded-xl text-gray-500 font-medium cursor-not-allowed">
                    {userName}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Account Type</label>
                  <div className="px-4 py-2.5 bg-gray-100/50 border border-gray-200 rounded-xl text-gray-500 font-medium cursor-not-allowed capitalize">
                    {userRole.toLowerCase()}
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <div className="px-4 py-2.5 bg-gray-100/50 border border-gray-200 rounded-xl text-gray-500 font-medium cursor-not-allowed flex items-center justify-between">
                  {userEmail}
                  <Lock className="w-4 h-4 text-gray-300" />
                </div>
              </div>
              <div className="flex items-start gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed font-medium">To maintain security, name and email changes must be performed by the main system administrator.</p>
              </div>
            </div>
          </section>

          {/* Change Password */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
              <Key className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-gray-900">Security & Password</h3>
            </div>
            <form onSubmit={handlePasswordChange} className="p-8 space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) => {
                      setPasswords({...passwords, current: e.target.value});
                      if (formErrors.current) setFormErrors({...formErrors, current: ''});
                    }}
                    className={`w-full pl-4 pr-11 py-2.5 border rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none ${
                        formErrors.current ? 'border-red-300 bg-red-50/30' : 'border-gray-300'
                    }`}
                    placeholder="Enter current password"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formErrors.current && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">{formErrors.current}</p>
                )}
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwords.new}
                      onChange={(e) => {
                        setPasswords({...passwords, new: e.target.value});
                        if (formErrors.new) setFormErrors({...formErrors, new: ''});
                      }}
                      className={`w-full pl-4 pr-11 py-2.5 border rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none ${
                          formErrors.new ? 'border-red-300 bg-red-50/30' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {formErrors.new && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{formErrors.new}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwords.confirm}
                      onChange={(e) => {
                        setPasswords({...passwords, confirm: e.target.value});
                        if (formErrors.confirm) setFormErrors({...formErrors, confirm: ''});
                      }}
                      className={`w-full pl-4 pr-11 py-2.5 border rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none ${
                          formErrors.confirm ? 'border-red-300 bg-red-50/30' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {formErrors.confirm && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{formErrors.confirm}</p>
                  )}
                </div>

              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 active:scale-[0.98]"
                >
                  <Save className="w-4.5 h-4.5" />
                  {isUpdating ? 'Saving...' : 'Save Password'}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

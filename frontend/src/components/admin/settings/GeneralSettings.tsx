import React from 'react';
import { User, Mail, Bell, Save, MessageSquare, Clock } from 'lucide-react';

interface GeneralSettingsProps {
  defaultSenderName: string;
  setDefaultSenderName: (value: string) => void;
  defaultSenderEmail: string;
  setDefaultSenderEmail: (value: string) => void;
  defaultReplyEmail: string;
  setDefaultReplyEmail: (value: string) => void;
  emailNotificationsEnabled: boolean;
  setEmailNotificationsEnabled: (enabled: boolean) => void;
  smsNotificationsEnabled: boolean;
  setSmsNotificationsEnabled: (enabled: boolean) => void;
  requireTimeOffApproval: boolean;
  setRequireTimeOffApproval: (enabled: boolean) => void;
  allowCustomerRescheduling: boolean;
  setAllowCustomerRescheduling: (enabled: boolean) => void;
  reschedulingMinLeadTime: number;
  setReschedulingMinLeadTime: (value: number) => void;
  allowCustomerCanceling: boolean;
  setAllowCustomerCanceling: (enabled: boolean) => void;
  cancelingMinLeadTime: number;
  setCancelingMinLeadTime: (value: number) => void;
  onSave: () => void;
  loading?: boolean;
  companyNameProp?: string;
  domainProp?: string;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  defaultSenderName,
  setDefaultSenderName,
  defaultSenderEmail,
  setDefaultSenderEmail,
  defaultReplyEmail,
  setDefaultReplyEmail,
  emailNotificationsEnabled,
  setEmailNotificationsEnabled,
  smsNotificationsEnabled,
  setSmsNotificationsEnabled,
  requireTimeOffApproval,
  setRequireTimeOffApproval,
  allowCustomerRescheduling,
  setAllowCustomerRescheduling,
  reschedulingMinLeadTime,
  setReschedulingMinLeadTime,
  allowCustomerCanceling,
  setAllowCustomerCanceling,
  cancelingMinLeadTime,
  setCancelingMinLeadTime,
  onSave,
  loading = false,
  companyNameProp,
  domainProp,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
          <Bell className="w-5 h-5 text-indigo-600" />
          General Settings
        </h2>
        <p className="text-sm text-gray-500 mt-1 font-normal">Configure default email behavior for your entire system</p>
      </div>

      <div className="p-8">
        <div className="space-y-10">
          {/* Sender Information Section */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-4">
              <Mail className="w-4 h-4" />
              Email Sender Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Default Sender Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-500" />
                  Default Sender Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={defaultSenderName}
                    onChange={(e) => setDefaultSenderName(e.target.value)}
                    placeholder={`Default: ${companyNameProp || 'Company Name'}`}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none font-medium text-gray-900 shadow-sm"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-2 font-medium italic">Appears in the "From" field of emails</p>
              </div>

              {/* Default Sender Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-500" />
                  Default Sender Email
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    value={defaultSenderEmail}
                    onChange={(e) => setDefaultSenderEmail(e.target.value)}
                    placeholder={`Default: noreply@${domainProp || 'yourdomain.com'}`}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none font-medium text-gray-900 shadow-sm"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-2 font-medium italic">The address used as the sender</p>
              </div>

              {/* Default Reply-to Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-500" />
                  Default Reply-to Email
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    value={defaultReplyEmail}
                    onChange={(e) => setDefaultReplyEmail(e.target.value)}
                    placeholder={`Default: noreply@${domainProp || 'yourdomain.com'}`}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none font-medium text-gray-900 shadow-sm"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-2 font-medium italic">Where customer replies are directed</p>
              </div>
            </div>
          </div>

          {/* Master Switches Section */}
          <div className="space-y-6 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4" />
              System-wide Delivery Switches
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Enable Email Notifications Switch */}
              <div className="group flex flex-col justify-between p-6 bg-indigo-50/30 rounded-2xl border border-indigo-100 hover:bg-indigo-50/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-indigo-50">
                    <Bell className={`w-6 h-6 transition-colors ${emailNotificationsEnabled ? 'text-indigo-600' : 'text-gray-400'}`} />
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotificationsEnabled}
                      onChange={(e) => setEmailNotificationsEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[24px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[16px] after:w-[16px] after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                  </label>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 leading-tight">Email Delivery</p>
                  <p className="text-[11px] text-indigo-600/70 font-medium mt-1">Master switch for all system email notifications</p>
                </div>
              </div>

              {/* Enable SMS Notifications Switch */}
              <div className="group flex flex-col justify-between p-6 bg-indigo-50/30 rounded-2xl border border-indigo-100 hover:bg-indigo-50/50 transition-colors relative overflow-hidden">
                <div className="absolute top-2 right-4 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider animate-pulse">
                  Soon
                </div>
                <div className="flex justify-between items-start mb-4 opacity-75">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-indigo-50">
                    <MessageSquare className={`w-6 h-6 transition-colors ${smsNotificationsEnabled ? 'text-indigo-600' : 'text-gray-400'}`} />
                  </div>
                  <label className="relative inline-flex items-center cursor-not-allowed opacity-50">
                    <input
                      type="checkbox"
                      checked={smsNotificationsEnabled}
                      onChange={() => {}}
                      disabled={true}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[24px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[16px] after:w-[16px] after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                  </label>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 leading-tight">SMS Delivery</p>
                  <p className="text-[11px] text-indigo-600/70 font-medium mt-1">Master switch for all system SMS notifications</p>
                </div>
              </div>

              {/* Time Off Approval Switch */}
              <div className="group flex flex-col justify-between p-6 bg-indigo-50/30 rounded-2xl border border-indigo-100 hover:bg-indigo-50/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-indigo-50">
                    <User className={`w-6 h-6 transition-colors ${requireTimeOffApproval ? 'text-indigo-600' : 'text-gray-400'}`} />
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requireTimeOffApproval}
                      onChange={(e) => setRequireTimeOffApproval(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[24px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[16px] after:w-[16px] after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                  </label>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 leading-tight">Time Off Approval</p>
                  <p className="text-[11px] text-indigo-600/70 font-medium mt-1">If disabled, requests are automatically approved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Modification Policies */}
          <div className="space-y-6 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4" />
              Customer Modification Policies
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Rescheduling Policy */}
              <div className="space-y-4">
                <div className="group flex items-center justify-between p-6 bg-indigo-50/30 rounded-2xl border border-indigo-100 hover:bg-indigo-50/50 transition-colors">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-indigo-50">
                      <Save className={`w-6 h-6 transition-colors ${allowCustomerRescheduling ? 'text-indigo-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 leading-tight">Allow Online Rescheduling</p>
                      <p className="text-[11px] text-indigo-600/70 font-medium mt-1">Reschedule via email link</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowCustomerRescheduling}
                      onChange={(e) => setAllowCustomerRescheduling(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[24px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[16px] after:w-[16px] after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                  </label>
                </div>

                {allowCustomerRescheduling && (
                  <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
                      Minimum lead time (hours)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={reschedulingMinLeadTime}
                      onChange={(e) => setReschedulingMinLeadTime(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none font-medium"
                    />
                    <p className="text-[10px] text-gray-400 mt-2">Hours before appointment to allow rescheduling</p>
                  </div>
                )}
              </div>

              {/* Cancellation Policy */}
              <div className="space-y-4">
                <div className="group flex items-center justify-between p-6 bg-indigo-50/30 rounded-2xl border border-indigo-100 hover:bg-indigo-50/50 transition-colors">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-indigo-50">
                      <Mail className={`w-6 h-6 transition-colors ${allowCustomerCanceling ? 'text-indigo-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 leading-tight">Allow Online Cancellation</p>
                      <p className="text-[11px] text-indigo-600/70 font-medium mt-1">Cancel via email link</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowCustomerCanceling}
                      onChange={(e) => setAllowCustomerCanceling(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[24px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[16px] after:w-[16px] after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                  </label>
                </div>

                {allowCustomerCanceling && (
                  <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
                      Minimum lead time (hours)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={cancelingMinLeadTime}
                      onChange={(e) => setCancelingMinLeadTime(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none font-medium"
                    />
                    <p className="text-[10px] text-gray-400 mt-2">Hours before appointment to allow cancellation</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end pt-8 border-t border-gray-100">
            <button
              onClick={onSave}
              disabled={loading}
              className="flex items-center gap-2.5 px-10 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] uppercase tracking-wider text-xs"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4.5 h-4.5" />
              )}
              Save General Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

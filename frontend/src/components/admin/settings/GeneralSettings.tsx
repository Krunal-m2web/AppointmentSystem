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
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
          <Bell className="w-5 h-5 text-indigo-600" />
          Global Notification Preferences
        </h2>
        <p className="text-sm text-gray-500 mt-1 font-normal">Configure default email behavior for your entire system</p>
      </div>

      <div className="p-8">
        <div className="space-y-8 max-w-2xl">
          {/* Default Sender Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 mt-2 uppercase tracking-wide flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-500" />
              Default sender name
            </label>
            <div className="relative group">
              <input
                type="text"
                value={defaultSenderName}
                onChange={(e) => setDefaultSenderName(e.target.value)}
                placeholder="Appointment System"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none font-medium text-gray-900 shadow-sm"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 font-medium">This name will appear in the "From" field of all outgoing emails</p>
          </div>

          {/* Default Sender Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 mt-2 uppercase tracking-wide flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-500" />
              Default sender email
            </label>
            <div className="relative group">
              <input
                type="email"
                value={defaultSenderEmail}
                onChange={(e) => setDefaultSenderEmail(e.target.value)}
                placeholder="noreply@yourdomain.com"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none font-medium text-gray-900 shadow-sm"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 font-medium">The email address used as the sender. If empty, uses system default.</p>
          </div>

          {/* Default Reply-to Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 mt-2 uppercase tracking-wide flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-500" />
              Default reply-to email
            </label>
            <div className="relative group">
              <input
                type="email"
                value={defaultReplyEmail}
                onChange={(e) => setDefaultReplyEmail(e.target.value)}
                placeholder="no-reply@example.com"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none font-medium text-gray-900 shadow-sm"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 font-medium">The email address where customer replies will be directed</p>
          </div>

          {/* Enable Email Notifications Switch */}
          <div className="group flex items-center justify-between p-6 bg-indigo-50/30 rounded-2xl border border-indigo-100 hover:bg-indigo-50/50 transition-colors">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-indigo-50">
                <Bell className={`w-6 h-6 transition-colors ${emailNotificationsEnabled ? 'text-indigo-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 leading-tight">Enable Email Delivery</p>
                <p className="text-xs text-indigo-600/70 font-medium mt-0.5">Master switch for all system-generated email notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotificationsEnabled}
                onChange={(e) => setEmailNotificationsEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[28px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[19px] after:w-[19px] after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
            </label>
          </div>

          {/* Enable SMS Notifications Switch */}
          <div className="group flex items-center justify-between p-6 bg-indigo-50/30 rounded-2xl border border-indigo-100 hover:bg-indigo-50/50 transition-colors relative overflow-hidden">
            <div className="absolute top-2 right-4 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider animate-pulse">
              Coming Soon
            </div>
            <div className="flex gap-4 opacity-75">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-indigo-50">
                <MessageSquare className={`w-6 h-6 transition-colors ${smsNotificationsEnabled ? 'text-indigo-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 leading-tight">Enable SMS Delivery</p>
                <p className="text-xs text-indigo-600/70 font-medium mt-0.5">Master switch for all system-generated SMS notifications</p>
                <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest mt-1">Development in Progress</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-not-allowed opacity-50">
              <input
                type="checkbox"
                checked={smsNotificationsEnabled}
                onChange={() => {}}
                disabled={true}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[28px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[19px] after:w-[19px] after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
            </label>
          </div>

          {/* Time Off Approval Switch */}
          <div className="group flex items-center justify-between p-6 bg-indigo-50/30 rounded-2xl border border-indigo-100 hover:bg-indigo-50/50 transition-colors">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-indigo-50">
                <User className={`w-6 h-6 transition-colors ${requireTimeOffApproval ? 'text-indigo-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 leading-tight">Require Approval for Time Off</p>
                <p className="text-xs text-indigo-600/70 font-medium mt-0.5">If disabled, staff time off requests are automatically approved</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={requireTimeOffApproval}
                onChange={(e) => setRequireTimeOffApproval(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[28px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[19px] after:w-[19px] after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
            </label>
          </div>

          <div className="h-px bg-gray-100 my-8"></div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-indigo-600" />
            Customer Modification Policies
          </h3>

          {/* Rescheduling Policy */}
          <div className="space-y-4">
            <div className="group flex items-center justify-between p-6 bg-indigo-50/30 rounded-2xl border border-indigo-100 hover:bg-indigo-50/50 transition-colors">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-indigo-50">
                  <Save className={`w-6 h-6 transition-colors ${allowCustomerRescheduling ? 'text-indigo-600' : 'text-gray-400'}`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 leading-tight">Allow Online Rescheduling</p>
                  <p className="text-xs text-indigo-600/70 font-medium mt-0.5">Allow customers to reschedule their appointment via link</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowCustomerRescheduling}
                  onChange={(e) => setAllowCustomerRescheduling(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[28px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[19px] after:w-[19px] after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
              </label>
            </div>

            {allowCustomerRescheduling && (
              <div className="pl-6 border-l-2 border-indigo-100 ml-6 pb-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Minimum lead time for rescheduling (hours)
                </label>
                <input
                  type="number"
                  min="0"
                  value={reschedulingMinLeadTime}
                  onChange={(e) => setReschedulingMinLeadTime(parseInt(e.target.value) || 0)}
                  className="w-full max-w-[200px] px-4 py-2 border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none font-medium"
                />
                <p className="text-xs text-gray-400 mt-2">How many hours before the appointment must the customer reschedule?</p>
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
                  <p className="text-xs text-indigo-600/70 font-medium mt-0.5">Allow customers to cancel their appointment via link</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowCustomerCanceling}
                  onChange={(e) => setAllowCustomerCanceling(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[28px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[19px] after:w-[19px] after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
              </label>
            </div>

            {allowCustomerCanceling && (
              <div className="pl-6 border-l-2 border-indigo-100 ml-6 pb-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Minimum lead time for cancellation (hours)
                </label>
                <input
                  type="number"
                  min="0"
                  value={cancelingMinLeadTime}
                  onChange={(e) => setCancelingMinLeadTime(parseInt(e.target.value) || 0)}
                  className="w-full max-w-[200px] px-4 py-2 border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none font-medium"
                />
                <p className="text-xs text-gray-400 mt-2">How many hours before the appointment must the customer cancel?</p>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end pt-8 border-t border-gray-100 mt-10">
            <button
              onClick={onSave}
              className="flex items-center gap-2.5 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 hover:shadow-indigo-200 active:scale-[0.98]"
            >
              <Save className="w-4.5 h-4.5" />
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

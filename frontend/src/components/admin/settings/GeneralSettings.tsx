import React from 'react';
import { User, Mail, Bell, Save, MessageSquare, Clock, Settings as SettingsIcon } from 'lucide-react';

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
    <div className="bg-slate-50/50 rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="p-8 bg-white border-b border-slate-200">
        <h2 className= "text-xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-indigo-600" />
          General Configuration
        </h2>
        <p className="text-[15px] text-slate-500 mt-2 leading-relaxed max-w-2xl">
          Manage core system defaults, sender identities, and establish global policies for team behavior and customer interactions.
        </p>
      </div>

      <div className="p-8 space-y-12">
        
        {/* Sender Information Section */}
        <section>
          <div className="mb-5">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              Email Sender Configuration
            </h3>
            <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed">Ensure brand consistency by verifying how your system emails appear to your customers.</p>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-[15px]">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              
              {/* Default Sender Name */}
              <div className="p-6 hover:bg-slate-50/50 transition-colors">
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Default Sender Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    value={defaultSenderName}
                    onChange={(e) => setDefaultSenderName(e.target.value)}
                    placeholder={companyNameProp || 'Acme Corp'}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none text-[15px] font-medium text-slate-900 placeholder:text-slate-400 shadow-sm transition-all"
                  />
                </div>
                <p className="text-[13px] text-slate-500 mt-2.5 leading-tight">Appears prominently in the "From" field of all outgoing communications.</p>
              </div>

              {/* Default Sender Email */}
              <div className="p-6 hover:bg-slate-50/50 transition-colors">
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Sender Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    value={defaultSenderEmail}
                    onChange={(e) => setDefaultSenderEmail(e.target.value)}
                    placeholder={`noreply@${domainProp || 'yourdomain.com'}`}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none text-[15px] font-medium text-slate-900 placeholder:text-slate-400 shadow-sm transition-all"
                  />
                </div>
                <p className="text-[13px] text-slate-500 mt-2.5 leading-tight">The official verified address designated as the origin of these messages.</p>
              </div>

              {/* Default Reply-to Email */}
              <div className="p-6 hover:bg-slate-50/50 transition-colors">
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Reply-to Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    value={defaultReplyEmail}
                    onChange={(e) => setDefaultReplyEmail(e.target.value)}
                    placeholder={`support@${domainProp || 'yourdomain.com'}`}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none text-[15px] font-medium text-slate-900 placeholder:text-slate-400 shadow-sm transition-all"
                  />
                </div>
                <p className="text-[13px] text-slate-500 mt-2.5 leading-tight">Direct customer responses or inquiries to this specific inbox.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Master Switches Section */}
        <section>
          <div className="mb-5">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Bell className="w-4 h-4 text-slate-400" />
              System-wide Policies
            </h3>
            <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed">Control global master switches for push notifications, messaging behaviors, and essential staff workflows.</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
            {/* Email Delivery */}
            <div className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50/50 border border-indigo-100/50 text-indigo-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-slate-900 tracking-tight">Turn Off Email Notifications</h4>
                  <p className="text-[13px] text-slate-500 mt-0.5 leading-snug">Functions as a master kill-switch for all automated system email notifications</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotificationsEnabled}
                  onChange={(e) => setEmailNotificationsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[20px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
              </label>
            </div>

            {/* SMS Delivery */}
            <div className="flex items-center justify-between p-6 bg-slate-50/30 opacity-70">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-[15px] font-semibold text-slate-900 tracking-tight">SMS Delivery Overrides</h4>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded uppercase tracking-wider">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-500 mt-0.5 leading-snug">Functions as a master kill-switch for all automated system SMS notifications</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-not-allowed opacity-50">
                <input
                  type="checkbox"
                  checked={smsNotificationsEnabled}
                  disabled={true}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[20px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-slate-400 shadow-inner"></div>
              </label>
            </div>

            {/* Time Off Approval */}
            <div className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-50/50 border border-teal-100/50 text-teal-600">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-slate-900 tracking-tight">Strict Time-Off Approvals</h4>
                  <p className="text-[13px] text-slate-500 mt-0.5 leading-snug">When disabled, any submitted staff absence requests bypass management and are automatically approved</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={requireTimeOffApproval}
                  onChange={(e) => setRequireTimeOffApproval(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[20px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Customer Modification Policies */}
        <section>
          <div className="mb-5">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              Customer Modification Policies
            </h3>
            <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed">Establish thresholds and rules controlling how and when customers are permitted to self-manage, move, or modify their existing appointments online.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rescheduling */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-6 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-50/50 border border-amber-100/50 text-amber-600">
                    <Save className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-slate-900 tracking-tight">Online Rescheduling</h4>
                    <p className="text-[13px] text-slate-500 mt-0.5 leading-snug">Allow securely via magic email link</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowCustomerRescheduling}
                    onChange={(e) => setAllowCustomerRescheduling(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[20px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              {/* Expandable Lead Time */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-slate-50/80 ${allowCustomerRescheduling ? 'max-h-32 border-t border-slate-100 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6">
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Minimum lead time threshold prior to appointment
                  </label>
                  <div className="flex items-center mt-2 group focus-within:ring-2 focus-within:ring-indigo-600/20 focus-within:border-indigo-600 rounded-lg shadow-sm w-max transition-all">
                    <input
                      type="number"
                      min="0"
                      value={reschedulingMinLeadTime}
                      onChange={(e) => setReschedulingMinLeadTime(parseInt(e.target.value) || 0)}
                      className="w-24 px-4 py-2 bg-white border border-slate-300 border-r-0 rounded-l-lg outline-none font-medium text-[15px] text-slate-900 z-10 text-center"
                    />
                    <span className="px-5 py-2 bg-slate-100 border border-slate-300 rounded-r-lg text-sm text-slate-600 font-medium whitespace-nowrap">
                      hours
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Canceling */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-6 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-rose-50/50 border border-rose-100/50 text-rose-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-slate-900 tracking-tight">Online Cancellation</h4>
                    <p className="text-[13px] text-slate-500 mt-0.5 leading-snug">Allow securely via magic email link</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowCustomerCanceling}
                    onChange={(e) => setAllowCustomerCanceling(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[20px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              {/* Expandable Lead Time */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-slate-50/80 ${allowCustomerCanceling ? 'max-h-32 border-t border-slate-100 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6">
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Minimum lead time threshold prior to appointment
                  </label>
                  <div className="flex items-center mt-2 group focus-within:ring-2 focus-within:ring-indigo-600/20 focus-within:border-indigo-600 rounded-lg shadow-sm w-max transition-all">
                    <input
                      type="number"
                      min="0"
                      value={cancelingMinLeadTime}
                      onChange={(e) => setCancelingMinLeadTime(parseInt(e.target.value) || 0)}
                      className="w-24 px-4 py-2 bg-white border border-slate-300 border-r-0 rounded-l-lg outline-none font-medium text-[15px] text-slate-900 z-10 text-center"
                    />
                    <span className="px-5 py-2 bg-slate-100 border border-slate-300 rounded-r-lg text-sm text-slate-600 font-medium whitespace-nowrap">
                      hours
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Footer / Save Action */}
      <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
        <button
          onClick={onSave}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Changes
        </button>
      </div>
    </div>
  );
};

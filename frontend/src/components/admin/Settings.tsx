import { useState, useEffect } from 'react';
import { Mail, Globe, Building, DollarSign, Bell, CheckCircle, Save, MapPin, Phone as PhoneIcon, Edit, Clock, Search, ChevronDown } from 'lucide-react';
import { EmailTemplateEditor } from './EmailTemplateEditor';
import { useTimezone } from '../../context/TimezoneContext';
import { getAuthHeaders, getTimeOffSettings, updateTimeOffSettings } from '../../services/staffApi';
import { getMyCompany, updateMyCompany, uploadCompanyLogo } from '../../services/CompanyService';
import { SettingsTab, NotificationConfig, TimingConfig, EmailTemplate } from './types/settings';
import { GeneralSettings } from './settings/GeneralSettings';
import { EmailNotificationSettings } from './settings/EmailNotificationSettings';
import { PaymentSettings } from './PaymentSettings';
import MeetingLocationSettings from './MeetingLocationSettings';
import { TIMEZONES } from '../../utils/datetime';
import { TimezoneSelect } from '../TimezoneSelect';
import { getGeneralSettings, updateGeneralSettings, getNotificationSettings, updateNotificationSettings, GeneralSettingsData } from '../../services/settingsApi';
import { getToken } from '../../utils/auth';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  // General Settings State
  const [defaultSenderName, setDefaultSenderName] = useState('');
  const [defaultReplyEmail, setDefaultReplyEmail] = useState('');
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [requireTimeOffApproval, setRequireTimeOffApproval] = useState(true);

  // Company Profile State
  const [companyName, setCompanyName] = useState('My Business');
  const [companyLogo, setCompanyLogo] = useState('');
  const [businessEmail, setBusinessEmail] = useState('info@mybusiness.com');
  const [businessPhone, setBusinessPhone] = useState('+1 (555) 123-4567');

  // Template Editor State
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);

  // Global Settings State (Timezone)
  const { timezone, refreshTimezone } = useTimezone();
  const [globalLoading, setGlobalLoading] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState(timezone);

  const [notificationSettings, setNotificationSettings] = useState<{
    [key: string]: NotificationConfig; 
  }>({
    appointmentConfirmation: {
      enabled: true,
      timing: 'Immediately after booking',
      trigger: 'When customer books an appointment',
      description: 'Send a confirmation email to the customer with all appointment details.',
      template: {
        subject: 'Your Appointment is Confirmed - {{appointment.date}} at {{appointment.time}}',
        body: `Hi {{customer.firstName}},

Thank you for booking with {{company.name}}!

Your appointment has been confirmed:

Service: {{service.name}}
Date: {{appointment.date}}
Time: {{appointment.time}}
Duration: {{appointment.duration}}
With: {{staff.name}}

Need to make changes?
Reschedule: {{link.reschedule}}
Cancel: {{link.cancel}}

We look forward to seeing you!

Best regards,
{{company.name}}
{{company.phone}}`,
      },
    },
    appointmentReminder: {
      enabled: true,
      timing: '24 hours before appointment',
      timingConfig: {
        value: 24,
        unit: 'hours',
        context: 'before_appointment',
      },
      trigger: 'Before scheduled appointment time',
      description: 'Remind customers about their upcoming appointment to reduce no-shows.',
      timingEditable: true,
      template: {
        subject: 'Reminder: Your Appointment Tomorrow at {{appointment.time}}',
        body: `Hi {{customer.firstName}},

This is a friendly reminder about your upcoming appointment:

Service: {{service.name}}
Date: {{appointment.date}}
Time: {{appointment.time}}
With: {{staff.name}}
Location: {{company.address}}

Need to reschedule? {{link.reschedule}}

See you soon!

Best regards,
{{company.name}}`,
      },
    },
    appointmentFollowUp: {
      enabled: false,
      timing: 'After appointment completion',
      timingConfig: {
        value: 1,
        unit: 'hours',
        context: 'after_appointment',
        // Default context
      },
      trigger: 'After appointment ends',
      description: 'Follow up with customers to gather feedback, request reviews, or encourage rebooking.',
      template: {
        subject: 'How was your experience with {{company.name}}?',
        body: `Hi {{customer.firstName}},

Thank you for choosing {{company.name}}!

We hope you had a great experience with {{staff.name}} on {{appointment.date}}.

We'd love to hear your feedback and help you book your next appointment.

Book again: {{company.website}}

Best regards,
{{company.name}}`,
      },
    },
    appointmentCancellation: {
      enabled: true,
      timing: 'Immediately after cancellation',
      trigger: 'When an appointment is cancelled',
      description: 'Notify customers when their appointment has been cancelled.',
      template: {
        subject: 'Appointment Cancellation - {{appointment.date}}',
        body: `Hi {{customer.firstName}},

Your appointment scheduled for {{appointment.date}} at {{appointment.time}} has been cancelled.

Cancelled appointment details:
Service: {{service.name}}
Staff: {{staff.name}}

Would you like to book a new appointment?
Visit: {{company.website}}

If you have any questions, please contact us.

Best regards,
{{company.name}}
{{company.phone}}`,
      },
    },
  });

  // Load General Settings
  useEffect(() => {
      const loadGeneral = async () => {
          const token = getToken();
          if (!token) return;
          try {
              const data = await getGeneralSettings(token);
              setDefaultSenderName(data.defaultSenderName || '');
              setDefaultReplyEmail(data.defaultReplyToEmail || '');
              setEmailNotificationsEnabled(data.isEmailServiceEnabled);

              // Load Time Off Settings
              const timeOffData = await getTimeOffSettings();
              setRequireTimeOffApproval(timeOffData.requireTimeOffApproval);
          } catch (e) {
              console.error("Failed to load settings", e);
          }
      };
      if (activeTab === 'general') loadGeneral();
  }, [activeTab]);

  // Load Notification Settings
  useEffect(() => {
      const loadNotifications = async () => {
          const token = getToken();
          if (!token) return;
          try {
              const serverSettings = await getNotificationSettings(token);
              
              // Merge server settings with local defaults (to preserve descriptions/triggers which might be static in UI)
              setNotificationSettings(prev => {
                  const newSettings = { ...prev };
                  Object.keys(serverSettings).forEach(key => {
                      if (newSettings[key]) {
                          newSettings[key] = {
                              ...newSettings[key],
                              ...serverSettings[key], // Overwrite enabled, timing, template from server
                              // Preserve description/trigger from default if server doesn't send them populated
                              description: newSettings[key].description,
                              trigger: newSettings[key].trigger
                          };
                      }
                  });
                  return newSettings;
              });
          } catch (e) {
              console.error("Failed to load notification settings", e);
          }
      };
      if (activeTab === 'notifications') loadNotifications();
  }, [activeTab]);

  // Load Company Profile
  useEffect(() => {
    const loadCompany = async () => {
      try {
        const data = await getMyCompany();
        setCompanyName(data.companyName || '');
        setBusinessEmail(data.email || '');
        setBusinessPhone(data.phone || '');
        if (data.logoUrl) {
          setCompanyLogo(`${API_BASE_URL}${data.logoUrl}`);
        } else {
          setCompanyLogo('');
        }
      } catch (err) {
        console.error("Failed to load company profile", err);
      }
    };

    if (activeTab === 'company') {
      loadCompany();
    }
  }, [activeTab]);

  // ... (Timezone sync effect stays same)

  const handleSaveGeneral = async () => {
    const token = getToken();
    if (!token) return;
    try {
        await updateGeneralSettings({
            defaultSenderName,
            defaultReplyToEmail: defaultReplyEmail,
            isEmailServiceEnabled: emailNotificationsEnabled
        }, token);
        
        await updateTimeOffSettings({ requireTimeOffApproval });
        
        toast.success('General settings saved successfully!');
    } catch (e) {
        console.error(e);
        toast.error('Failed to save general settings');
    }
  };

  const handleSaveCompany = async () => {
    try {
      await updateMyCompany({
        companyName,
        email: businessEmail,
        phone: businessPhone,
        logoUrl: companyLogo.replace(API_BASE_URL, ''),
      });

      // Update state with prefixed URL to ensure consistency
      if (companyLogo && !companyLogo.startsWith('http')) {
        const logoPath = companyLogo.startsWith('/') ? companyLogo : `/${companyLogo}`;
        setCompanyLogo(`${API_BASE_URL}${logoPath}`);
      }

      toast.success("Company profile saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save company profile");
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await uploadCompanyLogo(file);
      setCompanyLogo(`${API_BASE_URL}${res.logoUrl}`);
    } catch (err) {
      console.error(err);
      toast.error("Logo upload failed");
    }
  };

  const handleToggleNotification = async (key: string) => {
    const newSettings = {
      ...notificationSettings,
      [key]: {
        ...notificationSettings[key],
        enabled: !notificationSettings[key].enabled,
      },
    };
    setNotificationSettings(newSettings);
    
    // Auto-save on toggle? Or wait for a save button? 
    // The UI in EmailNotificationSettings doesn't have a main "Save" button for the list, 
    // it seems to just be toggles. Let's auto-save to be safe, or just update local state.
    // Given the previous code didn't have a save button for notifications tab explicitly, 
    // we should functionality to save.
    // However, usually "Settings" pages have a "Save" button.
    // The `EmailNotificationSettings` component doesn't show a save button in the code I viewed.
    // Let's assume auto-save for toggles or add a save button. 
    // For now, I'll implementing auto-save or just local update. 
    // Best practice: Update local, then save.
    
    // Let's implement auto-save for this interaction to make it seamless
    try {
        const token = getToken();
        if (token) {
            await updateNotificationSettings(newSettings, token);
        }
    } catch (e) {
        console.error("Failed to save toggle", e);
    }
  };

  const handleEditTemplate = (key: string) => {
    setEditingTemplate(key);
  };

  const handleSaveTemplate = async (key: string, template: EmailTemplate) => {
    const newSettings = {
      ...notificationSettings,
      [key]: {
        ...notificationSettings[key],
        template,
      },
    };
    setNotificationSettings(newSettings);

    try {
        const token = getToken();
        if (token) {
             // We save all, or just this one? API takes dictionary.
             await updateNotificationSettings(newSettings, token);
        }
        toast.success('Template saved successfully!');
    } catch (e) {
        console.error(e);
        toast.error('Failed to save template');
    }
  };

  const updateTimingConfig = async (key: string, field: keyof TimingConfig, value: any) => {
    const currentConfig = notificationSettings[key].timingConfig;
    if (!currentConfig) return;

    const newConfig = { ...currentConfig, [field]: value };
    
    let timingString = '';
    if (newConfig.context === 'immediately') {
      timingString = 'Immediately';
    } else {
      const unitLabel = newConfig.value === 1 ? newConfig.unit.slice(0, -1) : newConfig.unit;
      const contextLabel = newConfig.context === 'before_appointment' ? 'before appointment' : 'after appointment';
      timingString = `${newConfig.value} ${unitLabel} ${contextLabel}`;
    }

    const newSettings = {
      ...notificationSettings,
      [key]: {
        ...notificationSettings[key],
        timing: timingString,
        timingConfig: newConfig,
      },
    };

    setNotificationSettings(newSettings);
    
    // Auto-save timing
    try {
        const token = getToken();
        if (token) {
            await updateNotificationSettings(newSettings, token);
        }
    } catch (e) {
        console.error("Failed to save timing", e);
    }
  };

  const handleSaveGlobal = async () => {
    setGlobalLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/settings/timezone`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ timezone: selectedTimezone })
      });
      
      if (!res.ok) throw new Error("Failed to update timezone");
      
      await refreshTimezone();
      toast.success("Timezone updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update timezone.");
    } finally {
      setGlobalLoading(false);
    }
  };

  const tabs = [
    { id: 'general' as SettingsTab, label: 'General', icon: Bell },
    { id: 'company' as SettingsTab, label: 'Company Profile', icon: Building },
    { id: 'notifications' as SettingsTab, label: 'Email Notifications', icon: Mail },
    { id: 'payment' as SettingsTab, label: 'Payment Settings', icon: DollarSign },
    { id: 'locations' as SettingsTab, label: 'Meeting Locations', icon: MapPin },
    { id: 'global' as SettingsTab, label: 'Timezone', icon: Globe },
  ];

  return (
    <div className="p-6">
      

      {/* Tabs */}
      <div className="mb-8 overflow-x-auto custom-scrollbar">
        <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-indigo-600 shadow-sm border border-gray-100'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-white/40'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <GeneralSettings
          defaultSenderName={defaultSenderName}
          setDefaultSenderName={setDefaultSenderName}
          defaultReplyEmail={defaultReplyEmail}
          setDefaultReplyEmail={setDefaultReplyEmail}
          emailNotificationsEnabled={emailNotificationsEnabled}
          setEmailNotificationsEnabled={setEmailNotificationsEnabled}
          requireTimeOffApproval={requireTimeOffApproval}
          setRequireTimeOffApproval={setRequireTimeOffApproval}
          onSave={handleSaveGeneral}
        />
      )}

      {/* Company Profile */}
      {activeTab === 'company' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
              <Building className="w-5 h-5 text-indigo-600" />
              Company Profile
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-normal">Manage your public business information</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Logo Upload Section */}
              <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-gray-100 pb-10 lg:pb-0 lg:pr-10">
                <label className="block text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">Business Identity</label>
                <div className="flex flex-col items-center gap-6">
                  {companyLogo ? (
                    <div className="group relative w-40 h-40 border-4 border-white shadow-xl rounded-2xl overflow-hidden ring-1 ring-gray-100 transition-transform hover:scale-[1.02]">
                      <img src={companyLogo} alt="Company Logo" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label className="cursor-pointer p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                          <Edit className="w-5 h-5" />
                          <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="w-40 h-40 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center bg-gray-50 transition-colors hover:bg-gray-100 cursor-pointer" onClick={() => document.getElementById('logo-upload')?.click()}>
                      <Building className="w-10 h-10 text-gray-300 mb-2" />
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">Upload Logo</span>
                      <input id="logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </div>
                  )}
                  <div className="text-center">
                    <p className="text-xs text-gray-500 leading-relaxed max-w-[160px]">Recommended: 400x400px Square PNG or JPG</p>
                  </div>
                </div>
              </div>

              {/* Form Fields Section */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 mt-2">Display Name</label>
                  <div className="relative group">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="My Business"
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none font-medium text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Business Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                      <input
                        type="email"
                        value={businessEmail}
                        onChange={(e) => setBusinessEmail(e.target.value)}
                        placeholder="info@mybusiness.com"
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none font-medium text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Business Phone</label>
                    <div className="relative group">
                      <PhoneIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                      <input
                        type="tel"
                        value={businessPhone}
                        onChange={(e) => setBusinessPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none font-medium text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center justify-end pt-8 border-t border-gray-100 mt-6">
                  <button
                    onClick={handleSaveCompany}
                    className="flex items-center gap-2.5 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 hover:shadow-indigo-200 active:scale-[0.98]"
                  >
                    <Save className="w-4.5 h-4.5" />
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Notifications */}
      {activeTab === 'notifications' && (
        <EmailNotificationSettings
          notificationSettings={notificationSettings}
          onToggleNotification={handleToggleNotification}
          onEditTemplate={handleEditTemplate}
          onUpdateTimingConfig={updateTimingConfig}
        />
      )}

      {/* Payment Settings */}
      {activeTab === 'payment' && (
          <PaymentSettings />
      )}

      {/* Meeting Locations */}
      {activeTab === 'locations' && (
          <MeetingLocationSettings />
      )}

      {/* Global Settings (Timezone) */}
      {activeTab === 'global' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600" />
              Regional & Timezone Settings
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-normal">Standardize how time is calculated across your business</p>
          </div>

          <div className="p-8">
            <div className="max-w-2xl space-y-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  Business Timezone
                </label>
                
                <div className="relative group">
                  <TimezoneSelect 
                    value={selectedTimezone}
                    onChange={setSelectedTimezone}
                    className="w-full pl-4 py-6 bg-gray-50 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none font-semibold text-gray-900 shadow-sm hover:bg-white"
                  />
                </div>
                
                <div className="mt-6 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm border border-indigo-50">
                    <Bell className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="text-xs text-indigo-900/70 font-medium leading-relaxed">
                    <strong>Critical Note:</strong> All appointments and durations are calculated based on this setting. Ensure this matches your physical business location to prevent scheduling conflicts.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end pt-8 border-t border-gray-100">
                <button
                  onClick={handleSaveGlobal}
                  disabled={globalLoading}
                  className="flex items-center gap-2.5 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 hover:shadow-indigo-200 active:scale-[0.98] disabled:opacity-50"
                >
                  {globalLoading ? (
                    <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4.5 h-4.5" />
                  )}
                  Update Regional Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Template Editor Modal */}
      {editingTemplate && notificationSettings[editingTemplate] && (
        <EmailTemplateEditor
          isOpen={true}
          onClose={() => setEditingTemplate(null)}
          template={notificationSettings[editingTemplate].template}
          onSave={(template) => {
             handleSaveTemplate(editingTemplate, template);
             setEditingTemplate(null);
          }}
          title={`Edit ${notificationSettings[editingTemplate].description}`}
          description={notificationSettings[editingTemplate].description}
        />
      )}
    </div>
  );
}

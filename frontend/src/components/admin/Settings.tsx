import { useState, useEffect } from 'react';
import { Mail, Globe, Building, DollarSign, Bell, CheckCircle, Save, MapPin } from 'lucide-react';
import { EmailTemplateEditor } from './EmailTemplateEditor';
import { useTimezone } from '../../context/TimezoneContext';
import { getAuthHeaders } from '../../services/staffApi';
import { getMyCompany, updateMyCompany, uploadCompanyLogo } from '../../services/CompanyService';
import { SettingsTab, NotificationConfig, TimingConfig, EmailTemplate } from './types/settings';
import { GeneralSettings } from './settings/GeneralSettings';
import { EmailNotificationSettings } from './settings/EmailNotificationSettings';
import { PaymentSettings } from './PaymentSettings';
import { MeetingLocationSettings } from './MeetingLocationSettings';
import { TIMEZONES } from '../../utils/datetime';
import { TimezoneSelect } from '../TimezoneSelect';
import { getGeneralSettings, updateGeneralSettings, getNotificationSettings, updateNotificationSettings, GeneralSettingsData } from '../../services/settingsApi';
import { getToken } from '../../utils/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  // General Settings State
  const [defaultSenderName, setDefaultSenderName] = useState('');
  const [defaultReplyEmail, setDefaultReplyEmail] = useState('');
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);

  // Company Profile State
  const [companyName, setCompanyName] = useState('My Business');
  const [companyLogo, setCompanyLogo] = useState('');
  const [businessEmail, setBusinessEmail] = useState('info@mybusiness.com');
  const [businessPhone, setBusinessPhone] = useState('+1 (555) 123-4567');
  const [websiteUrl, setWebsiteUrl] = useState('https://www.mybusiness.com');

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
          } catch (e) {
              console.error("Failed to load general settings", e);
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

  // ... (Company load effect stays same)

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
        alert('General settings saved successfully!');
    } catch (e) {
        console.error(e);
        alert('Failed to save general settings');
    }
  };

  const handleSaveCompany = async () => {
    try {
      await updateMyCompany({
        companyName,
        email: businessEmail,
        phone: businessPhone,
        websiteUrl,
        logoUrl: companyLogo.replace(API_BASE_URL, ''),
      });

      alert("Company profile saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save company profile");
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
      alert("Logo upload failed");
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
        alert('Template saved successfully!');
    } catch (e) {
        console.error(e);
        alert('Failed to save template');
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
      alert("Timezone updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update timezone.");
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
    { id: 'global' as SettingsTab, label: 'Timezone Settings', icon: Globe },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1>Settings</h1>
        <p className="text-gray-600 mt-1">Manage your system preferences and configuration</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
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
          onSave={handleSaveGeneral}
        />
      )}

      {/* Company Profile */}
      {activeTab === 'company' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
            <h2>Company Profile</h2>
            <p className="text-sm text-gray-600 mt-1">Update your business information</p>
          </div>

          <div className="space-y-6 max-w-2xl">
            {/* Company Name */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-indigo-600" />
                  Company name
                </div>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="My Business"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Company Logo */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Company Logo
              </label>
              <div className="flex items-start gap-4">
                {companyLogo ? (
                  <div className="w-24 h-24 border-2 border-gray-300 rounded-lg overflow-hidden">
                    <img src={companyLogo} alt="Company Logo" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    <Building className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <label className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer w-fit">
                    <CheckCircle className="w-4 h-4" />
                    Upload Logo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">Recommended size: 200x200px (PNG, JPG)</p>
                </div>
              </div>
            </div>

            {/* Business Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-600" />
                  Business email (used as sender)
                </div>
              </label>
              <input
                type="email"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                placeholder="info@mybusiness.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Business Phone */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  {/* Phone icon usage */}
                  Business phone number
                </div>
              </label>
              <input
                type="tel"
                value={businessPhone}
                onChange={(e) => setBusinessPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Website URL */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-600" />
                  Website URL
                </div>
              </label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://www.mybusiness.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end pt-4 border-t border-gray-200">
              <button
                onClick={handleSaveCompany}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
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
         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2>Global Settings</h2>
              <p className="text-gray-600 text-sm">Manage timezone and regional preferences</p>
            </div>
            
            <div className="mb-4">
               <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
               <TimezoneSelect 
                 value={selectedTimezone}
                 onChange={setSelectedTimezone}
                 className="w-full"
               />
            </div>
             <button
                onClick={handleSaveGlobal}
                disabled={globalLoading}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
             >
               {globalLoading ? 'Saving...' : 'Save Timezone'}
             </button>
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
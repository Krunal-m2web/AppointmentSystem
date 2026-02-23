import { useState, useEffect } from 'react';
import { Mail, Globe, Building, DollarSign, Bell, CheckCircle, Save, MapPin, Phone as PhoneIcon, Edit, Clock, Search, ChevronDown, Settings as SettingsIcon, Palette, Calendar } from 'lucide-react';
import GoogleCalendarSettings from './settings/GoogleCalendarSettings';
import { EmailTemplateEditor } from './EmailTemplateEditor';
import { SmsTemplateEditor } from './SmsTemplateEditor';
import { useTimezone } from '../../context/TimezoneContext';
import { getAuthHeaders, getTimeOffSettings, updateTimeOffSettings } from '../../services/staffApi';
import { getMyCompany, updateMyCompany, uploadCompanyLogo } from '../../services/CompanyService';
import { SettingsTab, NotificationConfig, TimingConfig, EmailTemplate, TimeUnit, TimingContext, SmsNotificationConfig, SmsTemplate } from './types/settings';
import { GeneralSettings } from './settings/GeneralSettings';
import { EmailNotificationSettings } from './settings/EmailNotificationSettings';
import { SmsNotificationSettings } from './settings/SmsNotificationSettings';
import { BookingFormSettings } from './settings/BookingFormSettings';
import { PaymentSettings } from './PaymentSettings';
import MeetingLocationSettings from './MeetingLocationSettings';
import { TIMEZONES } from '../../utils/datetime';
import { TimezoneSelect } from '../TimezoneSelect';
import { getGeneralSettings, updateGeneralSettings, getNotificationSettings, updateNotificationSettings, GeneralSettingsData, sendTestEmail } from '../../services/settingsApi';
import { getToken } from '../../utils/auth';
import { toast } from 'sonner';
import PhoneInput from '../ui/PhoneInput';
import { DEFAULT_NOTIFICATION_TEMPLATES } from './settings/defaultTemplates';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [notificationsActiveTab, setNotificationsActiveTab] = useState<'email' | 'sms'>('email');

  // General Settings State
  const [defaultSenderName, setDefaultSenderName] = useState('');
  const [defaultSenderEmail, setDefaultSenderEmail] = useState('');
  const [defaultReplyEmail, setDefaultReplyEmail] = useState('');
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [smsNotificationsEnabled, setSmsNotificationsEnabled] = useState(true);
  const [requireTimeOffApproval, setRequireTimeOffApproval] = useState(true);

  // Policy Settings
  const [allowCustomerRescheduling, setAllowCustomerRescheduling] = useState(true);
  const [reschedulingMinLeadTime, setReschedulingMinLeadTime] = useState(24);
  const [allowCustomerCanceling, setAllowCustomerCanceling] = useState(true);
  const [cancelingMinLeadTime, setCancelingMinLeadTime] = useState(24);

  // Company Profile State
  const [companyName, setCompanyName] = useState('My Business');
  const [companyLogo, setCompanyLogo] = useState('');
  const [businessEmail, setBusinessEmail] = useState('info@mybusiness.com');
  const [businessPhone, setBusinessPhone] = useState('+1 (555) 123-4567');

  // Template Editor State
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);
  const [editingSmsTemplate, setEditingSmsTemplate] = useState<string | null>(null);
  const [hasLoadedNotifications, setHasLoadedNotifications] = useState(false);

  // Global Settings State (Timezone)
  const { timezone, refreshTimezone } = useTimezone();
  const [globalLoading, setGlobalLoading] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState(timezone);

  const [notificationSettings, setNotificationSettings] = useState<{
    [key: string]: NotificationConfig; 
  }>({
    appointmentConfirmation: {
      enabled: true,
      pushEnabled: false,
      timing: 'Immediately after booking',
      timingConfig: {
        value: 1,
        unit: 'hours',
        context: 'immediately',
      },
      trigger: 'When customer books an appointment',
      description: 'Send a confirmation email to the customer with all appointment details.',
      template: DEFAULT_NOTIFICATION_TEMPLATES.appointmentConfirmation.template as EmailTemplate,
    },
    appointmentReminder: {
      enabled: true,
      pushEnabled: false,
      timing: '24 hours before appointment',
      timingConfig: {
        value: 24,
        unit: 'hours',
        context: 'before_appointment',
      },
      trigger: 'Before scheduled appointment time',
      description: 'Remind customers about their upcoming appointment to reduce no-shows.',
      timingEditable: true,
      template: DEFAULT_NOTIFICATION_TEMPLATES.appointmentReminder.template as EmailTemplate,
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
      template: DEFAULT_NOTIFICATION_TEMPLATES.appointmentFollowUp.template as EmailTemplate,
    },
    appointmentCancellation: {
      enabled: true,
      timing: 'Immediately after cancellation',
      timingConfig: {
        value: 1,
        unit: 'hours',
        context: 'immediately',
      },
      trigger: 'When an appointment is cancelled',
      description: 'Notify customers when their appointment has been cancelled.',
      template: DEFAULT_NOTIFICATION_TEMPLATES.appointmentCancellation.template as EmailTemplate,
    },
  });

  // SMS Notification Settings State
  const [smsSettings, setSmsSettings] = useState<{
    [key: string]: SmsNotificationConfig;
  }>({
    smsConfirmation: {
      enabled: false,
      timing: 'Immediately after booking',
      trigger: 'When customer books an appointment',
      description: 'Send a confirmation SMS with appointment details.',
      template: {
        body: `Hi {{customer.firstName}}, your appointment at {{company.name}} is confirmed for {{appointment.date}} at {{appointment.time}}. Reply HELP for assistance.`,
      },
    },
    smsReminder: {
      enabled: false,
      timing: '1 hour before appointment',
      timingConfig: {
        value: 1,
        unit: 'hours',
        context: 'before_appointment',
      },
      trigger: 'Before scheduled appointment',
      description: 'Remind customers about their upcoming appointment.',
      template: {
        body: `Reminder: Your appointment at {{company.name}} is in 1 hour. See you soon!`,
      },
    },
    smsFollowUp: {
      enabled: false,
      timing: '1 hour after appointment',
      timingConfig: {
        value: 1,
        unit: 'hours',
        context: 'after_appointment',
      },
      trigger: 'After appointment ends',
      description: 'Follow up with customers after their appointment.',
      template: {
        body: `Thank you for visiting {{company.name}}! We hope you had a great experience. Book again at {{company.website}}`,
      },
    },
    smsCancellation: {
      enabled: false,
      timing: 'Immediately after cancellation',
      trigger: 'When an appointment is cancelled',
      description: 'Notify customers when their appointment is cancelled.',
      template: {
        body: `Hi {{customer.firstName}}, your appointment at {{company.name}} for {{appointment.date}} has been cancelled. Visit {{company.website}} to rebook.`,
      },
    },
  });

  const getNotificationTitle = (key: string): string => {
    const titles: { [key: string]: string } = {
      appointmentConfirmation: 'Appointment Confirmation',
      appointmentReminder: 'Appointment Reminder',
      appointmentFollowUp: 'Appointment Follow-Up',
      appointmentCancellation: 'Appointment Cancellation',
      smsConfirmation: 'Booking Confirmation',
      smsReminder: 'Appointment Reminder',
      smsFollowUp: 'Follow-Up Message',
      smsCancellation: 'Cancellation Notice',
    };
    if (key.includes(':')) {
      const base = key.split(':')[0];
      return titles[base] || base;
    }
    return titles[key] || key;
  };

  const getNotificationDescription = (key: string): string => {
    if (key.startsWith('appointmentReminder')) return 'Send a reminder email to your customer before their appointment starts.';
    if (key.startsWith('appointmentFollowUp')) return 'Send a follow-up email to your customer after their appointment is completed.';
    if (key.startsWith('smsReminder')) return 'Send a reminder SMS before the appointment.';
    if (key.startsWith('smsFollowUp')) return 'Send a follow-up SMS after the appointment.';
    
    const descriptions: { [key: string]: string } = {
      appointmentConfirmation: 'Sent immediately when an appointment is booked and confirmed.',
      appointmentCancellation: 'Sent immediately when an appointment is cancelled.',
      smsConfirmation: 'Sent immediately when an appointment is booked.',
      smsCancellation: 'Sent immediately when an appointment is cancelled.',
    };
    return descriptions[key] || '';
  };

  // Load General Settings
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'google-calendar') {
      setActiveTab('google-calendar');
    }
  }, []);

  useEffect(() => {
      const loadGeneral = async () => {
          const token = getToken();
          if (!token) return;
          try {
              const data = await getGeneralSettings(token);
              setDefaultSenderName(data.defaultSenderName || '');
              setDefaultSenderEmail(data.defaultSenderEmail || '');
              setDefaultReplyEmail(data.defaultReplyToEmail || '');
              setEmailNotificationsEnabled(data.isEmailServiceEnabled);
              setSmsNotificationsEnabled(data.isSmsServiceEnabled);
              setAllowCustomerRescheduling(data.allowCustomerRescheduling ?? true);
              setReschedulingMinLeadTime(data.reschedulingMinLeadTime ?? 24);
              setAllowCustomerCanceling(data.allowCustomerCanceling ?? true);
              setCancelingMinLeadTime(data.cancelingMinLeadTime ?? 24);

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
      // Only load if not already loaded to prevent overwriting local changes (e.g. from master toggles)
      if (hasLoadedNotifications) return;

      const token = getToken();
      if (!token) return;
      try {
        const serverSettings = await getNotificationSettings(token);
        
        // Merge server settings with local defaults
        // Merge server settings with local defaults
        setNotificationSettings(prev => {
          const newSettings = { ...prev };
          Object.keys(serverSettings).forEach(key => {
            // Only process email/appointment settings here
            if (!key.startsWith('appointment')) return;

            // Merge into existing or create new entry
            newSettings[key] = {
               ...(newSettings[key] || {}), // Keep local props if they exist
               ...serverSettings[key],
               // Ensure description/trigger are set even if server sends empty
               description: serverSettings[key].description || newSettings[key]?.description || '', 
               trigger: serverSettings[key].trigger || newSettings[key]?.trigger || '',
               pushEnabled: serverSettings[key].pushEnabled || newSettings[key]?.pushEnabled || false
            };
          });
          return newSettings;
        });

        // Also update SMS settings if they come from the same endpoint
        setSmsSettings(prev => {
          const newSmsSettings = { ...prev };
          Object.keys(serverSettings).forEach(key => {
            // Only process SMS settings here
            if (!key.startsWith('sms')) return;

            // Merge into existing or create new entry
            newSmsSettings[key] = {
              ...(newSmsSettings[key] || {}), // Keep local props
              ...serverSettings[key],
              description: serverSettings[key].description || newSmsSettings[key]?.description || '', 
              trigger: serverSettings[key].trigger || newSmsSettings[key]?.trigger || ''
            };
          });
          return newSmsSettings;
        });

        setHasLoadedNotifications(true);
      } catch (e) {
        console.error("Failed to load notification settings", e);
      }
    };
    if (activeTab === 'notifications' || activeTab === 'general') loadNotifications();
  }, [activeTab, hasLoadedNotifications]);

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
            defaultSenderEmail,
            defaultReplyToEmail: defaultReplyEmail,
            isEmailServiceEnabled: emailNotificationsEnabled,
            isSmsServiceEnabled: smsNotificationsEnabled,
            allowCustomerRescheduling,
            reschedulingMinLeadTime,
            allowCustomerCanceling,
            cancelingMinLeadTime
        }, token);
        
        // Also save all individual notification settings to sync the enabled states
        await saveAllNotifications();
        
        await updateTimeOffSettings({ requireTimeOffApproval });
        
        toast.success('General settings saved successfully!');
    } catch (e) {
        console.error(e);
        toast.error('Failed to save general settings');
    }
  };

  const handleMasterEmailToggle = async (enabled: boolean) => {
    setEmailNotificationsEnabled(enabled);
    
    // Sync all individual email notification settings
    setNotificationSettings(prev => {
      const newSettings = { ...prev };
      Object.keys(newSettings).forEach(key => {
        newSettings[key] = {
          ...newSettings[key],
          enabled: enabled
        };
      });
      // Save immediately like individual toggles do
      saveAllNotifications(newSettings);
      return newSettings;
    });
  };

  const handleMasterSmsToggle = async (enabled: boolean) => {
    setSmsNotificationsEnabled(enabled);
    
    // Sync all individual SMS notification settings
    setSmsSettings(prev => {
      const newSettings = { ...prev };
      Object.keys(newSettings).forEach(key => {
        newSettings[key] = {
          ...newSettings[key],
          enabled: enabled
        };
      });
      // Save immediately like individual toggles do
      saveAllNotifications(undefined, newSettings);
      return newSettings;
    });
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

  const saveAllNotifications = async (updatedEmailSettings?: any, updatedSmsSettings?: any) => {
    const token = getToken();
    if (!token) return;

    const emailSettings = updatedEmailSettings || notificationSettings;
    const smsSettingsToSave = updatedSmsSettings || smsSettings;

    // Combine all settings for the backend
    const combinedSettings: any = { ...emailSettings };
    
    // Convert SMS settings to the format backend expects (with empty subject)
    Object.keys(smsSettingsToSave).forEach(key => {
      const config = smsSettingsToSave[key];
      combinedSettings[key] = {
        ...config,
        template: {
          subject: '', // SMS has no subject
          body: config.template.body
        }
      };
    });

    try {
      await updateNotificationSettings(combinedSettings, token);
    } catch (e) {
      console.error("Failed to save combined notification settings", e);
      throw e;
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
    
    try {
      await saveAllNotifications(newSettings);
    } catch (e) {
      toast.error("Failed to save toggle");
    }
  };

  const handleTogglePush = async (key: string) => {
    const newSettings = {
      ...notificationSettings,
      [key]: {
        ...notificationSettings[key],
        pushEnabled: !notificationSettings[key].pushEnabled,
      },
    };
    setNotificationSettings(newSettings);
    
    try {
      await saveAllNotifications(newSettings);
      toast.success(`Push notification ${!notificationSettings[key].pushEnabled ? 'enabled' : 'disabled'}`);
    } catch (e) {
      toast.error("Failed to save push toggle");
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
      await saveAllNotifications(newSettings);
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
    
    try {
      await saveAllNotifications(newSettings);
    } catch (e) {
      console.error("Failed to save timing", e);
    }
  };

  const handleSendTestEmail = async (key: string, email: string) => {
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    const token = getToken();
    if (!token) return;

    try {
      await sendTestEmail(email, key, token);
      toast.success(`Test email sent successfully to ${email}`);
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Failed to send test email');
    }
  };

  const handleAddSequence = async (baseType: string) => {
    const existingKeys = Object.keys(notificationSettings).filter(k => k.startsWith(baseType));
    let nextIndex = 0;
    
    existingKeys.forEach(k => {
      if (k.includes(':')) {
        const idx = parseInt(k.split(':')[1]);
        if (!isNaN(idx) && idx >= nextIndex) nextIndex = idx + 1;
      } else {
        // Current base key counts as index 0 if it exists
        if (nextIndex === 0) nextIndex = 1;
      }
    });

    const newKey = `${baseType}:${nextIndex}`;
    const defaultTemplate = notificationSettings[baseType]?.template || { subject: 'New Notification', body: '' };
    const defaultTiming: TimingConfig = { 
      value: 1, 
      unit: 'hours' as TimeUnit, 
      context: (baseType === 'appointmentReminder' ? 'before_appointment' : 'after_appointment') as TimingContext 
    };

    const newConfig: NotificationConfig = {
      enabled: true,
      timing: baseType === 'appointmentReminder' ? '1 hour before appointment' : '1 hour after appointment',
      timingConfig: defaultTiming,
      trigger: baseType === 'appointmentReminder' ? 'Before scheduled appointment' : 'After appointment ends',
      description: baseType === 'appointmentReminder' ? 'Additional reminder sequence' : 'Additional follow-up sequence',
      template: { ...defaultTemplate }
    };

    const newSettings = {
      ...notificationSettings,
      [newKey]: newConfig
    };

    setNotificationSettings(newSettings);
    
    try {
        await saveAllNotifications(newSettings);
        toast.success(`New ${baseType === 'appointmentReminder' ? 'reminder' : 'follow-up'} added`);
    } catch (e) {
        console.error(e);
        toast.error('Failed to add notification sequence');
    }
  };

  const handleRemoveSequence = async (key: string) => {
    const newSettings = { ...notificationSettings };
    delete newSettings[key];
    setNotificationSettings(newSettings);

    try {
        await saveAllNotifications(newSettings);
        toast.success('Notification removed');
    } catch (e) {
        console.error(e);
        toast.error('Failed to remove notification');
    }
  };

  // SMS Notification Handlers
  const handleToggleSmsNotification = async (key: string) => {
    const newSettings = {
      ...smsSettings,
      [key]: {
        ...smsSettings[key],
        enabled: !smsSettings[key].enabled,
      },
    };
    setSmsSettings(newSettings);
    
    try {
      await saveAllNotifications(undefined, newSettings);
      toast.success(`SMS notification ${newSettings[key].enabled ? 'enabled' : 'disabled'}`);
    } catch (e) {
      toast.error('Failed to save SMS toggle');
    }
  };

  const handleEditSmsTemplate = (key: string) => {
    setEditingSmsTemplate(key);
  };

  const handleSaveSmsTemplate = async (template: SmsTemplate) => {
    if (!editingSmsTemplate) return;
    
    const newSettings = {
      ...smsSettings,
      [editingSmsTemplate]: {
        ...smsSettings[editingSmsTemplate],
        template: template
      }
    };
    
    setSmsSettings(newSettings);
    
    try {
      await saveAllNotifications(undefined, newSettings);
      toast.success('SMS template saved successfully');
    } catch (e) {
      toast.error('Failed to save SMS template');
    }
  };

  const updateSmsTimingConfig = async (key: string, field: keyof TimingConfig, value: any) => {
    const currentConfig = smsSettings[key]?.timingConfig;
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
      ...smsSettings,
      [key]: {
        ...smsSettings[key],
        timing: timingString,
        timingConfig: newConfig,
      },
    };

    setSmsSettings(newSettings);

    try {
      await saveAllNotifications(undefined, newSettings);
      toast.success('SMS timing updated successfully');
    } catch (e) {
      toast.error('Failed to save SMS timing');
    }
  };

  const handleSendTestSms = (key: string, phone: string) => {
    if (!phone || phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    // Placeholder for actual SMS sending
    toast.info(`Test SMS to ${phone} - SMS gateway not yet configured`);
  };

  const handleAddSmsSequence = async (baseType: string) => {
    const existingKeys = Object.keys(smsSettings).filter(k => k.startsWith(baseType));
    let nextIndex = 0;
    
    existingKeys.forEach(k => {
      if (k.includes(':')) {
        const idx = parseInt(k.split(':')[1]);
        if (!isNaN(idx) && idx >= nextIndex) nextIndex = idx + 1;
      } else {
        if (nextIndex === 0) nextIndex = 1;
      }
    });

    const newKey = `${baseType}:${nextIndex}`;
    const defaultTemplate = smsSettings[baseType]?.template || { body: 'New SMS notification' };
    const defaultTiming: TimingConfig = { 
      value: 1, 
      unit: 'hours' as TimeUnit, 
      context: (baseType === 'smsReminder' ? 'before_appointment' : 'after_appointment') as TimingContext 
    };

    const newConfig: SmsNotificationConfig = {
      enabled: true,
      timing: baseType === 'smsReminder' ? '1 hour before appointment' : '1 hour after appointment',
      timingConfig: defaultTiming,
      trigger: baseType === 'smsReminder' ? 'Before scheduled appointment' : 'After appointment ends',
      description: baseType === 'smsReminder' ? 'Additional SMS reminder' : 'Additional SMS follow-up',
      template: { ...defaultTemplate }
    };

    const newSmsSettings = {
      ...smsSettings,
      [newKey]: newConfig
    };

    setSmsSettings(newSmsSettings);
    
    try {
      await saveAllNotifications(undefined, newSmsSettings);
      toast.success(`New SMS ${baseType === 'smsReminder' ? 'reminder' : 'follow-up'} added`);
    } catch (e) {
      toast.error('Failed to save new SMS sequence');
    }
  };

  const handleRemoveSmsSequence = async (key: string) => {
    const newSettings = { ...smsSettings };
    delete newSettings[key];
    setSmsSettings(newSettings);
    
    try {
      await saveAllNotifications(undefined, newSettings);
      toast.success('SMS notification removed');
    } catch (e) {
      toast.error('Failed to remove SMS notification');
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
    { id: 'general' as SettingsTab, label: 'General', icon: SettingsIcon },
    { id: 'company' as SettingsTab, label: 'Company Profile', icon: Building },
    { id: 'notifications' as SettingsTab, label: 'Notifications', icon: Bell },
    { id: 'payment' as SettingsTab, label: 'Payment Settings', icon: DollarSign },
    { id: 'locations' as SettingsTab, label: 'Meeting Locations', icon: MapPin },
    { id: 'bookingForm' as SettingsTab, label: 'Booking Form', icon: Palette },
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
          defaultSenderEmail={defaultSenderEmail}
          setDefaultSenderEmail={setDefaultSenderEmail}
          defaultReplyEmail={defaultReplyEmail}
          setDefaultReplyEmail={setDefaultReplyEmail}
          emailNotificationsEnabled={emailNotificationsEnabled}
          setEmailNotificationsEnabled={handleMasterEmailToggle}
          smsNotificationsEnabled={smsNotificationsEnabled}
          setSmsNotificationsEnabled={handleMasterSmsToggle}
          requireTimeOffApproval={requireTimeOffApproval}
          setRequireTimeOffApproval={setRequireTimeOffApproval}
          allowCustomerRescheduling={allowCustomerRescheduling}
          setAllowCustomerRescheduling={setAllowCustomerRescheduling}
          reschedulingMinLeadTime={reschedulingMinLeadTime}
          setReschedulingMinLeadTime={setReschedulingMinLeadTime}
          allowCustomerCanceling={allowCustomerCanceling}
          setAllowCustomerCanceling={setAllowCustomerCanceling}
          cancelingMinLeadTime={cancelingMinLeadTime}
          setCancelingMinLeadTime={setCancelingMinLeadTime}
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
                      <PhoneInput
                        value={businessPhone}
                        onChange={setBusinessPhone}
                        className="w-full bg-white border border-gray-200 rounded-xl focus-within:ring-4 focus-within:ring-indigo-600/10 focus-within:border-indigo-600 transition-all"
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

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          {/* Sub-tabs for Notifications */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setNotificationsActiveTab('email')}
              className={`px-6 py-3 text-sm font-bold transition-all relative ${
                notificationsActiveTab === 'email'
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Email Notifications
              {notificationsActiveTab === 'email' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setNotificationsActiveTab('sms')}
              className={`px-6 py-3 text-sm font-bold transition-all relative ${
                notificationsActiveTab === 'sms'
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              SMS Notifications
              {notificationsActiveTab === 'sms' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>
          </div>

          {notificationsActiveTab === 'email' && (
            <EmailNotificationSettings
              notificationSettings={notificationSettings}
              onToggleNotification={handleToggleNotification}
              onEditTemplate={handleEditTemplate}
              onUpdateTimingConfig={updateTimingConfig}
              onSendTestEmail={handleSendTestEmail}
              onTogglePush={handleTogglePush}
              onAddSequence={handleAddSequence}
              onRemoveSequence={handleRemoveSequence}
            />
          )}

          {notificationsActiveTab === 'sms' && (
            <SmsNotificationSettings
              smsSettings={smsSettings}
              onToggleNotification={handleToggleSmsNotification}
              onEditTemplate={handleEditSmsTemplate}
              onUpdateTimingConfig={updateSmsTimingConfig}
              onSendTestSms={handleSendTestSms}
              onAddSequence={handleAddSmsSequence}
              onRemoveSequence={handleRemoveSmsSequence}
            />
          )}
        </div>
      )}

      {/* Payment Settings */}
      {activeTab === 'payment' && (
          <PaymentSettings />
      )}

      {/* Meeting Locations */}
      {activeTab === 'locations' && (
          <MeetingLocationSettings />
      )}

      {/* Booking Form Settings */}
      {activeTab === 'bookingForm' && (
          <BookingFormSettings />
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

      {/* Google Calendar Settings */}
      {activeTab === 'google-calendar' && (
        <GoogleCalendarSettings />
      )}

      {/* Edit Template Modal */}
      {editingTemplate && notificationSettings[editingTemplate] && (
        <EmailTemplateEditor
          isOpen={true}
          onClose={() => setEditingTemplate(null)}
          onSave={(template) => handleSaveTemplate(editingTemplate, template)}
          template={notificationSettings[editingTemplate].template}
          defaultTemplate={DEFAULT_NOTIFICATION_TEMPLATES[editingTemplate]?.template as EmailTemplate}
          title={getNotificationTitle(editingTemplate)}
          description={getNotificationDescription(editingTemplate)}
        />
      )}

      <SmsTemplateEditor
        isOpen={!!editingSmsTemplate}
        onClose={() => setEditingSmsTemplate(null)}
        onSave={handleSaveSmsTemplate}
        template={editingSmsTemplate ? smsSettings[editingSmsTemplate]?.template : { body: '' }}
        title={editingSmsTemplate ? getNotificationTitle(editingSmsTemplate) : ''}
        description={editingSmsTemplate ? (smsSettings[editingSmsTemplate]?.description || '') : ''}
      />
    </div>
  );
}

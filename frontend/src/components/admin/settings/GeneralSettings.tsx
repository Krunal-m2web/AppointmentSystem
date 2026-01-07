import React from 'react';
import { User, Mail, Bell, Save } from 'lucide-react';

interface GeneralSettingsProps {
  defaultSenderName: string;
  setDefaultSenderName: (value: string) => void;
  defaultReplyEmail: string;
  setDefaultReplyEmail: (value: string) => void;
  emailNotificationsEnabled: boolean;
  setEmailNotificationsEnabled: (enabled: boolean) => void;
  onSave: () => void;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  defaultSenderName,
  setDefaultSenderName,
  defaultReplyEmail,
  setDefaultReplyEmail,
  emailNotificationsEnabled,
  setEmailNotificationsEnabled,
  onSave,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2>Notification Preferences (Global)</h2>
        <p className="text-sm text-gray-600 mt-1">Configure default email notification settings</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Default Sender Name */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600" />
              Default sender name
            </div>
          </label>
          <input
            type="text"
            value={defaultSenderName}
            onChange={(e) => setDefaultSenderName(e.target.value)}
            placeholder="Appointment System"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">This name will appear in the "From" field of emails</p>
        </div>

        {/* Default Reply-to Email */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-600" />
              Default reply-to email
            </div>
          </label>
          <input
            type="email"
            value={defaultReplyEmail}
            onChange={(e) => setDefaultReplyEmail(e.target.value)}
            placeholder="no-reply@example.com"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Email address where customer replies will be sent</p>
        </div>

        {/* Enable Email Notifications */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-gray-900">
              <Bell className="w-4 h-4 text-indigo-600" />
              <span>Enable email notifications globally</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Master switch for all email notifications</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotificationsEnabled}
              onChange={(e) => setEmailNotificationsEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end pt-4 border-t border-gray-200">
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

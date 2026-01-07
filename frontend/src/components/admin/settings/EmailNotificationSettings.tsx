import React from 'react';
import { Clock, Mail, Edit } from 'lucide-react';
import { NotificationConfig, EmailTemplate, TimingConfig } from '../types/settings';

interface EmailNotificationSettingsProps {
  notificationSettings: {
    [key: string]: NotificationConfig;
  };
  onToggleNotification: (key: string) => void;
  onEditTemplate: (key: string) => void;
  onUpdateTimingConfig: (key: string, field: keyof TimingConfig, value: any) => void;
}

export const EmailNotificationSettings: React.FC<EmailNotificationSettingsProps> = ({
  notificationSettings,
  onToggleNotification,
  onEditTemplate,
  onUpdateTimingConfig,
}) => {
  const getNotificationTitle = (key: string): string => {
    const titles: { [key: string]: string } = {
      appointmentConfirmation: 'Appointment Confirmation',
      appointmentReminder: 'Appointment Reminder',
      appointmentFollowUp: 'Appointment Follow-Up',
      appointmentCancellation: 'Appointment Cancellation',
    };
    return titles[key] || key;
  };

  const renderTimingControls = (key: string) => {
    const config = notificationSettings[key].timingConfig;
    if (!notificationSettings[key].enabled || !config) return null;

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          When should this email be sent?
        </label>
        
        <div className="flex flex-wrap items-center gap-3">
          {config.context !== 'immediately' && (
            <>
              <input
                type="number"
                min="1"
                max="365"
                value={config.value}
                onChange={(e) => onUpdateTimingConfig(key, 'value', parseInt(e.target.value) || 1)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              
              <select
                value={config.unit}
                onChange={(e) => onUpdateTimingConfig(key, 'unit', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
            </>
          )}

          <select
            value={config.context}
            onChange={(e) => onUpdateTimingConfig(key, 'context', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="before_appointment">Before Appointment</option>
            <option value="after_appointment">After Appointment</option>
            <option value="immediately">Immediately</option>
          </select>
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm text-indigo-700 bg-indigo-50 px-3 py-2 rounded-md border border-indigo-100">
          <Clock className="w-4 h-4" />
          <span className="font-medium">
            This email will be sent {notificationSettings[key].timing.toLowerCase()}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2>Email Notifications</h2>
        <p className="text-sm text-gray-600 mt-1">
          Configure automated email notifications sent to customers at different stages of their booking journey.
        </p>
      </div>

      <div className="space-y-3">
        {Object.keys(notificationSettings).map((key) => (
          <div
            key={key}
            className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
              notificationSettings[key].enabled
                ? 'border-green-200 bg-green-50/30'
                : 'border-gray-200'
            }`}
          >
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <label className="relative inline-flex items-center cursor-pointer mt-1">
                    <input
                      type="checkbox"
                      checked={notificationSettings[key].enabled}
                      onChange={() => onToggleNotification(key)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-gray-900">{getNotificationTitle(key)}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          notificationSettings[key].enabled
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {notificationSettings[key].enabled ? 'ON' : 'OFF'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {notificationSettings[key].description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 text-indigo-600" />
                        <span className="text-gray-700">{notificationSettings[key].timing}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4 text-indigo-600" />
                        <span className="text-gray-700">{notificationSettings[key].trigger}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onEditTemplate(key)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit Template
                </button>
              </div>

              {renderTimingControls(key)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-600" />
            Individual Notifications
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-normal">Customize content and delivery timing for specific events</p>
        </div>
      </div>

      <div className="space-y-4">
        {Object.keys(notificationSettings).map((key) => (
          <div
            key={key}
            className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 group overflow-hidden ${
              notificationSettings[key].enabled
                ? 'border-indigo-100'
                : 'border-gray-100 opacity-80'
            }`}
          >
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                <div className="flex items-start gap-5 flex-1 w-full">
                  <div className="flex-shrink-0 mt-1">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings[key].enabled}
                        onChange={() => onToggleNotification(key)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[22px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                    </label>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{getNotificationTitle(key)}</h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          notificationSettings[key].enabled
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {notificationSettings[key].enabled ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4">
                      {notificationSettings[key].description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                      <div className="flex items-center gap-2 group/meta">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-indigo-500 group-hover/meta:bg-indigo-50 transition-colors">
                          <Clock className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{notificationSettings[key].timing}</span>
                      </div>
                      <div className="flex items-center gap-2 group/meta">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-indigo-500 group-hover/meta:bg-indigo-50 transition-colors">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{notificationSettings[key].trigger}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onEditTemplate(key)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-sm font-bold text-gray-700 rounded-xl hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all shadow-sm active:scale-95"
                >
                  <Edit className="w-4 h-4" />
                  Customize Template
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

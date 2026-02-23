import { Clock, MessageSquare, Edit, Send, X, Plus } from 'lucide-react';
import { SmsNotificationConfig, SmsTemplate, TimingConfig } from '../types/settings';
import { useState } from 'react';
import { toast } from 'sonner';

interface SmsNotificationSettingsProps {
  smsSettings: {
    [key: string]: SmsNotificationConfig;
  };
  onToggleNotification: (key: string) => void;
  onEditTemplate: (key: string) => void;
  onUpdateTimingConfig: (key: string, field: keyof TimingConfig, value: any) => void;
  onSendTestSms: (key: string, phone: string) => void;
  onAddSequence: (baseType: string) => void;
  onRemoveSequence: (key: string) => void;
}

export const SmsNotificationSettings: React.FC<SmsNotificationSettingsProps> = ({
  smsSettings,
  onToggleNotification,
  onEditTemplate,
  onUpdateTimingConfig,
  onSendTestSms,
  onAddSequence,
  onRemoveSequence,
}) => {
  const [testSmsData, setTestSmsData] = useState<{ type: string | null, phone: string }>({ 
    type: null, 
    phone: '' 
  });

  const getNotificationTitle = (key: string): string => {
    const titles: { [key: string]: string } = {
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
    if (key.startsWith('smsReminder')) return 'Send a reminder SMS before the appointment.';
    if (key.startsWith('smsFollowUp')) return 'Send a follow-up SMS after the appointment.';
    
    const descriptions: { [key: string]: string } = {
      smsConfirmation: 'Sent immediately when an appointment is booked.',
      smsCancellation: 'Sent immediately when an appointment is cancelled.',
    };
    return descriptions[key] || '';
  };

  const renderTimingControls = (key: string) => {
    const config = smsSettings[key]?.timingConfig;
    if (!smsSettings[key]?.enabled || !config) return null;

    // Timing restrictions based on notification type
    const isConfOrCancel = key === 'smsConfirmation' || key === 'smsCancellation';
    const isReminder = key.toLowerCase().includes('reminder');
    const isFollowup = key.toLowerCase().includes('followup');

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          When should this SMS be sent?
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
                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              
              <select
                value={config.unit}
                onChange={(e) => onUpdateTimingConfig(key, 'unit', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
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
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            {/* Reminders can only be before or immediately */}
            {/* Followups and Conf/Cancel can only be after or immediately */}
            {!isConfOrCancel && !isFollowup && (
              <option value="before_appointment">Before Appointment</option>
            )}
            {!isReminder && (
              <option value="after_appointment">After Appointment</option>
            )}
            <option value="immediately">Immediately</option>
          </select>
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-md border border-green-100">
          <Clock className="w-4 h-4" />
          <span className="font-medium">
            This SMS will be sent {smsSettings[key].timing.toLowerCase()}
          </span>
        </div>
      </div>
    );
  };

  const renderNotificationCard = (key: string, isSequenceItem: boolean = false) => {
    const config = smsSettings[key];
    if (!config) return null;

    return (
      <div
        key={key}
        className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 group overflow-hidden ${
          config.enabled
            ? 'border-green-100'
            : 'border-gray-100 opacity-80'
        } ${isSequenceItem ? 'mb-4 last:mb-0' : ''}`}
      >
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div className="flex items-start gap-5 flex-1 w-full">
              <div className="flex-shrink-0 mt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.enabled}
                    onChange={() => onToggleNotification(key)}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[22px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 shadow-inner"></div>
                </label>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {getNotificationTitle(key)}
                    {isSequenceItem && (
                      <span className="ml-2 text-xs text-gray-400 font-normal">
                        (#{key.split(':').pop()})
                      </span>
                    )}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      config.enabled
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {config.enabled ? 'Active' : 'Disabled'}
                  </span>
                </div>
                {!isSequenceItem && (
                  <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4">
                    {config.description || getNotificationDescription(key)}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <div className="flex items-center gap-2 group/meta">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-green-500 group-hover/meta:bg-green-50 transition-colors">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{config.timing}</span>
                  </div>
                  <div className="flex items-center gap-2 group/meta">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-green-500 group-hover/meta:bg-green-50 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{config.trigger}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
              <button
                onClick={() => setTestSmsData({ type: key, phone: '' })}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-green-50 text-green-700 text-sm font-bold rounded-xl hover:bg-green-100 transition-all border border-green-100 active:scale-95"
              >
                <Send className="w-4 h-4" />
                Send Test
              </button>

              <button
                onClick={() => onEditTemplate(key)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-sm font-bold text-gray-700 rounded-xl hover:border-green-600 hover:text-green-600 hover:bg-green-50/30 transition-all shadow-sm active:scale-95"
              >
                <Edit className="w-4 h-4" />
                Customize
              </button>

              {isSequenceItem && (
                <button
                  onClick={() => onRemoveSequence(key)}
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 border border-gray-100 hover:border-red-100 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                  title="Remove notification"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {renderTimingControls(key)}
        </div>
      </div>
    );
  };

  const reminders = Object.keys(smsSettings).filter(k => k.startsWith('smsReminder'));
  const followups = Object.keys(smsSettings).filter(k => k.startsWith('smsFollowUp'));
  const confirmation = smsSettings['smsConfirmation'];
  const cancellation = smsSettings['smsCancellation'];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
        <div className="absolute top-6 right-6 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider animate-pulse z-10">
          Coming Soon
        </div>
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-green-600" />
            SMS Notifications
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-normal">Send text message alerts and reminders to your customers</p>
          <div className="mt-4">
             <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
               Development in Progress
             </span>
          </div>
        </div>
      </div>

      <div className="space-y-8 opacity-60 pointer-events-none cursor-not-allowed select-none">
        {/* Core Notifications */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Booking Events</h3>
          {confirmation && renderNotificationCard('smsConfirmation')}
          {cancellation && renderNotificationCard('smsCancellation')}
        </section>

        {/* Reminder Sequence */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Reminder Sequence</h3>
            <button 
              onClick={() => onAddSequence('smsReminder')}
              className="text-xs font-bold text-green-600 hover:text-green-700 flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-lg hover:bg-green-100 transition-all border border-green-100"
            >
              <Plus className="w-3 h-3" />
              Add Reminder
            </button>
          </div>
          {reminders.length === 0 ? (
            <div className="p-12 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center">
              <Clock className="w-10 h-10 text-gray-200 mb-4" />
              <p className="text-gray-400 font-medium">No SMS reminders configured</p>
            </div>
          ) : (
            reminders.sort().map(key => renderNotificationCard(key, true))
          )}
        </section>

        {/* Follow-up Sequence */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Follow-up Sequence</h3>
            <button 
              onClick={() => onAddSequence('smsFollowUp')}
              className="text-xs font-bold text-green-600 hover:text-green-700 flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-lg hover:bg-green-100 transition-all border border-green-100"
            >
              <Plus className="w-3 h-3" />
              Add Follow-up
            </button>
          </div>
          {followups.length === 0 ? (
            <div className="p-12 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center">
              <MessageSquare className="w-10 h-10 text-gray-200 mb-4" />
              <p className="text-gray-400 font-medium">No SMS follow-ups configured</p>
            </div>
          ) : (
            followups.sort().map(key => renderNotificationCard(key, true))
          )}
        </section>
      </div>

      {/* Send Test SMS Modal */}
      {testSmsData.type && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Send className="w-5 h-5 text-green-600" />
                Send Test SMS
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Enter a phone number to send a test <strong>{getNotificationTitle(testSmsData.type)}</strong> SMS.
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative group">
                  <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-600/10 focus:border-green-600 transition-all outline-none font-medium text-gray-900"
                    value={testSmsData.phone}
                    onChange={(e) => setTestSmsData(prev => ({ ...prev, phone: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && testSmsData.type) {
                        onSendTestSms(testSmsData.type, testSmsData.phone);
                        setTestSmsData({ type: null, phone: '' });
                      }
                    }}
                  />
                </div>
                <p className="text-[10px] text-gray-500 font-medium italic">
                  The test SMS will be sent immediately using sample data.
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50/30 flex justify-end gap-3">
              <button
                onClick={() => setTestSmsData({ type: null, phone: '' })}
                className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (testSmsData.type) {
                    onSendTestSms(testSmsData.type, testSmsData.phone);
                    setTestSmsData({ type: null, phone: '' });
                  }
                }}
                className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                Send Test SMS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

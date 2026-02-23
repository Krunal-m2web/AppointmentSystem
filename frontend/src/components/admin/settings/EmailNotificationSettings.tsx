import { Clock, Mail, Edit, Send, X, BellRing } from 'lucide-react';
import { NotificationConfig, EmailTemplate, TimingConfig } from '../types/settings';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

interface EmailNotificationSettingsProps {
  notificationSettings: {
    [key: string]: NotificationConfig;
  };
  onToggleNotification: (key: string) => void;
  onEditTemplate: (key: string) => void;
  onUpdateTimingConfig: (key: string, field: keyof TimingConfig, value: any) => void;
  onSendTestEmail: (key: string, email: string) => void;
  onTogglePush: (key: string) => void;
  onAddSequence: (baseType: string) => void;
  onRemoveSequence: (key: string) => void;
}

export const EmailNotificationSettings: React.FC<EmailNotificationSettingsProps> = ({
  notificationSettings,
  onToggleNotification,
  onEditTemplate,
  onUpdateTimingConfig,
  onSendTestEmail,
  onTogglePush,
  onAddSequence,
  onRemoveSequence,
}) => {
  const [testEmailData, setTestEmailData] = useState<{ type: string | null, email: string }>({ 
    type: null, 
    email: '' 
  });

  const getNotificationTitle = (key: string): string => {
    const titles: { [key: string]: string } = {
      appointmentConfirmation: 'Appointment Confirmation',
      appointmentReminder: 'Appointment Reminder',
      appointmentFollowUp: 'Appointment Follow-Up',
      appointmentCancellation: 'Appointment Cancellation',
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
    
    const descriptions: { [key: string]: string } = {
       appointmentConfirmation: 'Sent immediately when an appointment is booked and confirmed.',
       appointmentCancellation: 'Sent immediately when an appointment is cancelled.',
    };
    return descriptions[key] || '';
  };

  const getTimingSummary = (config: NotificationConfig) => {
    const { timingConfig } = config;
    if (!timingConfig) return config.timing || 'Immediately';
    
    if (timingConfig.context === 'immediately') {
      return 'Immediately';
    }
    
    const unitLabel = timingConfig.value === 1 
      ? timingConfig.unit.replace(/s$/, '') // remove 's' for singular
      : timingConfig.unit;
      
    const contextLabel = 
      timingConfig.context === 'before_appointment' ? 'Before Appointment' :
      timingConfig.context === 'after_appointment' ? 'After Appointment' :
      timingConfig.context === 'after_booking' ? 'After Booking' : 
      '';

    return `${timingConfig.value} ${unitLabel} ${contextLabel}`;
  };

  const getTriggerSummary = (config: NotificationConfig, key: string) => {
    if (config.trigger) return config.trigger;
    
    if (key.toLowerCase().includes('confirmation')) return 'On booking confirmation';
    if (key.toLowerCase().includes('reminder')) return 'Before appointment';
    if (key.toLowerCase().includes('followup')) return 'After appointment ends';
    if (key.toLowerCase().includes('cancellation')) return 'On booking cancellation';
    
    return 'Event trigger';
  };

  const renderTimingControls = (key: string) => {
    const config = notificationSettings[key].timingConfig;
    if (!notificationSettings[key].enabled || !config) return null;

    // Timing restrictions based on notification type
    const isConfOrCancel = key === 'appointmentConfirmation' || key === 'appointmentCancellation';
    const isReminder = key.toLowerCase().includes('reminder');
    const isFollowup = key.toLowerCase().includes('followup');

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
            {/* Reminders: only before_appointment (Immediately doesn't make sense for reminders) */}
            {isReminder && (
              <>
                <option value="before_appointment">Before Appointment</option>
              </>
            )}
            
            {/* Confirmations/Cancellations: after_booking or immediately */}
            {isConfOrCancel && (
              <>
                <option value="after_booking">After Booking</option>
                <option value="immediately">Immediately</option>
              </>
            )}
            
            {/* Follow-ups: after_appointment or immediately */}
            {isFollowup && (
              <>
                <option value="after_appointment">After Appointment</option>
                <option value="immediately">Immediately</option>
              </>
            )}
          </select>
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm text-indigo-700 bg-indigo-50 px-3 py-2 rounded-md border border-indigo-100">
          <Clock className="w-4 h-4" />
          <span className="font-medium">
            This email will be sent {getTimingSummary(notificationSettings[key])}
          </span>
        </div>
      </div>
    );
  };

  const renderNotificationCard = (key: string, isSequenceItem: boolean = false) => {
    const config = notificationSettings[key];
    if (!config) return null;

    return (
      <div
        key={key}
        className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 group overflow-hidden ${
          config.enabled
            ? 'border-indigo-100'
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
                  <div className="w-12 h-6.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[22px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
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
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        config.enabled
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {config.enabled ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                </div>
                {!isSequenceItem && (
                  <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4">
                    {config.description || getNotificationDescription(key)}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <div className="flex items-center gap-2 group/meta">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-indigo-500 group-hover/meta:bg-indigo-50 transition-colors">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{getTimingSummary(config)}</span>
                  </div>
                  <div className="flex items-center gap-2 group/meta">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-indigo-500 group-hover/meta:bg-indigo-50 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{getTriggerSummary(config, key)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
              <button
                onClick={() => setTestEmailData({ type: key, email: '' })}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-xl hover:bg-indigo-100 transition-all border border-indigo-100 active:scale-95"
              >
                <Send className="w-4 h-4" />
                Send Test
              </button>

              <button
                onClick={() => onEditTemplate(key)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-sm font-bold text-gray-700 rounded-xl hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all shadow-sm active:scale-95"
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

  const reminders = Object.keys(notificationSettings).filter(k => k.startsWith('appointmentReminder'));
  const followups = Object.keys(notificationSettings).filter(k => k.startsWith('appointmentFollowUp'));
  const confirmation = notificationSettings['appointmentConfirmation'];
  const cancellation = notificationSettings['appointmentCancellation'];

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

      <div className="space-y-8">
        {/* Core Notifications */}
        <section className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Booking Events</h3>
            {confirmation && renderNotificationCard('appointmentConfirmation')}
            {cancellation && renderNotificationCard('appointmentCancellation')}
        </section>

        {/* Reminder Sequence */}
        <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Reminder Sequence</h3>
                <button 
                    onClick={() => onAddSequence('appointmentReminder')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all border border-indigo-100"
                >
                    <Edit className="w-3 h-3" />
                    Add Reminder
                </button>
            </div>
            {reminders.length === 0 ? (
                <div className="p-12 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center">
                    <Clock className="w-10 h-10 text-gray-200 mb-4" />
                    <p className="text-gray-400 font-medium">No reminders configured</p>
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
                    onClick={() => onAddSequence('appointmentFollowUp')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all border border-indigo-100"
                >
                    <Edit className="w-3 h-3" />
                    Add Follow-up
                </button>
            </div>
            {followups.length === 0 ? (
                <div className="p-12 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center">
                    <Mail className="w-10 h-10 text-gray-200 mb-4" />
                    <p className="text-gray-400 font-medium">No follow-ups configured</p>
                </div>
            ) : (
                followups.sort().map(key => renderNotificationCard(key, true))
            )}
        </section>
      </div>

      {/* Send Test Email Modal */}
      <Dialog open={!!testEmailData.type} onOpenChange={(open: boolean) => !open && setTestEmailData({ type: null, email: '' })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
                <Send className="w-5 h-5 text-indigo-600" />
                Send Test Notification
            </DialogTitle>
            <DialogDescription>
              Enter an email address to send a test <strong>{testEmailData.type ? getNotificationTitle(testEmailData.type) : ''}</strong> email.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="test-email">Recipient Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                <Input
                  id="test-email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-11"
                  value={testEmailData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTestEmailData(prev => ({ ...prev, email: e.target.value }))}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter' && testEmailData.type) {
                        onSendTestEmail(testEmailData.type, testEmailData.email);
                        setTestEmailData({ type: null, email: '' });
                    }
                  }}
                />
              </div>
              <p className="text-[10px] text-gray-500 font-medium italic">
                The test email will be sent immediately using sample data.
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setTestEmailData({ type: null, email: '' })}
              className="font-bold"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (testEmailData.type) {
                  onSendTestEmail(testEmailData.type, testEmailData.email);
                  setTestEmailData({ type: null, email: '' });
                }
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2 px-6"
            >
              <Send className="w-4 h-4" />
              Send Test Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

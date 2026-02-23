import { useState, useEffect } from 'react';
import { googleCalendarApi, GoogleCalendarConnectionStatus } from '../../services/googleCalendarApi';
import { toast } from 'sonner';
import { Calendar, ExternalLink, CheckCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { ConfirmationModal } from '../../components/ConfirmationModal';

/**
 * Staff-specific Google Calendar settings component.
 * Allows staff members to connect their personal Google Calendar for two-way sync.
 */
export default function StaffCalendarSettings() {
  const [status, setStatus] = useState<GoogleCalendarConnectionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);



  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async (shouldSync = true) => {
    try {
      setLoading(true);
      const data = await googleCalendarApi.getStatus();
      setStatus(data);

      // Trigger background sync only once on initial load if connected
      if (shouldSync && data.isConnected) {
        triggerBackgroundSync();
      }
    } catch (error) {
      console.error('Error fetching calendar status:', error);
      // Don't show error toast on initial load - might be expected for new users
    } finally {
      setLoading(false);
    }
  };

  const triggerBackgroundSync = async () => {
    try {
      await googleCalendarApi.sync();
      // Reload status to update "Last synced" timestamp
      const data = await googleCalendarApi.getStatus();
      setStatus(data);
    } catch (error) {
      // Silently fail for background sync
      console.error('Background sync failed:', error);
    }
  };

  const handleConnect = async () => {
    try {
      setConnecting(true);
      const { url } = await googleCalendarApi.connect();
      // Redirect to Google OAuth
      window.location.href = url;
    } catch (error) {
      console.error('Error connecting:', error);
      toast.error('Failed to initiate connection');
      setConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    setShowDisconnectModal(true);
  };

  const confirmDisconnect = async () => {
    setShowDisconnectModal(false);

    try {
      await googleCalendarApi.disconnect();
      toast.success('Disconnected successfully');
      loadStatus();
    } catch (error) {
      console.error('Error disconnecting:', error);
      toast.error('Failed to disconnect');
    }
  };

  const handleSync = async () => {
    try {
      setSyncing(true);
      await googleCalendarApi.sync();
      toast.success('Calendar synced successfully!');
      loadStatus(); // Refresh to update last synced time
    } catch (error) {
      console.error('Error syncing:', error);
      toast.error('Failed to sync calendar');
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
        <span className="ml-2 text-gray-500">Loading calendar settings...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Calendar className="w-7 h-7 text-indigo-600" />
          My Calendar
        </h1>
        <p className="text-gray-500 mt-1">
          Connect your Google Calendar to sync appointments and block your availability.
        </p>
      </div>

      {/* Connection Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {/* Status Icon */}
              <div className={`p-3 rounded-xl ${status?.isConnected ? 'bg-green-100' : 'bg-gray-100'}`}>
                {status?.isConnected ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-gray-400" />
                )}
              </div>
              
              {/* Status Text */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {status?.isConnected ? 'Connected' : 'Not Connected'}
                </h2>
                {status?.isConnected ? (
                  <div className="mt-1 space-y-0.5">
                    <p className="text-sm text-gray-600">
                      Account: <span className="font-medium text-gray-900">{status.googleEmail}</span>
                    </p>
                    {status.lastSyncedAt && (
                      <p className="text-xs text-gray-500">
                        Last synced: {new Date(status.lastSyncedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mt-1">
                    Connect to enable two-way calendar sync
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {!status?.isConnected ? (
                <button
                  onClick={handleConnect}
                  disabled={connecting}
                  className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-sm disabled:opacity-50"
                >
                  {connecting ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  )}
                  Connect Google Calendar
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSync}
                    disabled={syncing}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-sm disabled:opacity-50"
                  >
                    {syncing ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4 mr-2" />
                    )}
                    Sync Now
                  </button>
                  <button
                    onClick={handleDisconnect}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                  >
                    Disconnect
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Sync Features Info */}
        {status?.isConnected && (
          <div className="border-t border-gray-100 bg-gray-50/50 p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Sync Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">SaaS → Google</p>
                  <p className="text-xs text-gray-500">New appointments automatically appear in your Google Calendar</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Google → SaaS</p>
                  <p className="text-xs text-gray-500">Your Google events block availability to prevent double booking</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-blue-800">
              <strong>Privacy:</strong> Only you can see your personal Google Calendar events. They will appear as "Busy" slots to customers and other staff members.
            </p>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDisconnectModal}
        onClose={() => setShowDisconnectModal(false)}
        onConfirm={confirmDisconnect}
        title="Disconnect Google Calendar"
        description="Are you sure you want to disconnect your Google Calendar? Future appointments will no longer sync."
        confirmText="Yes, Disconnect"
        variant="destructive"
      />
    </div>
  );
}

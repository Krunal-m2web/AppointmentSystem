import { useState, useEffect } from 'react';
import { googleCalendarApi, GoogleCalendarConnectionStatus } from '../../../services/googleCalendarApi';
import { toast } from 'sonner';
import { ConfirmationModal } from '../../ConfirmationModal';

export default function GoogleCalendarSettings() {
  const [status, setStatus] = useState<GoogleCalendarConnectionStatus | null>(null);
  const [loading, setLoading] = useState(true);
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
      toast.error('Failed to load connection status');
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
      console.error('Background sync failed:', error);
    }
  };

  const handleConnect = async () => {
    try {
      const { url } = await googleCalendarApi.connect();
      // Redirect to Google OAuth
      window.location.href = url;
    } catch (error) {
      console.error('Error connecting:', error);
      toast.error('Failed to initiate connection');
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

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading calendar settings...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Google Calendar Integration</h2>
        <p className="text-sm text-gray-500">
          Sync your appointments with your personal Google Calendar to prevent double bookings.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${status?.isConnected ? 'bg-green-100' : 'bg-gray-100'}`}>
              <svg 
                className={`w-8 h-8 ${status?.isConnected ? 'text-green-600' : 'text-gray-500'}`} 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-2 5h-2v2h2v-2zm-4 0h-2v2h2v-2zm4 4h-2v2h2v-2zm-4 0h-2v2h2v-2zm-4-4H7v2h2v-2z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {status?.isConnected ? 'Connected' : 'Not Connected'}
              </h3>
              {status?.isConnected && (
                <div className="mt-1 space-y-1">
                  <p className="text-sm text-gray-600">
                    Account: <span className="font-medium text-gray-900">{status.googleEmail}</span>
                  </p>
                  {status.lastSyncedAt && (
                    <p className="text-xs text-gray-500">
                      Last synced: {new Date(status.lastSyncedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            {!status?.isConnected ? (
              <button
                onClick={handleConnect}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
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
                Connect with Google
              </button>
            ) : (
              <button
                onClick={handleDisconnect}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Disconnect
              </button>
            )}
          </div>
        </div>

        {status?.isConnected && (
            <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Sync Settings</h4>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="sync-saas-to-google"
                                name="sync-saas-to-google"
                                type="checkbox"
                                checked={true}
                                disabled
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded opacity-50 cursor-not-allowed"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="sync-saas-to-google" className="font-medium text-gray-700">Sync appointments to Google Calendar</label>
                            <p className="text-gray-500">New appointments will be created as events in your primary Google Calendar.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                         <div className="flex items-center h-5">
                            <input
                                id="sync-google-to-saas"
                                name="sync-google-to-saas"
                                type="checkbox"
                                checked={true}
                                disabled
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded opacity-50 cursor-not-allowed"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="sync-google-to-saas" className="font-medium text-gray-700">Block availability from Google events</label>
                            <p className="text-gray-500">Events in your Google Calendar will block time slots in your booking page.</p>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Only you can see your personal Google Calendar events. They will appear as "Busy" slots to other staff members and customers.
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

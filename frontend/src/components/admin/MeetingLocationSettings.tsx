import { useState, useEffect } from 'react';
import { MapPin, Save } from 'lucide-react';
import { getMeetingLocationSettings, updateMeetingLocationSettings } from '../../services/settingsService';

export function MeetingLocationSettings() {
  const [loading, setLoading] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [enabledLocations, setEnabledLocations] = useState({
    'InPerson': true,
    'Phone': true,
    'Zoom': true,
  });

  const locations = [
    { value: 'InPerson', label: 'In Person', icon: '👤' },
    { value: 'Phone', label: 'Phone Call', image: 'https://www.bing.com/th/id/OIP.U4eWFInhZ02-FcJ5V5ieewHaIO?w=173&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
    { value: 'Zoom', label: 'Zoom', image: 'https://static.vecteezy.com/system/resources/previews/016/716/466/non_2x/zoom-meeting-icon-free-png.png' },
  ];

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setSettingsLoading(true);
        const settings = await getMeetingLocationSettings();
        
        // Convert array to object
        const locationsObj: Record<string, boolean> = {};
        locations.forEach(loc => {
          locationsObj[loc.value] = settings.enabledMeetingLocations.includes(loc.value);
        });
        setEnabledLocations(locationsObj as typeof enabledLocations);
      } catch (error) {
        console.error('Failed to load meeting location settings:', error);
        // Keep defaults if fetch fails
      } finally {
        setSettingsLoading(false);
      }
    };
    loadSettings();
  }, []);

  const toggleLocation = (value: string) => {
    setEnabledLocations({
      ...enabledLocations,
      [value]: !enabledLocations[value as keyof typeof enabledLocations],
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Convert object to array
      const enabled = Object.keys(enabledLocations).filter(
        loc => enabledLocations[loc as keyof typeof enabledLocations]
      );
      
      await updateMeetingLocationSettings({
        enabledMeetingLocations: enabled,
      });
      
      alert('Meeting location settings saved successfully!');
    } catch (error: any) {
      console.error('Failed to save meeting location settings:', error);
      alert(`Failed to save settings: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Meeting Location Settings</h1>
        <p className="text-gray-600 mt-1">Choose which meeting locations are available to customers</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            Available Meeting Locations
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Select which meeting location options customers can choose from when booking
          </p>
        </div>
        <div className="p-6">
          {settingsLoading ? (
            <div className="text-center py-8 text-gray-500">Loading settings...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {locations.map((location) => (
                  <div
                    key={location.value}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => toggleLocation(location.value)}
                  >
                    <input
                      type="checkbox"
                      checked={enabledLocations[location.value as keyof typeof enabledLocations]}
                      onChange={() => toggleLocation(location.value)}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      {location.image ? (
                        <img src={location.image} alt={location.label} className="w-8 h-8 object-contain" />
                      ) : (
                        <span className="text-2xl">{location.icon}</span>
                      )}
                      <p className="font-medium">{location.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white`}
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

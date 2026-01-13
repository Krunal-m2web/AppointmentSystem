import { useState, useEffect } from 'react';
import { MapPin, Save, Video, Phone as PhoneIcon, Check } from 'lucide-react';
import { toast } from 'sonner';
import { getMeetingLocationSettings, updateMeetingLocationSettings } from '../../services/settingsService';

interface Location {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

export default function MeetingLocationSettings() {
  const [enabledLocations, setEnabledLocations] = useState<string[]>(['InPerson', 'Phone', 'Zoom']);
  const [loading, setLoading] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await getMeetingLocationSettings();
        if (settings && settings.enabledMeetingLocations) {
          setEnabledLocations(settings.enabledMeetingLocations);
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        toast.error('Failed to load meeting location settings');
      } finally {
        setSettingsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateMeetingLocationSettings({
        enabledMeetingLocations: enabledLocations
      });
      toast.success('Meeting location settings updated successfully');
    } catch (error) {
      console.error('Failed to update settings:', error);
      toast.error('Failed to update meeting location settings');
    } finally {
      setLoading(false);
    }
  };

  const toggleLocation = (value: string) => {
    setEnabledLocations((prev) => 
      prev.includes(value) 
        ? prev.filter(v => v !== value) 
        : [...prev, value]
    );
  };

  const locations: Location[] = [
    {
      label: 'In Person',
      value: 'InPerson',
      icon: <MapPin className="w-6 h-6" />,
      color: 'indigo',
    },
    {
      label: 'Phone Call',
      value: 'Phone',
      icon: <PhoneIcon className="w-6 h-6" />,
      color: 'blue',
    },
    {
      label: 'Zoom Meeting',
      value: 'Zoom',
      icon: <Video className="w-6 h-6" />,
      color: 'blue',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-600" />
            Meeting Channels
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-normal">Standardize how you connect with your clients</p>
        </div>

        <div className="p-8">
          {settingsLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
               <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
               <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Optimizing Channels...</p>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {locations.map((location) => {
                  const isChecked = enabledLocations.includes(location.value);
                  return (
                    <div
                      key={location.value}
                      className={`group relative flex flex-col p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                        isChecked
                          ? 'border-indigo-600 bg-indigo-50/30'
                          : 'border-gray-50 bg-gray-50/30 hover:border-gray-200'
                      }`}
                      onClick={() => toggleLocation(location.value)}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                          isChecked 
                            ? `bg-white text-indigo-600 shadow-sm border border-indigo-100` 
                            : `bg-white text-gray-400 border border-gray-100`
                        }`}>
                          {location.icon}
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isChecked 
                            ? 'bg-indigo-600 border-indigo-600 shadow-sm shadow-indigo-100' 
                            : 'bg-white border-gray-200'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className={`text-lg font-semibold tracking-tight ${isChecked ? 'text-gray-900' : 'text-gray-500'}`}>
                          {location.label}
                        </p>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          {location.value === 'InPerson' ? 'Physical Visit' : 
                          location.value === 'Phone' ? 'Voice Call' : 
                          'Virtual Meeting'}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center justify-between">
                         <span className={`text-[10px] font-bold uppercase tracking-widest ${isChecked ? 'text-indigo-600' : 'text-gray-400'}`}>
                           {isChecked ? 'Method Active' : 'Currently Disabled'}
                         </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-8 border-t border-gray-100">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-3 px-10 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 hover:shadow-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  {loading ? 'Propagating...' : 'Save Locations'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

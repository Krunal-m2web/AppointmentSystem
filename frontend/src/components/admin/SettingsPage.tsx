
import React, { useState } from 'react';
import { Save, Globe } from 'lucide-react';
import { TIMEZONES } from '../../utils/datetime';
import { useTimezone } from '../../context/TimezoneContext';
import { getAuthHeaders } from '../../services/staffApi';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

export const SettingsPage: React.FC = () => {
    const { timezone, setTimezone, refreshTimezone } = useTimezone();
    const [loading, setLoading] = useState(false);
    const [selectedTimezone, setSelectedTimezone] = useState(timezone);

    // Sync local state if context updates (initial load)
    React.useEffect(() => {
        setSelectedTimezone(timezone);
    }, [timezone]);

    const handleSave = async () => {
        setLoading(true);
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
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8">
             <div className="mb-6 md:mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                <p className="text-gray-600">Manage global application settings</p>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-200 p-6 max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-6 h-6 text-indigo-600" />
                    <h2 className="text-lg font-semibold text-gray-800">Global Timezone</h2>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                    Set the primary timezone for your company. This will affect how appointments are displayed on the booking page and throughout the admin panel.
                </p>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Timezone
                    </label>
                     <select
                        value={selectedTimezone}
                        onChange={(e) => setSelectedTimezone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {TIMEZONES.map((tz) => (
                            <option key={tz.value} value={tz.value}>
                                {tz.label} ({tz.value})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

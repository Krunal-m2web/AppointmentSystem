import { useState } from 'react';
import { Clock, Plus, Trash2 } from 'lucide-react';

interface TimeSlot {
  start: string;
  end: string;
}

interface DayAvailability {
  enabled: boolean;
  slots: TimeSlot[];
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const initialAvailability: Record<string, DayAvailability> = {
  Monday: { enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
  Tuesday: { enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
  Wednesday: { enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
  Thursday: { enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
  Friday: { enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
  Saturday: { enabled: false, slots: [] },
  Sunday: { enabled: false, slots: [] },
};

export function AvailabilityPage() {
  const [availability, setAvailability] = useState(initialAvailability);

  const toggleDay = (day: string) => {
    setAvailability({
      ...availability,
      [day]: {
        ...availability[day],
        enabled: !availability[day].enabled,
      },
    });
  };

  const addTimeSlot = (day: string) => {
    setAvailability({
      ...availability,
      [day]: {
        ...availability[day],
        slots: [...availability[day].slots, { start: '09:00', end: '17:00' }],
      },
    });
  };

  const removeTimeSlot = (day: string, index: number) => {
    const newSlots = availability[day].slots.filter((_, i) => i !== index);
    setAvailability({
      ...availability,
      [day]: {
        ...availability[day],
        slots: newSlots,
      },
    });
  };

  const updateTimeSlot = (day: string, index: number, field: 'start' | 'end', value: string) => {
    const newSlots = [...availability[day].slots];
    newSlots[index][field] = value;
    setAvailability({
      ...availability,
      [day]: {
        ...availability[day],
        slots: newSlots,
      },
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Set Your Availability</h1>
        <p className="text-gray-600 mt-1">Configure when clients can book appointments with you</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2>Weekly Schedule</h2>
          <p className="text-sm text-gray-600 mt-1">
            Set your available hours for each day of the week
          </p>
        </div>

        <div className="p-6 space-y-6">
          {DAYS.map((day) => (
            <div key={day} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-gray-50">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={availability[day].enabled}
                    onChange={() => toggleDay(day)}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                  />
                  <h3>{day}</h3>
                </div>
                {availability[day].enabled && (
                  <button
                    onClick={() => addTimeSlot(day)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Time Slot
                  </button>
                )}
              </div>

              {availability[day].enabled && (
                <div className="p-4 space-y-3">
                  {availability[day].slots.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No time slots added. Click "Add Time Slot" to get started.
                    </p>
                  ) : (
                    availability[day].slots.map((slot, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div className="flex-1 flex items-center gap-3">
                          <input
                            type="time"
                            value={slot.start}
                            onChange={(e) => updateTimeSlot(day, index, 'start', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={slot.end}
                            onChange={(e) => updateTimeSlot(day, index, 'end', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        {availability[day].slots.length > 1 && (
                          <button
                            onClick={() => removeTimeSlot(day, index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Save Availability
          </button>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="bg-white rounded-lg shadow mt-6">
        <div className="p-6 border-b border-gray-200">
          <h2>Additional Settings</h2>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Buffer Time Between Appointments
            </label>
            <select className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="0">No buffer</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
            </select>
            <p className="text-sm text-gray-600 mt-1">
              Time between appointments to prepare or take a break
            </p>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Minimum Notice Period
            </label>
            <select className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="0">Same day</option>
              <option value="24">24 hours</option>
              <option value="48">48 hours</option>
              <option value="72">72 hours</option>
            </select>
            <p className="text-sm text-gray-600 mt-1">
              How far in advance clients must book
            </p>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Maximum Booking Window
            </label>
            <select className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">6 months</option>
            </select>
            <p className="text-sm text-gray-600 mt-1">
              How far in advance clients can book
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

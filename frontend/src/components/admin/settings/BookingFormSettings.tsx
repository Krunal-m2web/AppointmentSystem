import { useState, useEffect } from 'react';
import { Palette, Type, Save, RotateCcw, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { getMyCompany, updateMyCompany } from '../../../services/CompanyService';

// Default booking form labels - just the key terms
const DEFAULT_LABELS = {
  serviceLabel: 'Service',  // Will appear as: "Select Service", "Choose a service...", etc.
  staffLabel: 'Staff Member',      // Will appear as: "Select Staff", "Choose a staff member...", etc.
};

// Preset color palettes
const COLOR_PRESETS = [
  { name: 'Indigo', primary: '#6366f1', secondary: '#10b981' },
  { name: 'Blue', primary: '#3b82f6', secondary: '#06b6d4' },
  { name: 'Purple', primary: '#8b5cf6', secondary: '#ec4899' },
  { name: 'Teal', primary: '#14b8a6', secondary: '#6366f1' },
  { name: 'Orange', primary: '#f97316', secondary: '#0ea5e9' },
  { name: 'Rose', primary: '#f43f5e', secondary: '#8b5cf6' },
];

interface BookingFormSettingsProps {
  // Empty for now, can add callbacks if needed
}

export function BookingFormSettings({}: BookingFormSettingsProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Color settings
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [secondaryColor, setSecondaryColor] = useState('#10b981');
  
  // Label settings
  const [labels, setLabels] = useState(DEFAULT_LABELS);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const company = await getMyCompany();
      
      if (company.bookingFormPrimaryColor) {
        setPrimaryColor(company.bookingFormPrimaryColor);
      }
      if (company.bookingFormSecondaryColor) {
        setSecondaryColor(company.bookingFormSecondaryColor);
      }
      if (company.bookingFormLabels) {
        try {
          const parsedLabels = JSON.parse(company.bookingFormLabels);
          setLabels({ ...DEFAULT_LABELS, ...parsedLabels });
        } catch {
          // Keep defaults if parsing fails
        }
      }
    } catch (err) {
      console.error('Failed to load booking form settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateMyCompany({
        bookingFormPrimaryColor: primaryColor,
        bookingFormSecondaryColor: secondaryColor,
        bookingFormLabels: JSON.stringify(labels),
      });
      toast.success('Booking form settings saved!');
    } catch (err) {
      console.error('Failed to save settings:', err);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setPrimaryColor('#6366f1');
    setSecondaryColor('#10b981');
    setLabels(DEFAULT_LABELS);
    toast.info('Settings reset to defaults');
  };

  const updateLabel = (key: keyof typeof DEFAULT_LABELS, value: string) => {
    setLabels(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Color Palette Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-600" />
            Color Palette
          </h2>
          <p className="text-sm text-gray-500 mt-1">Customize the appearance of your booking form</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Preset Palettes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Quick Presets</label>
            <div className="flex flex-wrap gap-3">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setPrimaryColor(preset.primary);
                    setSecondaryColor(preset.secondary);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                    primaryColor === preset.primary && secondaryColor === preset.secondary
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex -space-x-1">
                    <div 
                      className="w-5 h-5 rounded-full border-2 border-white shadow-sm" 
                      style={{ backgroundColor: preset.primary }}
                    />
                    <div 
                      className="w-5 h-5 rounded-full border-2 border-white shadow-sm" 
                      style={{ backgroundColor: preset.secondary }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                  placeholder="#6366f1"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Used for buttons, active states, and accents</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Secondary Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                  placeholder="#10b981"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Used for success states and highlights</p>
            </div>
          </div>

          {/* Color Preview */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Preview</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                className="px-6 py-2.5 rounded-lg text-white font-semibold transition-all"
                style={{ backgroundColor: primaryColor }}
              >
                Primary Button
              </button>
              <button 
                className="px-6 py-2.5 rounded-lg text-white font-semibold transition-all"
                style={{ backgroundColor: secondaryColor }}
              >
                Success Button
              </button>
              <div 
                className="px-4 py-2 rounded-lg border-2 text-sm font-medium"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Outlined
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Labels Section - Simplified */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
            <Type className="w-5 h-5 text-indigo-600" />
            Custom Terminology
          </h2>
          <p className="text-sm text-gray-500 mt-1">Rename "Service" and "Staff" to match your business</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Service Label */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                "Service" becomes:
              </label>
              <input
                type="text"
                value={labels.serviceLabel}
                onChange={(e) => updateLabel('serviceLabel', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg font-medium"
                placeholder="e.g., Treatment, Session, Class"
              />
              <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-600 mb-2">Preview:</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Select <span className="font-semibold text-indigo-600">{labels.serviceLabel || 'Service'}</span></li>
                  <li>• Choose a <span className="font-semibold text-indigo-600">{(labels.serviceLabel || 'Service').toLowerCase()}</span>...</li>
                  <li>• <span className="font-semibold text-indigo-600">{labels.serviceLabel || 'Service'}</span>: Psychotherapy</li>
                </ul>
              </div>
            </div>

            {/* Staff Label */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                "Staff Member" becomes:
              </label>
              <input
                type="text"
                value={labels.staffLabel}
                onChange={(e) => updateLabel('staffLabel', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg font-medium"
                placeholder="e.g., Therapist, Coach, Instructor"
              />
              <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-600 mb-2">Preview:</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Select <span className="font-semibold text-indigo-600">{labels.staffLabel || 'Staff Member'}</span></li>
                  <li>• Please select a {(labels.serviceLabel || 'service').toLowerCase()} first...</li>
                  <li>• <span className="font-semibold text-indigo-600">{labels.staffLabel || 'Staff'}</span>: John Doe</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Common Examples */}
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
            <p className="text-sm font-semibold text-indigo-900 mb-2">💡 Common Examples:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => setLabels({ serviceLabel: 'Treatment', staffLabel: 'Therapist' })}
                className="px-3 py-2 bg-white rounded-lg border border-indigo-200 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-all"
              >
                Spa / Wellness
              </button>
              <button
                onClick={() => setLabels({ serviceLabel: 'Session', staffLabel: 'Coach' })}
                className="px-3 py-2 bg-white rounded-lg border border-indigo-200 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-all"
              >
                Coaching
              </button>
              <button
                onClick={() => setLabels({ serviceLabel: 'Class', staffLabel: 'Instructor' })}
                className="px-3 py-2 bg-white rounded-lg border border-indigo-200 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-all"
              >
                Fitness
              </button>
              <button
                onClick={() => setLabels({ serviceLabel: 'Consultation', staffLabel: 'Consultant' })}
                className="px-3 py-2 bg-white rounded-lg border border-indigo-200 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-all"
              >
                Consulting
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-md disabled:opacity-50"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Settings
        </button>
      </div>
    </div>
  );
}

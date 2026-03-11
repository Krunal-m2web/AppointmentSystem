import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  fetchHolidays,
  createHoliday,
  bulkCreateHolidays,
  updateHoliday,
  deleteHoliday,
  bulkDeleteHolidays,
  fetchImportedCountries,
  deleteHolidaysBySource,
  type Holiday as ApiHoliday,
  type ImportedCountry,
} from '../../services/holidayApi';
import {
  ChevronLeft,
  ChevronRight,
  Trash2,
  Download,
  RefreshCw,
  Calendar,
  Globe,
  X,
  Check,
  Repeat,
  AlertCircle,
  CheckSquare,
  Square,
  Info,
  Search,
  Plus,
  Loader2,
  Save,
} from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
// Use the backend type directly (id is a number)
type Holiday = ApiHoliday;

interface NagerCountry {
  countryCode: string;
  name: string;
}

interface NagerHoliday {
  date: string;
  localName: string;
  name: string;
}

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const WEEKDAYS = ['Mo','Tu','We','Th','Fr','Sa','Su'];

const CURRENT_YEAR = new Date().getFullYear();
const TODAY = new Date().toISOString().slice(0, 10);


/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

function daysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}

// Monday = 0
function startDow(y: number, m: number) {
  return (new Date(y, m, 1).getDay() + 6) % 7;
}

function fmtDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  });
}

function effectiveDate(h: Holiday, year: number): string {
  if (h.repeatYearly) {
    const [, mm, dd] = h.date.split('-');
    return `${year}-${mm}-${dd}`;
  }
  return h.date;
}

function getSourceColor(source: string): string {
  if (source === 'custom') return '#6366f1';
  return '#059669';
}

function getSourceDotClass(source: string): string {
  return source === 'custom' ? 'bg-indigo-500' : 'bg-emerald-500';
}

function getSourceBadgeClass(source: string): string {
  return source === 'custom'
    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
    : 'bg-emerald-50 text-emerald-700 border border-emerald-200';
}

/* ─────────────────────────────────────────────
   MINI MONTH
───────────────────────────────────────────── */
interface MiniMonthProps {
  year: number;
  month: number;
  holidays: Holiday[];
  selectedDates: Set<string>;
  bulkMode: boolean;
  onDateClick: (d: string) => void;
  onBulkToggle: (d: string) => void;
  isAdmin?: boolean;
}

function MiniMonth({ year, month, holidays, selectedDates, bulkMode, onDateClick, onBulkToggle, isAdmin }: MiniMonthProps) {
  const total = daysInMonth(year, month);
  const offset = startDow(year, month);

  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const lookup = new Map<string, Holiday>();
  holidays.forEach((h) => { lookup.set(effectiveDate(h, year), h); });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow select-none">
      <p className="text-center text-gray-700 mb-3 font-medium" style={{ fontSize: '0.83rem' }}>
        {MONTHS[month]}
      </p>
      <div className="grid grid-cols-7 mb-0.5">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-gray-400" style={{ fontSize: '0.63rem', padding: '2px 0' }}>
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`e-${idx}`} style={{ height: 26 }} />;
          const ds = toDateStr(year, month, day);
          const holiday = lookup.get(ds);
          const isToday = ds === TODAY;
          const isBulkSel = selectedDates.has(ds);

          let bg = 'transparent';
          let fg = '#374151';
          let border = 'none';
          let shadow = '';

          if (holiday) {
            bg = getSourceColor(holiday.source);
            fg = '#fff';
            shadow = '0 1px 3px rgba(0,0,0,0.15)';
          } else if (isBulkSel) {
            bg = '#e0e7ff';
            fg = '#3730a3';
          } else if (isToday) {
            border = '2px solid #6366f1';
            fg = '#6366f1';
          }

          return (
            <div key={ds} className="flex items-center justify-center" style={{ height: 26 }}>
              <div
                onClick={() => {
                  if (!isAdmin) return;
                  bulkMode ? onBulkToggle(ds) : onDateClick(ds);
                }}
                title={holiday?.name}
                className={`flex items-center justify-center rounded-full transition-all ${isAdmin ? 'cursor-pointer' : 'cursor-default'}`}
                style={{ width: 22, height: 22, fontSize: '0.68rem', background: bg, color: fg, border, boxShadow: shadow }}
                onMouseEnter={(e) => {
                  if (!isAdmin) return;
                  if (!holiday && !isBulkSel && !isToday)
                    (e.currentTarget as HTMLDivElement).style.background = '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                  if (!holiday && !isBulkSel && !isToday)
                    (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                }}
              >
                {day}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ADD / EDIT HOLIDAY MODAL
───────────────────────────────────────────── */
interface AddModalProps {
  dateStr: string;
  existing?: Holiday;
  isSaving?: boolean;
  onSave: (name: string, repeat: boolean) => void;
  onDelete?: () => void;
  onClose: () => void;
}

function AddHolidayModal({ dateStr, existing, isSaving, onSave, onDelete, onClose }: AddModalProps) {
  const [name, setName] = useState(existing?.name ?? '');
  const [repeat, setRepeat] = useState(existing?.repeatYearly ?? false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-gray-800 font-medium" style={{ fontSize: '0.88rem' }}>
                {existing ? 'Edit Holiday' : 'Add Holiday'}
              </p>
              <p className="text-gray-400" style={{ fontSize: '0.7rem' }}>{fmtDate(dateStr)}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          <div>
            <label className="block text-gray-500 mb-1.5" style={{ fontSize: '0.78rem' }}>
              Holiday Name <span className="text-red-400">*</span>
            </label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Company Retreat"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              style={{ fontSize: '0.85rem' }}
              onKeyDown={(e) => { if (e.key === 'Enter' && name.trim()) onSave(name.trim(), repeat); }}
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl border border-indigo-100">
            <div className="flex items-center gap-2">
              <Repeat className="w-4 h-4 text-indigo-500" />
              <div>
                <p className="text-gray-700" style={{ fontSize: '0.8rem' }}>Repeat Every Year</p>
                <p className="text-gray-400" style={{ fontSize: '0.67rem' }}>Auto-mark on this date annually</p>
              </div>
            </div>
            <button
              onClick={() => setRepeat(!repeat)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 cursor-pointer ${repeat ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${repeat ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-gray-100 flex items-center gap-2">
          {existing && onDelete && (
            <button
              onClick={onDelete}
              className="flex items-center gap-1.5 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              style={{ fontSize: '0.78rem' }}
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove
            </button>
          )}
          <div className="flex gap-2 ml-auto">
            <button onClick={onClose} disabled={isSaving} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50" style={{ fontSize: '0.82rem' }}>
              Cancel
            </button>
            <button
            disabled={!name.trim() || isSaving}
            onClick={() => { if (name.trim()) onSave(name.trim(), repeat); }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-40 transition-colors"
            style={{ fontSize: '0.82rem' }}
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? 'Saving...' : existing ? 'Save Changes' : 'Add Holiday'}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BULK ADD MODAL
───────────────────────────────────────────── */
interface BulkAddModalProps {
  dates: string[];
  isSaving?: boolean;
  onSave: (name: string, repeat: boolean) => void;
  onClose: () => void;
}

function BulkAddModal({ dates, isSaving, onSave, onClose }: BulkAddModalProps) {
  const [name, setName] = useState('');
  const [repeat, setRepeat] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <CheckSquare className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-gray-800 font-medium" style={{ fontSize: '0.88rem' }}>Bulk Add Holidays</p>
              <p className="text-gray-400" style={{ fontSize: '0.7rem' }}>{dates.length} date{dates.length !== 1 ? 's' : ''} selected</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
        </div>
        <div className="px-5 py-4 space-y-4">
          <div className="max-h-28 overflow-y-auto bg-gray-50 rounded-lg p-3 space-y-1">
            {dates.slice(0, 7).map((d) => (
              <div key={d} className="flex items-center gap-2" style={{ fontSize: '0.73rem' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                <span className="text-gray-600">{fmtDate(d)}</span>
              </div>
            ))}
            {dates.length > 7 && <p className="text-gray-400 pl-3.5" style={{ fontSize: '0.68rem' }}>+{dates.length - 7} more…</p>}
          </div>
          <div>
            <label className="block text-gray-500 mb-1.5" style={{ fontSize: '0.78rem' }}>
              Holiday Name <span className="text-red-400">*</span>
            </label>
            <input
              autoFocus value={name} onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Company Holiday"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              style={{ fontSize: '0.85rem' }}
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl border border-indigo-100">
            <div className="flex items-center gap-2">
              <Repeat className="w-4 h-4 text-indigo-500" />
              <p className="text-gray-700" style={{ fontSize: '0.8rem' }}>Repeat Every Year</p>
            </div>
            <button
              onClick={() => setRepeat(!repeat)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 cursor-pointer ${repeat ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${repeat ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-gray-100 flex gap-2 justify-end">
          <button onClick={onClose} disabled={isSaving} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50" style={{ fontSize: '0.82rem' }}>Cancel</button>
          <button
            disabled={!name.trim() || isSaving}
            onClick={() => { if (name.trim()) onSave(name.trim(), repeat); }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-40 transition-colors"
            style={{ fontSize: '0.82rem' }}
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? 'Adding...' : `Add ${dates.length} Holiday${dates.length !== 1 ? 's' : ''}`}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONFIRM MODAL
───────────────────────────────────────────── */
interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({ title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', isDestructive = false, isLoading = false, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-6 text-center">
          <div className={`w-12 h-12 rounded-full mx-auto ${isDestructive ? 'bg-red-100' : 'bg-indigo-100'} flex items-center justify-center mb-4`}>
            {isDestructive ? <Trash2 className="w-6 h-6 text-red-600" /> : <AlertCircle className="w-6 h-6 text-indigo-600" />}
          </div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">{title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{message}</p>
        </div>
        <div className="px-6 py-4 bg-gray-50 flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-2.5 ${isDestructive ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white rounded-xl transition-colors shadow-sm font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-80`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : null}
            {isLoading ? 'Wait...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COUNTRY PICKER MODAL
───────────────────────────────────────────── */
interface CountryPickerModalProps {
  year: number;
  existingDates: Set<string>;
  isSaving: boolean;
  onClose: () => void;
  onImported: (holidays: { date: string; name: string; source: string; countryName?: string }[]) => void;
}

function CountryPickerModal({ year, existingDates, isSaving, onClose, onImported }: CountryPickerModalProps) {
  const [step, setStep] = useState<'pick' | 'preview'>('pick');
  const [countries, setCountries] = useState<NagerCountry[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [countryError, setCountryError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<NagerCountry | null>(null);
  const [apiHolidays, setApiHolidays] = useState<NagerHoliday[]>([]);
  const [loadingHolidays, setLoadingHolidays] = useState(false);
  const [holidayError, setHolidayError] = useState<string | null>(null);
  const [checkedDates, setCheckedDates] = useState<Set<string>>(new Set());
  const [previewSearch, setPreviewSearch] = useState('');

  // Track which countries are already imported
  const [importedSources, setImportedSources] = useState<Set<string>>(new Set());
  const [removingSource, setRemovingSource] = useState<string | null>(null);
  const [confirmRemove, setConfirmRemove] = useState<NagerCountry | null>(null);

  const loadImported = useCallback(async () => {
    try {
      const data = await fetchImportedCountries();
      setImportedSources(new Set(data.map(c => c.source)));
    } catch (err) {
      console.error('Failed to load imported countries:', err);
    }
  }, []);

  useEffect(() => {
    loadImported();
  }, [loadImported]);

  useEffect(() => {
    setLoadingCountries(true);
    fetch('https://date.nager.at/api/v3/AvailableCountries')
      .then((r) => r.json())
      .then((data: NagerCountry[]) => {
        // Sort: India first, then rest alphabetically
        const sorted = data.sort((a, b) => {
          if (a.countryCode === 'IN') return -1;
          if (b.countryCode === 'IN') return 1;
          return a.name.localeCompare(b.name);
        });
        setCountries(sorted);
        setLoadingCountries(false);
      })
      .catch(() => {
        setCountryError('Could not load country list. Please check your internet connection.');
        setLoadingCountries(false);
      });
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.countryCode.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCountries = useMemo(() => {
    return [...filteredCountries].sort((a, b) => {
      const aImported = importedSources.has(a.countryCode);
      const bImported = importedSources.has(b.countryCode);

      if (aImported && !bImported) return -1;
      if (!aImported && bImported) return 1;

      // Within same group, maintain special priority for India
      if (a.countryCode === 'IN') return -1;
      if (b.countryCode === 'IN') return 1;
      
      return a.name.localeCompare(b.name);
    });
  }, [filteredCountries, importedSources]);

  const handleSelectCountry = async (country: NagerCountry) => {
    setSelected(country);
    setStep('preview');
    setLoadingHolidays(true);
    setHolidayError(null);
    setPreviewSearch('');
    try {
      const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${country.countryCode}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: NagerHoliday[] = await res.json();
      setApiHolidays(data);
      setCheckedDates(new Set(data.filter((h) => !existingDates.has(h.date)).map((h) => h.date)));
    } catch {
      setHolidayError(`Failed to fetch holidays for ${country.name}. Please try again.`);
    } finally {
      setLoadingHolidays(false);
    }
  };

  const handleRemoveSource = async (country: NagerCountry) => {
    setRemovingSource(country.countryCode);
    try {
      await deleteHolidaysBySource(country.countryCode);
      await loadImported();
      // Notify parent to refresh the main list
      onImported([]); 
      setConfirmRemove(null);
    } catch (err) {
      console.error('Failed to remove holidays:', err);
      alert('Failed to remove holidays. Please try again.');
    } finally {
      setRemovingSource(null);
    }
  };

  const toggleCheck = (date: string) => {
    setCheckedDates((prev) => {
      const next = new Set(prev);
      next.has(date) ? next.delete(date) : next.add(date);
      return next;
    });
  };

  const filteredPreview = apiHolidays.filter(
    (h) => h.name.toLowerCase().includes(previewSearch.toLowerCase()) ||
            h.localName.toLowerCase().includes(previewSearch.toLowerCase())
  );

  const toggleAll = () => {
    const nonExisting = filteredPreview.filter((h) => !existingDates.has(h.date)).map((h) => h.date);
    if (nonExisting.every((d) => checkedDates.has(d))) {
      setCheckedDates(new Set());
    } else {
      setCheckedDates(new Set(nonExisting));
    }
  };

  const handleImport = () => {
    if (!selected) return;
    const map = new Map(apiHolidays.map((h) => [h.date, h]));
    const newHolidays = Array.from(checkedDates).map((date) => ({
      date,
      name: map.get(date)?.localName || map.get(date)?.name || 'Public Holiday',
      source: selected.countryCode,
      countryName: selected.name,
    }));
    onImported(newHolidays);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col" style={{ maxHeight: '88vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            {step === 'preview' && (
              <button
                onClick={() => { setStep('pick'); setSelected(null); setApiHolidays([]); }}
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Globe className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-gray-800 font-medium" style={{ fontSize: '0.9rem' }}>
                {step === 'pick' ? 'Import Public Holidays' : `${selected?.name} Holidays`}
              </p>
              <p className="text-gray-400" style={{ fontSize: '0.7rem' }}>
                {step === 'pick'
                  ? `${countries.length} countries available`
                  : `${year} · ${apiHolidays.length} holiday${apiHolidays.length !== 1 ? 's' : ''} found`
                }
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Country picker */}
        {step === 'pick' && (
          <>
            <div className="px-5 py-3 border-b border-gray-50 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country name or code…"
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  style={{ fontSize: '0.82rem' }}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-2">
              {loadingCountries ? (
                <div className="grid grid-cols-2 gap-2 p-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100">
                      <Skeleton className="w-8 h-5 rounded" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-2 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : countryError ? (
                <div className="flex items-start gap-2 m-4 p-3 bg-red-50 rounded-lg border border-red-200">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-600" style={{ fontSize: '0.8rem' }}>{countryError}</p>
                </div>
              ) : filteredCountries.length === 0 ? (
                <p className="text-center text-gray-400 py-8" style={{ fontSize: '0.82rem' }}>No countries match "{search}"</p>
              ) : (
                <div className="grid grid-cols-2 gap-1">
                  {sortedCountries.map((c) => {
                    const isImported = importedSources.has(c.countryCode);
                    const isRemoving = removingSource === c.countryCode;

                    return (
                      <button
                        key={c.countryCode}
                        onClick={() => handleSelectCountry(c)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-left transition-colors border border-transparent hover:border-gray-200 group cursor-pointer"
                      >
                        <span className="w-8 h-5 rounded text-center bg-gray-100 group-hover:bg-white flex items-center justify-center flex-shrink-0" style={{ fontSize: '0.65rem', fontWeight: 600, color: '#6b7280', letterSpacing: '0.03em' }}>
                          {c.countryCode}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-700 truncate" style={{ fontSize: '0.8rem' }}>{c.name}</p>
                          {isImported && (
                            <span className="text-emerald-600 font-medium" style={{ fontSize: '0.65rem' }}>Imported</span>
                          )}
                        </div>
                        {isImported && (
                          <button
                            onClick={(e) => { e.stopPropagation(); setConfirmRemove(c); }}
                            className={`p-1.5 text-indigo-600 hover:text-white hover:bg-indigo-600 hover:shadow-md active:scale-95 rounded-md transition-all duration-200 cursor-pointer ${
                              isRemoving ? 'opacity-100 bg-indigo-50' : 'opacity-0 group-hover:opacity-100'
                            }`}
                            title="Remove all holidays for this country"
                          >
                            {isRemoving ? (
                              <div className="w-3.5 h-3.5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {/* Step 2: Holiday preview */}
        {step === 'preview' && (
          <>
            {loadingHolidays ? (
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-4 h-4 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : holidayError ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 gap-3">
                <AlertCircle className="w-8 h-8 text-red-400" />
                <p className="text-red-600 text-center" style={{ fontSize: '0.82rem' }}>{holidayError}</p>
                <button
                  onClick={() => selected && handleSelectCountry(selected)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  style={{ fontSize: '0.8rem' }}
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retry
                </button>
              </div>
            ) : (
              <>
                <div className="px-5 py-3 border-b border-gray-50 flex-shrink-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      autoFocus
                      value={previewSearch}
                      onChange={(e) => setPreviewSearch(e.target.value)}
                      placeholder="Search holidays…"
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      style={{ fontSize: '0.82rem' }}
                    />
                  </div>
                </div>
                <div className="px-5 py-2.5 border-b border-gray-100 flex items-center justify-between flex-shrink-0 bg-gray-50">
                  <button onClick={toggleAll} className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer" style={{ fontSize: '0.78rem' }}>
                    {filteredPreview.filter((h) => !existingDates.has(h.date)).every((h) => checkedDates.has(h.date)) && filteredPreview.filter((h) => !existingDates.has(h.date)).length > 0
                      ? <CheckSquare className="w-4 h-4 text-indigo-500" />
                      : <Square className="w-4 h-4" />
                    }
                    Select All
                  </button>
                  <span className="text-gray-400" style={{ fontSize: '0.73rem' }}>{checkedDates.size} selected</span>
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-2">
                  {filteredPreview.length === 0 ? (
                    <p className="text-center text-gray-400 py-8" style={{ fontSize: '0.82rem' }}>No holidays match your search.</p>
                  ) : (
                    <div className="space-y-0.5">
                      {filteredPreview.map((h) => {
                        const already = existingDates.has(h.date);
                        const isChecked = checkedDates.has(h.date);
                        return (
                          <div
                            key={h.date}
                            onClick={() => !already && toggleCheck(h.date)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${already ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'} ${isChecked && !already ? 'bg-emerald-50' : ''}`}
                          >
                            {already ? (
                              <div className="w-4 h-4 rounded flex items-center justify-center bg-green-100 flex-shrink-0">
                                <Check className="w-3 h-3 text-green-600" />
                              </div>
                            ) : isChecked ? (
                              <CheckSquare className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            ) : (
                              <Square className="w-4 h-4 text-gray-300 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-gray-800 truncate" style={{ fontSize: '0.8rem' }}>
                                {h.localName !== h.name ? h.localName : h.name}
                                {h.localName !== h.name && <span className="text-gray-400 ml-1" style={{ fontSize: '0.72rem' }}>({h.name})</span>}
                              </p>
                              <p className="text-gray-400" style={{ fontSize: '0.68rem' }}>{fmtDate(h.date)}</p>
                            </div>
                            {already && <span className="text-green-600 flex-shrink-0" style={{ fontSize: '0.65rem' }}>Already added</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="px-5 py-4 border-t border-gray-100 flex gap-2 justify-end flex-shrink-0">
                  <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg" style={{ fontSize: '0.82rem' }}>Cancel</button>
                  <button
                    disabled={checkedDates.size === 0 || isSaving}
                    onClick={handleImport}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-40 transition-colors flex items-center gap-2"
                    style={{ fontSize: '0.82rem' }}
                  >
                    {isSaving ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    {isSaving ? 'Importing...' : `Import ${checkedDates.size} Holiday${checkedDates.size !== 1 ? 's' : ''}`}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {confirmRemove && (
        <ConfirmModal
          title="Remove Holidays?"
          message={`Are you sure you want to remove all imported holidays for ${confirmRemove.name}? This action cannot be undone.`}
          confirmLabel="Remove All"
          isDestructive
          isLoading={removingSource === confirmRemove.countryCode}
          onConfirm={() => handleRemoveSource(confirmRemove)}
          onCancel={() => setConfirmRemove(null)}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN HOLIDAYS PAGE
───────────────────────────────────────────── */
export function HolidaysPage({ role = 'Admin' }: { role?: string }) {
  const isAdmin = role === 'Admin';
  const [year, setYear] = useState(CURRENT_YEAR);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  const [addModal, setAddModal] = useState<{ dateStr: string; existing?: Holiday } | null>(null);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [filterSource, setFilterSource] = useState<'all' | 'custom' | 'imported'>('all');
  const [sidebarSelectionMode, setSidebarSelectionMode] = useState(false);
  const [sidebarSelectedIds, setSidebarSelectedIds] = useState<Set<number>>(new Set());
  const [deletingBulk, setDeletingBulk] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState<{ type: 'single' | 'bulk'; id?: number; count?: number } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load from API whenever year changes
  useEffect(() => {
    setLoading(true);
    fetchHolidays(year)
      .then(setHolidays)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [year]);

  const holidaysForYear = holidays;

  const existingDatesSet = new Set(
    holidaysForYear.map((h) => effectiveDate(h, year))
  );

  const sidebarHolidays = [...holidays]
    .filter((h) => {
      const matchSource =
        filterSource === 'all' ? true :
        filterSource === 'custom' ? h.source === 'custom' :
        h.source !== 'custom';
      const matchSearch = !sidebarSearch || h.name.toLowerCase().includes(sidebarSearch.toLowerCase());
      return matchSource && matchSearch;
    })
    .sort((a, b) => effectiveDate(a, year).localeCompare(effectiveDate(b, year)));

  const handleDateClick = useCallback((ds: string) => {
    const existing = holidays.find((h) => effectiveDate(h, year) === ds);
    setAddModal({ dateStr: ds, existing });
  }, [holidays, year]);

  const handleBulkToggle = (ds: string) => {
    setSelectedDates((prev) => {
      const next = new Set(prev);
      next.has(ds) ? next.delete(ds) : next.add(ds);
      return next;
    });
  };

  const handleSaveSingle = async (name: string, repeat: boolean) => {
    if (!addModal) return;
    try {
      setIsSaving(true);
      if (addModal.existing) {
        // Edit — PUT
        setSavingId(addModal.existing.id);
        const updated = await updateHoliday(addModal.existing.id, { name, repeatYearly: repeat });
        setHolidays((prev) => prev.map((h) => h.id === updated.id ? updated : h));
      } else {
        // Create — POST
        const created = await createHoliday({
          date: addModal.dateStr,
          name,
          repeatYearly: repeat,
          source: 'custom',
        });
        setHolidays((prev) => [...prev, created]);
      }
      setAddModal(null);
    } catch (err) {
      console.error('Failed to save holiday:', err);
    } finally {
      setSavingId(null);
      setIsSaving(false);
    }
  };

  const handleDeleteSingle = async (id: number) => {
    try {
      setIsDeleting(true);
      await deleteHoliday(id);
      setHolidays((prev) => prev.filter((h) => h.id !== id));
      setAddModal(null);
      setConfirmDeletion(null);
    } catch (err) {
      console.error('Failed to delete holiday:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveBulk = async (name: string, repeat: boolean) => {
    const toAdd = Array.from(selectedDates)
      .filter((d) => !existingDatesSet.has(d))
      .map((d) => ({ date: d, name, repeatYearly: repeat, source: 'custom' }));
    try {
      setIsSaving(true);
      const created = await bulkCreateHolidays(toAdd);
      setHolidays((prev) => [...prev, ...created]);
      setSelectedDates(new Set());
      setBulkMode(false);
      setShowBulkModal(false);
    } catch (err) {
      console.error('Failed to bulk create holidays:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImported = async (newHols: { date: string; name: string; source: string; countryName?: string }[]) => {
    // If newHols is empty, it might be a removal notification
    if (newHols.length === 0) {
      setLoading(true);
      fetchHolidays(year)
        .then(setHolidays)
        .catch(console.error)
        .finally(() => setLoading(false));
      return;
    }

    try {
      setIsSaving(true);
      const created = await bulkCreateHolidays(
        newHols.map((h) => ({ date: h.date, name: h.name, repeatYearly: false, source: h.source, countryName: h.countryName }))
      );
      setHolidays((prev) => [...prev, ...created]);
      setShowImport(false);
    } catch (err) {
      console.error('Failed to import holidays:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const exitBulk = () => { setBulkMode(false); setSelectedDates(new Set()); };

  const handleSidebarBulkDelete = async () => {
    if (sidebarSelectedIds.size === 0) return;

    setIsDeleting(true);
    try {
      await bulkDeleteHolidays(Array.from(sidebarSelectedIds));
      setHolidays((prev) => prev.filter((h) => !sidebarSelectedIds.has(h.id)));
      setSidebarSelectedIds(new Set());
      setSidebarSelectionMode(false);
      setConfirmDeletion(null);
    } catch (err) {
      console.error('Failed to bulk delete holidays:', err);
      alert('Failed to delete some holidays. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleSidebarSelection = (id: number) => {
    setSidebarSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAllSidebar = () => {
    const allVisibleIds = sidebarHolidays.map(h => h.id);
    setSidebarSelectedIds(new Set(allVisibleIds));
  };

  const importedCount = holidays.filter((h) => h.source !== 'custom').length;
  const customCount   = holidays.filter((h) => h.source === 'custom').length;
  void savingId; // suppress unused warning

  return (
    
     <div className="flex flex-col md:flex-row overflow-hidden" style={{ height: 'calc(100vh - 114px)' }}>
      {/* ════════ MAIN CALENDAR AREA ════════ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0 space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-gray-900 font-semibold" style={{ fontSize: '1.05rem' }}>Holidays</h2>
                <p className="text-gray-400" style={{ fontSize: '0.73rem' }}>
                  {holidaysForYear.length} holiday{holidaysForYear.length !== 1 ? 's' : ''} in {year}
                </p>
              </div>
              <div className="flex items-center gap-0.5 bg-gray-100 rounded-lg px-1 py-1">
                <button
                  onClick={() => setYear((y) => y - 1)}
                  className="p-1.5 rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 text-gray-800 min-w-[3.5rem] text-center font-medium" style={{ fontSize: '0.92rem' }}>
                  {year}
                </span>
                <button
                  onClick={() => setYear((y) => y + 1)}
                  className="p-1.5 rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAdmin && (
                <>
                  <button
                    onClick={() => setShowImport(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
                    style={{ fontSize: '0.82rem' }}
                  >
                    <Globe className="w-4 h-4" />
                    Import Public Holidays
                  </button>
                  <button
                    onClick={() => bulkMode ? exitBulk() : setBulkMode(true)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border transition-colors cursor-pointer ${
                      bulkMode
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                    }`}
                    style={{ fontSize: '0.82rem' }}
                  >
                    <CheckSquare className="w-4 h-4" />
                    {bulkMode ? 'Exit Bulk' : 'Bulk Select'}
                  </button>
                </>
              )}
            </div>
          </div>

          {bulkMode && (
            <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2.5">
              <Info className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <p className="text-indigo-700 flex-1" style={{ fontSize: '0.78rem' }}>
                Click dates to select them.
                {selectedDates.size > 0 && ` ${selectedDates.size} date${selectedDates.size > 1 ? 's' : ''} selected.`}
              </p>
              {selectedDates.size > 0 && (
                <>
                  <button onClick={() => setSelectedDates(new Set())} className="text-indigo-400 hover:text-indigo-600 transition-colors" style={{ fontSize: '0.75rem' }}>
                    Clear
                  </button>
                  <button
                    onClick={() => setShowBulkModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    style={{ fontSize: '0.78rem' }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add {selectedDates.size} as Holiday{selectedDates.size > 1 ? 's' : ''}
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* 12-month grid */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))' }}>
            {loading ? (
              Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-3">
                  <div className="flex justify-center">
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 35 }).map((_, j) => (
                      <Skeleton key={j} className="h-5 w-5 rounded-full mx-auto" />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              Array.from({ length: 12 }, (_, m) => (
                <MiniMonth
                  key={m}
                  year={year}
                  month={m}
                  holidays={holidaysForYear}
                  selectedDates={selectedDates}
                  bulkMode={bulkMode}
                  onDateClick={handleDateClick}
                  onBulkToggle={handleBulkToggle}
                  isAdmin={isAdmin}
                />
              ))
            )}
          </div>

          {/* Legend */}
          <div className="mt-5 flex items-center gap-5 flex-wrap">
            <span className="text-gray-400" style={{ fontSize: '0.72rem' }}>Legend:</span>
            {[
              { label: 'Custom Holiday', color: '#6366f1' },
              { label: 'Imported Holiday', color: '#059669' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full" style={{ background: item.color }} />
                <span className="text-gray-500" style={{ fontSize: '0.7rem' }}>{item.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-indigo-200" />
              <span className="text-gray-500" style={{ fontSize: '0.7rem' }}>Bulk Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-indigo-500" />
              <span className="text-gray-500" style={{ fontSize: '0.7rem' }}>Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* ════════ SIDEBAR ════════ */}
      <div className="w-full md:w-72 bg-white border-t md:border-t-0 md:border-l border-gray-200 flex flex-col flex-shrink-0 h-1/2 md:h-auto">
        <div className="px-4 py-4 border-b border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-800 font-medium" style={{ fontSize: '0.88rem' }}>Holiday List</span>
              <span className="bg-indigo-100 text-indigo-700 rounded-full px-2 py-0.5" style={{ fontSize: '0.68rem' }}>
                {sidebarHolidays.length}
              </span>
            </div>
            <button
              onClick={() => {
                if (!isAdmin) return;
                setSidebarSelectionMode(!sidebarSelectionMode);
                setSidebarSelectedIds(new Set());
              }}
              className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                !isAdmin ? 'text-gray-300 cursor-default' :
                sidebarSelectionMode ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100 cursor-pointer' : 'text-gray-400 hover:text-gray-600 cursor-pointer'
              }`}
            >
              {sidebarSelectionMode ? 'Cancel' : 'Select'}
            </button>
          </div>
          {sidebarSelectionMode && sidebarHolidays.length > 0 && (
            <div className="flex items-center justify-between px-1">
              <button
                onClick={selectAllSidebar}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors cursor-pointer"
                style={{ fontSize: '0.72rem' }}
              >
                Select All
              </button>
              <span className="text-gray-400" style={{ fontSize: '0.68rem' }}>
                {sidebarSelectedIds.size} selected
              </span>
            </div>
          )}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              placeholder="Search holidays…"
              className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              style={{ fontSize: '0.78rem' }}
            />
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {(['all', 'custom', 'imported'] as const).map((src) => (
              <button
                key={src}
                onClick={() => setFilterSource(src)}
                className={`flex-1 py-1.5 rounded-md capitalize transition-colors cursor-pointer ${
                  filterSource === src ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
                style={{ fontSize: '0.72rem', fontWeight: filterSource === src ? 500 : 400 }}
              >
                {src === 'all' ? `All (${holidaysForYear.length})` :
                 src === 'custom' ? `Custom (${customCount})` :
                 `Imported (${importedCount})`}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="divide-y divide-gray-50 px-4 py-2 space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3 pt-4">
                  <Skeleton className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-4 w-1/4 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : sidebarHolidays.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-3 px-4 text-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-400" style={{ fontSize: '0.78rem' }}>
                {sidebarSearch
                  ? 'No holidays match your search.'
                  : 'No holidays yet. Click any date or import from a country.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {sidebarHolidays.map((h) => {
                const dispDate = effectiveDate(h, year);
                return (
                  <div
                    key={h.id}
                    className={`px-4 py-3 transition-colors group ${
                      sidebarSelectedIds.has(h.id) ? 'bg-indigo-50/50' : 'hover:bg-gray-50'
                    } ${isAdmin ? 'cursor-pointer' : 'cursor-default'}`}
                    onClick={() => {
                      if (!isAdmin) return;
                      sidebarSelectionMode && toggleSidebarSelection(h.id);
                      if (!sidebarSelectionMode) handleDateClick(effectiveDate(h, year));
                    }}
                  >
                    <div className="flex items-start gap-2.5">
                      {sidebarSelectionMode ? (
                        <div className="mt-1 flex-shrink-0">
                          {sidebarSelectedIds.has(h.id) ? (
                            <CheckSquare className="w-4 h-4 text-indigo-500" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-300" />
                          )}
                        </div>
                      ) : (
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${getSourceDotClass(h.source)}`} />
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 truncate" style={{ fontSize: '0.8rem' }}>{h.name}</p>
                        <p className="text-gray-400" style={{ fontSize: '0.67rem' }}>{fmtDate(dispDate)}</p>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <span className={`px-1.5 py-0.5 rounded-md ${getSourceBadgeClass(h.source)}`} style={{ fontSize: '0.6rem' }}>
                            {h.source === 'custom' ? 'Custom' : `${h.source}${h.countryName ? ` · ${h.countryName}` : ''}`}
                          </span>
                          {h.repeatYearly && (
                            <span className="flex items-center gap-0.5 text-indigo-500" style={{ fontSize: '0.6rem' }}>
                              <Repeat className="w-2.5 h-2.5" /> Yearly
                            </span>
                          )}
                        </div>
                      </div>
                      {isAdmin && !sidebarSelectionMode && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setConfirmDeletion({ type: 'single', id: h.id }); }}
                          className="p-1.5 text-indigo-600 hover:text-white hover:bg-indigo-600 hover:shadow-md active:scale-95 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100 flex-shrink-0"
                          title="Delete Holiday"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {sidebarSelectionMode && (
          <div className="px-4 py-3 border-t border-gray-100 bg-white">
            <button
              disabled={sidebarSelectedIds.size === 0 || deletingBulk}
              onClick={() => setConfirmDeletion({ type: 'bulk', count: sidebarSelectedIds.size })}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-40 transition-colors shadow-sm font-medium cursor-pointer"
              style={{ fontSize: '0.82rem' }}
            >
              {deletingBulk ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Delete Selected ({sidebarSelectedIds.size})
                </>
              )}
            </button>
          </div>
        )}

        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white rounded-xl p-2.5 border border-gray-100 text-center">
              <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#6366f1' }}>
                {holidays.filter((h) => h.repeatYearly).length}
              </p>
              <p className="text-gray-400" style={{ fontSize: '0.62rem' }}>Repeating</p>
            </div>
            <div className="bg-white rounded-xl p-2.5 border border-gray-100 text-center">
              <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#374151' }}>
                {holidays.filter((h) => !h.repeatYearly).length}
              </p>
              <p className="text-gray-400" style={{ fontSize: '0.62rem' }}>One-time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {addModal && (
        <AddHolidayModal
          dateStr={addModal.dateStr}
          existing={addModal.existing}
          isSaving={isSaving}
          onSave={handleSaveSingle}
          onDelete={addModal.existing ? () => setConfirmDeletion({ type: 'single', id: addModal.existing!.id }) : undefined}
          onClose={() => setAddModal(null)}
        />
      )}
      {showBulkModal && (
        <BulkAddModal
          dates={Array.from(selectedDates).sort()}
          isSaving={isSaving}
          onSave={handleSaveBulk}
          onClose={() => setShowBulkModal(false)}
        />
      )}
      {showImport && (
        <CountryPickerModal
          year={year}
          existingDates={existingDatesSet}
          isSaving={isSaving}
          onClose={() => setShowImport(false)}
          onImported={handleImported}
        />
      )}
      {confirmDeletion && (
        <ConfirmModal
          title={confirmDeletion.type === 'single' ? 'Delete Holiday?' : 'Delete Selected?'}
          message={confirmDeletion.type === 'single' 
            ? 'Are you sure you want to delete this holiday? This action cannot be undone.'
            : `Are you sure you want to delete ${confirmDeletion.count ?? sidebarSelectedIds.size} holiday(s)? This action cannot be undone.`
          }
          confirmLabel="Delete"
          isDestructive
          isLoading={isDeleting}
          onConfirm={() => confirmDeletion.type === 'single' ? handleDeleteSingle(confirmDeletion.id!) : handleSidebarBulkDelete()}
          onCancel={() => setConfirmDeletion(null)}
        />
      )}
    </div>
  );
}

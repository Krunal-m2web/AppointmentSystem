import { useState, useEffect } from 'react';
import { CreditCard, Save, DollarSign, Search, Check, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { CURRENCIES, searchCurrencies, getCurrencyByCode } from '../../utils/currency';
import { getDefaultCurrency, updateDefaultCurrency, getPaymentSettings, updatePaymentSettings } from '../../services/settingsService';

import { PaymentSettingsSkeleton } from './settings/SettingsSkeletons';

export function PaymentSettings() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [currencySearch, setCurrencySearch] = useState('');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currencyLoading, setCurrencyLoading] = useState(true);

  const [paymentOptions, setPaymentOptions] = useState({
    showPayNow: true,
    showPayLater: true,
  });
  const [enabledPaymentMethods, setEnabledPaymentMethods] = useState({
    'Credit Card': true,
    'Debit Card': true,
    'PayPal': true,
    'Bank Transfer': false,
  });

  const paymentMethods = ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer'];

  // Fetch current currency and payment settings from backend when component loads
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setCurrencyLoading(true);
        
        // Load currency
        const currency = await getDefaultCurrency();
        setSelectedCurrency(currency);
        
        // Load payment settings
        const paymentSettingsData = await getPaymentSettings();
        
        // Convert array to object for enabled payment methods
        const methodsObj: Record<string, boolean> = {};
        paymentMethods.forEach(method => {
          methodsObj[method] = paymentSettingsData.enabledPaymentMethods.includes(method);
        });
        setEnabledPaymentMethods(methodsObj as typeof enabledPaymentMethods);
        
        // Set payment options
        setPaymentOptions({
          showPayNow: paymentSettingsData.showPayNow,
          showPayLater: paymentSettingsData.showPayLater,
        });
      } catch (error) {
        console.error('Failed to load settings:', error);
        // Keep defaults if fetch fails
      } finally {
        setCurrencyLoading(false);
      }
    };
    loadSettings();
  }, []);

  const togglePaymentMethod = (method: string) => {
    setEnabledPaymentMethods({
      ...enabledPaymentMethods,
      [method]: !enabledPaymentMethods[method as keyof typeof enabledPaymentMethods],
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Save currency to backend
      await updateDefaultCurrency(selectedCurrency);
      
      // Save payment settings to backend
      const enabledMethods = Object.keys(enabledPaymentMethods).filter(
        method => enabledPaymentMethods[method as keyof typeof enabledPaymentMethods]
      );
      
      await updatePaymentSettings({
        enabledPaymentMethods: enabledMethods,
        showPayNow: paymentOptions.showPayNow,
        showPayLater: paymentOptions.showPayLater,
      });
      
      toast.success('Payment settings saved successfully!');
    } catch (error: any) {
      console.error('Failed to save payment settings:', error);
      toast.error(`Failed to save payment settings: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredCurrencies = searchCurrencies(currencySearch);
  const currentCurrency = getCurrencyByCode(selectedCurrency);

  const handleCurrencySelect = (code: string) => {
    setSelectedCurrency(code);
    setShowCurrencyDropdown(false);
    setCurrencySearch('');
  };

  if (currencyLoading) {
    return <PaymentSettingsSkeleton />;
  }

  return (
    <div className="bg-slate-50/50 rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="p-8 bg-white border-b border-slate-200">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-indigo-600" />
          Payment Configuration
        </h2>
        <p className="text-[15px] text-slate-500 mt-2 leading-relaxed max-w-2xl">
          Manage accepted currencies, determine how customers can pay, and enable preferred payment processing methods.
        </p>
      </div>

      <div className="p-8 space-y-12">
        {/* Base Currency Section */}
        <section>
          <div className="mb-5">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-slate-400" />
              Base Currency
            </h3>
            <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed">This currency globally applies to all your services, invoices, and transactions.</p>
          </div>
          
          <div className="relative max-w-md">
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="w-full px-5 py-4 bg-white border border-slate-300 rounded-xl hover:border-indigo-300 focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none flex items-center justify-between shadow-sm group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-xl font-bold text-indigo-600 shadow-inner border border-slate-200">
                  {currentCurrency?.symbol}
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-bold text-slate-900 leading-tight tracking-tight">{currentCurrency?.code}</p>
                  <p className="text-[13px] text-slate-500 mt-0.5">{currentCurrency?.name}</p>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-all ${showCurrencyDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showCurrencyDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 origin-top">
                <div className="p-4 bg-slate-50/80 border-b border-slate-200">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search currency..."
                      value={currencySearch}
                      onChange={(e) => setCurrencySearch(e.target.value)}
                      className="w-full pl-11 pr-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-none text-sm text-slate-900 shadow-sm"
                      autoFocus
                    />
                  </div>
                </div>
                <div className="overflow-y-auto max-h-72 custom-scrollbar">
                  {filteredCurrencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => handleCurrencySelect(currency.code)}
                      className={`w-full px-5 py-3.5 flex items-center gap-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 ${
                        selectedCurrency === currency.code ? 'bg-indigo-50 hover:bg-indigo-50' : ''
                      }`}
                    >
                      <span className="text-lg font-medium w-8 text-center text-slate-700">{currency.symbol}</span>
                      <div className="flex-1 text-left">
                        <p className={`text-[15px] font-semibold tracking-tight ${selectedCurrency === currency.code ? 'text-indigo-700' : 'text-slate-900'}`}>{currency.code}</p>
                        <p className="text-[13px] text-slate-500">{currency.name}</p>
                      </div>
                      {selectedCurrency === currency.code && (
                        <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                          <Check className="w-3 h-3 text-white stroke-[2.5]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Checkout Policies */}
        <section>
          <div className="mb-5">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-slate-400" />
              Checkout Policies
            </h3>
            <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed">Dictate whether customers are required to pay online upfront or allowed to defer payment until arrival.</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
            {/* Pay Now */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-slate-50/50 transition-colors gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-50/50 border border-green-100/50 text-green-600 shrink-0 mt-1 sm:mt-0">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-slate-900 tracking-tight">Require Upfront Online Payment</h4>
                  <p className="text-[13px] text-slate-500 mt-0.5 leading-snug">Customers must complete transactions securely via the booking portal</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-14 sm:ml-0">
                <input
                  type="checkbox"
                  checked={paymentOptions.showPayNow}
                  onChange={(e) => {
                    const v = e.target.checked;
                    if (!v && !paymentOptions.showPayLater) {
                      toast.error('You must leave at least one payment option enabled.');
                      return;
                    }
                    setPaymentOptions({ ...paymentOptions, showPayNow: v });
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[20px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
              </label>
            </div>

            {/* Pay Later */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-slate-50/50 transition-colors gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 shrink-0 mt-1 sm:mt-0">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-slate-900 tracking-tight">Allow Deferred Payment (In-Person)</h4>
                  <p className="text-[13px] text-slate-500 mt-0.5 leading-snug">Customers can bypass online checkout and pay directly upon arrival</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-14 sm:ml-0">
                <input
                  type="checkbox"
                  checked={paymentOptions.showPayLater}
                  onChange={(e) => {
                    const v = e.target.checked;
                    if (!v && !paymentOptions.showPayNow) {
                      toast.error('You must leave at least one payment option enabled.');
                      return;
                    }
                    setPaymentOptions({ ...paymentOptions, showPayLater: v });
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[20px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Accepted Payment Methods */}
        <section>
          <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-slate-400" />
                Accepted Payment Methods
              </h3>
              <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed">Select the payment gateways and methods actively available during checkout.</p>
            </div>
            {/* Visual indicating these apply to 'Pay Now' */}
            {paymentOptions.showPayNow && (
              <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200 w-max shrink-0">
                Active for Online Checkout
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {paymentMethods.map((method) => {
              const isEnabled = enabledPaymentMethods[method as keyof typeof enabledPaymentMethods];
              return (
                <div
                  key={method}
                  className={`flex flex-col p-5 rounded-xl border transition-all cursor-pointer group select-none relative overflow-hidden ${
                    isEnabled 
                      ? 'border-indigo-600 bg-white shadow-sm ring-1 ring-indigo-600' 
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                  onClick={() => togglePaymentMethod(method)}
                >
                  {/* Subtle Background Glow for enabled */}
                  {isEnabled && <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-50 rounded-full mix-blend-multiply blur-xl opacity-70"></div>}
                  
                  <div className="flex items-center justify-between mb-3 z-10">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                      isEnabled ? 'bg-indigo-600 shadow-sm' : 'bg-white border border-slate-300'
                    }`}>
                      {isEnabled && <Check className="w-4 h-4 text-white stroke-[3]" />}
                    </div>
                  </div>
                  <p className={`text-[15px] font-semibold tracking-tight z-10 ${isEnabled ? 'text-slate-900' : 'text-slate-600'}`}>
                    {method}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

      </div>

      {/* Footer / Save Action */}
      <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
        <button
          onClick={handleSave}
          disabled={loading || currencyLoading}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Changes
        </button>
      </div>
    </div>
  );
}

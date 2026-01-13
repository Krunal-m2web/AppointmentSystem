import { useState, useEffect } from 'react';
import { CreditCard, Save, DollarSign, Search, Check, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { CURRENCIES, searchCurrencies, getCurrencyByCode } from '../../utils/currency';
import { getDefaultCurrency, updateDefaultCurrency, getPaymentSettings, updatePaymentSettings } from '../../services/settingsService';

export function PaymentSettings() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [currencySearch, setCurrencySearch] = useState('');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currencyLoading, setCurrencyLoading] = useState(true);

  const [paymentOptions, setPaymentOptions] = useState({
    showPayNow: true,
    showPayLater: true,
    enablePaymentSection: true,
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
          enablePaymentSection: paymentSettingsData.showPayNow || paymentSettingsData.showPayLater,
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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-indigo-600" />
            Payment Configuration
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-normal">Manage currency and checkout options for your customers</p>
        </div>

        <div className="p-8 space-y-10">
          {/* Change Currency Section */}
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Base Currency</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">This currency will be applied to all your services</p>
              </div>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="w-full max-w-md px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl font-bold text-indigo-600 shadow-sm border border-gray-100">
                    {currentCurrency?.symbol}
                  </div>
                  <div className="text-left">
                    <p className="text-base font-bold text-gray-900 leading-tight">{currentCurrency?.code}</p>
                    <p className="text-sm text-gray-500 font-medium">{currentCurrency?.name}</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-all ${showCurrencyDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showCurrencyDropdown && (
                <div className="absolute z-10 w-full max-w-md mt-3 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 origin-top">
                  <div className="p-4 bg-gray-50/50 border-b border-gray-100">
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search currency..."
                        value={currencySearch}
                        onChange={(e) => setCurrencySearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none text-sm"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto max-h-72 custom-scrollbar">
                    {filteredCurrencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => handleCurrencySelect(currency.code)}
                        className={`w-full px-5 py-3.5 flex items-center gap-4 hover:bg-indigo-50/50 transition-colors border-b border-gray-50 last:border-0 ${
                          selectedCurrency === currency.code ? 'bg-indigo-50' : ''
                        }`}
                      >
                        <span className="text-xl w-8 text-center">{currency.symbol}</span>
                        <div className="flex-1 text-left">
                          <p className={`text-sm font-semibold ${selectedCurrency === currency.code ? 'text-indigo-600' : 'text-gray-900'}`}>{currency.code}</p>
                          <p className="text-xs text-gray-500 font-medium">{currency.name}</p>
                        </div>
                        {selectedCurrency === currency.code && (
                          <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white stroke-[2.5]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Payment Options */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-6">Payment Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  id: 'enablePaymentSection', 
                  title: 'Enable Checkout', 
                  desc: 'Show payment step in booking flow', 
                  checked: paymentOptions.enablePaymentSection, 
                  onChange: (v: boolean) => setPaymentOptions({ ...paymentOptions, enablePaymentSection: v }),
                  disabled: false 
                },
                { 
                  id: 'showPayNow', 
                  title: 'Pay Now', 
                  desc: 'Allow immediate online payment', 
                  checked: paymentOptions.showPayNow, 
                  onChange: (v: boolean) => setPaymentOptions({ ...paymentOptions, showPayNow: v }),
                  disabled: !paymentOptions.enablePaymentSection 
                },
                { 
                  id: 'showPayLater', 
                  title: 'Pay Later', 
                  desc: 'In-person payment at arrival', 
                  checked: paymentOptions.showPayLater, 
                  onChange: (v: boolean) => setPaymentOptions({ ...paymentOptions, showPayLater: v }),
                  disabled: !paymentOptions.enablePaymentSection 
                }
              ].map((opt) => (
                <div key={opt.id} className={`flex flex-col justify-between p-5 rounded-2xl border-2 transition-all duration-300 ${opt.checked ? 'border-indigo-100 bg-indigo-50/20' : 'border-gray-50 bg-gray-50/30'} ${opt.disabled ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                  <div className="mb-4">
                    <p className="font-bold text-gray-900">{opt.title}</p>
                    <p className="text-xs text-gray-500 mt-1 font-medium leading-relaxed">{opt.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer self-end">
                    <input
                      type="checkbox"
                      checked={opt.checked}
                      onChange={(e) => opt.onChange(e.target.checked)}
                      className="sr-only peer"
                      disabled={opt.disabled}
                    />
                    <div className="w-12 h-6.5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[22px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Payment Methods */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-6">Accepted Payment Methods</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {paymentMethods.map((method) => {
                const isEnabled = enabledPaymentMethods[method as keyof typeof enabledPaymentMethods];
                return (
                  <div
                    key={method}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer group ${isEnabled ? 'border-indigo-600 bg-white shadow-md' : 'border-gray-100 bg-gray-50/50 hover:border-gray-200'}`}
                    onClick={() => togglePaymentMethod(method)}
                  >
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isEnabled ? 'bg-indigo-600 border-indigo-600 shadow-sm shadow-indigo-200' : 'bg-white border-gray-200'}`}>
                      {isEnabled && <Check className="w-4 h-4 text-white stroke-[3]" />}
                    </div>
                    <p className={`text-sm font-bold ${isEnabled ? 'text-gray-900' : 'text-gray-500'}`}>{method}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer with Save Button */}
        <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading || currencyLoading}
            className="flex items-center gap-3 px-10 py-3.5 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 hover:shadow-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] uppercase tracking-wider"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {loading ? 'Processing...' : 'Sync Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}

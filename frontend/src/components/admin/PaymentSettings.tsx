import { useState, useEffect } from 'react';
import { CreditCard, Save, DollarSign, Search } from 'lucide-react';
import { CURRENCIES, searchCurrencies, getCurrencyByCode } from '../../utils/currency';
import { getDefaultCurrency, updateDefaultCurrency } from '../../services/settingsService';

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

  // Fetch current currency from backend when component loads
  useEffect(() => {
    const loadCurrency = async () => {
      try {
        setCurrencyLoading(true);
        const currency = await getDefaultCurrency();
        setSelectedCurrency(currency);
      } catch (error) {
        console.error('Failed to load currency:', error);
        // Keep default USD if fetch fails
      } finally {
        setCurrencyLoading(false);
      }
    };
    loadCurrency();
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
      const message = await updateDefaultCurrency(selectedCurrency);
      
      console.log('Saving payment settings:', {
        selectedCurrency,
        paymentOptions,
        enabledPaymentMethods,
      });
      
      alert(message || 'Payment settings saved successfully!');
    } catch (error: any) {
      console.error('Failed to save currency:', error);
      alert(`Failed to save currency: ${error.message || 'Unknown error'}`);
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
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Payment Settings</h1>
        <p className="text-gray-600 mt-1">Configure payment options and methods</p>
      </div>

      <div className="space-y-6">
        {/* Change Currency Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <DollarSign className="w-6 h-6" />
              Change Currency
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Select the currency to display for all services. Prices will be manually set per service.
            </p>
          </div>
          <div className="p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Currency
            </label>
            <div className="relative max-w-md">
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currentCurrency?.symbol}</span>
                  <div className="text-left">
                    <p className="font-medium">{currentCurrency?.code}</p>
                    <p className="text-sm text-gray-600">{currentCurrency?.name}</p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showCurrencyDropdown && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-hidden">
                  <div className="p-3 border-b border-gray-200 sticky top-0 bg-white">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by name, code, or country..."
                        value={currencySearch}
                        onChange={(e) => setCurrencySearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto max-h-80">
                    {filteredCurrencies.length > 0 ? (
                      filteredCurrencies.map((currency) => (
                        <button
                          key={currency.code}
                          onClick={() => handleCurrencySelect(currency.code)}
                          className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${selectedCurrency === currency.code ? 'bg-indigo-50' : ''
                            }`}
                        >
                          <span className="text-2xl">{currency.symbol}</span>
                          <div className="flex-1 text-left">
                            <p className="font-medium">{currency.code}</p>
                            <p className="text-sm text-gray-600">{currency.name}</p>
                            <p className="text-xs text-gray-500">{currency.country}</p>
                          </div>
                          {selectedCurrency === currency.code && (
                            <svg
                              className="w-5 h-5 text-indigo-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-gray-500">
                        No currencies found matching "{currencySearch}"
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              This currency will be used across all services. You can manually set prices for each service in the Service Pricing page.
            </p>
          </div>
        </div>

        {/* Payment Options */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              Payment Options
            </h2>
            <p className="text-sm text-gray-600 mt-1">Control payment timing and visibility</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Enable Payment Section</p>
                <p className="text-sm text-gray-600 mt-1">
                  Show/hide the entire payment step in booking flow
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentOptions.enablePaymentSection}
                  onChange={(e) =>
                    setPaymentOptions({ ...paymentOptions, enablePaymentSection: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Show "Pay Now" Option</p>
                <p className="text-sm text-gray-600 mt-1">
                  Allow users to pay immediately during booking
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentOptions.showPayNow}
                  onChange={(e) =>
                    setPaymentOptions({ ...paymentOptions, showPayNow: e.target.checked })
                  }
                  className="sr-only peer"
                  disabled={!paymentOptions.enablePaymentSection}
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 disabled:opacity-50"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Show "Pay Later" Option</p>
                <p className="text-sm text-gray-600 mt-1">
                  Allow users to pay at the time of appointment (In Person only)
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentOptions.showPayLater}
                  onChange={(e) =>
                    setPaymentOptions({ ...paymentOptions, showPayLater: e.target.checked })
                  }
                  className="sr-only peer"
                  disabled={!paymentOptions.enablePaymentSection}
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 disabled:opacity-50"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Payment Methods</h2>
            <p className="text-sm text-gray-600 mt-1">Select which payment methods are available</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => togglePaymentMethod(method)}
                >
                  <input
                    type="checkbox"
                    checked={enabledPaymentMethods[method as keyof typeof enabledPaymentMethods]}
                    onChange={() => togglePaymentMethod(method)}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{method}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Rules */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Payment Rules</h2>
            <p className="text-sm text-gray-600 mt-1">Current payment behavior</p>
          </div>
          <div className="p-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 text-sm">
              <p className="flex items-start gap-2">
                <span className="text-blue-600">ℹ️</span>
                <span>
                  <strong>Phone Call & Zoom:</strong> "Pay Later" option is automatically hidden.
                  Users must select "Pay Now" and choose a payment method.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-600">ℹ️</span>
                <span>
                  <strong>In Person:</strong> Both "Pay Now" and "Pay Later" options are available
                  (if enabled in settings above).
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading || currencyLoading}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              loading || currencyLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white`}
          >
            <Save className="w-5 h-5" />
            {loading ? 'Saving...' : 'Save Payment Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}

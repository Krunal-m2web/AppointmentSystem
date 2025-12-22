import { useState, useEffect } from 'react';
import { DollarSign, Save, Trash2, Edit3, X, AlertCircle, CheckCircle } from 'lucide-react';
import { getDefaultCurrency } from '../../services/settingsService';
import { 
  fetchServicesPricing, 
  upsertServicePrice, 
  deleteServicePrice,
  ServicePricingDto 
} from '../../services/servicePricing';
import { getCompanyIdFromToken, getToken } from '../../utils/auth';
import { getCurrencySymbol } from '../../utils/currency';

export function ServicePricing() {
  // State
  const [services, setServices] = useState<ServicePricingDto[]>([]);
  const [displayCurrency, setDisplayCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Editing state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState('');

  // Fetch services on mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get default currency
      const currency = await getDefaultCurrency();
      setDisplayCurrency(currency);
      
      // Get company ID from token
      const token = getToken();
      if (!token) {
        setError('Not authenticated. Please log in again.');
        return;
      }
      
      const companyId = getCompanyIdFromToken(token);
      if (!companyId) {
        setError('Company ID not found. Please log in again.');
        return;
      }
      
      // Fetch services with pricing
      const data = await fetchServicesPricing(companyId);
      setServices(data);
    } catch (err) {
      setError('Failed to load services. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (service: ServicePricingDto) => {
    setEditingId(service.id);
    setEditPrice(service.amount?.toString() || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditPrice('');
  };

  const handleSavePrice = async (serviceId: number) => {
    const priceValue = parseFloat(editPrice);
    if (isNaN(priceValue) || priceValue < 0) {
      setError('Please enter a valid price.');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      
      await upsertServicePrice(serviceId, {
        currency: displayCurrency,
        amount: priceValue
      });
      
      setServices(prev => prev.map(s => 
        s.id === serviceId 
          ? { ...s, amount: priceValue, priceMissing: false }
          : s
      ));
      
      setEditingId(null);
      setEditPrice('');
      setSuccessMessage('Price updated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save price.');
    } finally {
      setSaving(false);
    }
  };

  const handleRemovePrice = async (serviceId: number) => {
    if (!confirm('Remove price? This service will not appear on the booking page until you add a price.')) return;
    
    try {
      setSaving(true);
      setError(null);
      await deleteServicePrice(serviceId, displayCurrency);
      
      setServices(prev => prev.map(s => 
        s.id === serviceId 
          ? { ...s, amount: null, priceMissing: true }
          : s
      ));
      
      setSuccessMessage('Price removed! Service hidden from booking page.');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to remove price.');
    } finally {
      setSaving(false);
    }
  };

  const currencySymbol = getCurrencySymbol(displayCurrency);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600">Loading services...</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Service Pricing</h1>
        <p className="text-gray-600 mt-1">Configure service prices in {displayCurrency}</p>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          {error}
          <button onClick={() => setError(null)} className="ml-auto">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
          <CheckCircle className="w-5 h-5" />
          {successMessage}
        </div>
      )}

      <div className="space-y-6">
        {/* Service Pricing Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <p className="w-4 h-7">{currencySymbol}</p>
                 Service Pricing 
             
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Set prices for each service. Services without prices won't appear on the booking page.
            </p>
          </div>
          <div className="p-6">
            {services.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No services found. Add services in Manage Services first.
              </p>
            ) : (
              <div className="space-y-3">
                {services.map((service) => (
                  <div 
                    key={service.id} 
                    className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg ${
                      service.priceMissing ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{service.name}</p>
                      {service.description && (
                        <p className="text-sm text-gray-500">{service.description}</p>
                      )}
                      <p className="text-xs text-gray-400">Duration: {service.serviceDuration} min</p>
                    </div>
                    
                    {editingId === service.id ? (
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <span className="text-gray-600">{currencySymbol}</span>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-full sm:w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSavePrice(service.id)}
                          disabled={saving}
                          className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        {service.priceMissing ? (
                          <span className="text-yellow-600 font-medium">No price set</span>
                        ) : (
                          <span className="text-lg font-semibold text-indigo-600">
                            {currencySymbol}{service.amount?.toFixed(2)}
                          </span>
                        )}
                        <button
                          onClick={() => handleStartEdit(service)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Edit price"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {!service.priceMissing && (
                          <button
                            onClick={() => handleRemovePrice(service.id)}
                            disabled={saving}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                            title="Remove price"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>How it works:</strong> Services are created in Manage Services with a base price. 
            Here you can override prices for the selected currency. Only services with prices set 
            in the current currency will appear on the customer booking page.
          </p>
        </div>
      </div>
    </div>
  );
}
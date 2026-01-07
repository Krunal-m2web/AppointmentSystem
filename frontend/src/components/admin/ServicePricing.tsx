import { useState, useEffect } from 'react';
import { Save, Trash2, Edit3, X, AlertCircle, CheckCircle, Search, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
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
  
  // Pagination & Search State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  
  // Editing state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState('');

  // Fetch services on mount
  useEffect(() => {
     loadDefaultCurrency();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadServices();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, searchQuery]);

  const loadDefaultCurrency = async () => {
    try {
        const currency = await getDefaultCurrency();
        setDisplayCurrency(currency);
    } catch (err) {
        console.error("Failed to load default currency", err);
    }
  };

  const loadServices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = getToken();
      if (!token) {
        setError('Not authenticated. Please log in again.');
        setLoading(false);
        return;
      }
      
      const companyId = getCompanyIdFromToken(token);
      if (!companyId) {
        setError('Company ID not found. Please log in again.');
        setLoading(false);
        return;
      }
      
      const data = await fetchServicesPricing({
        companyId,
        page: currentPage,
        pageSize: itemsPerPage,
        searchTerm: searchQuery
      });
      
      // Handle potential race condition or stale backend (which might return an array)
      if (Array.isArray(data)) {
          // Client-side fallback: Filter and Paginate manually
          let filtered = data;
          if (searchQuery) {
              const lowerQuery = searchQuery.toLowerCase();
              filtered = data.filter(s => 
                  s.name.toLowerCase().includes(lowerQuery) || 
                  (s.description && s.description.toLowerCase().includes(lowerQuery))
              );
          }
          
          const total = filtered.length;
          const start = (currentPage - 1) * itemsPerPage;
          const paginated = filtered.slice(start, start + itemsPerPage);
          
          setServices(paginated);
          setTotalItems(total);
          setTotalPages(Math.ceil(total / itemsPerPage));
      } else {
          setServices(data.items || []);
          setTotalItems(data.totalCount || 0);
          setTotalPages(data.totalPages || 1);
      }
    } catch (err: any) {
      setError('Failed to load services. Please try again.');
      setServices([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
        if(currentPage !== 1) setCurrentPage(1); 
        else loadServices();
    }, 500); 
    return () => clearTimeout(timeoutId);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

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

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-[300px]">
                <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search services..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
            </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Service Pricing Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-bold text-gray-700">
                  {currencySymbol}
              </span>
                 Service Pricing 
             
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Set prices for each service. Services without prices won't appear on the booking page.
            </p>
          </div>
          <div className="p-6">
            {loading ? (
                <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-2" />
                    Loading services...
                </div>
            ) : services?.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                {searchQuery ? 'No services found matching your search.' : 'No services found. Add services in Manage Services first.'}
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
            
            {/* Pagination Controls */}
            {!loading && services.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">
                            Showing <span className="font-medium">{totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="font-medium">{totalItems}</span> results
                        </span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="ml-4 text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value={10}>10 per page</option>
                            <option value={20}>20 per page</option>
                            <option value={50}>50 per page</option>
                        </select>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1 || loading}
                            className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm text-gray-700">
                            Page {currentPage} of {totalPages || 1}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0 || loading}
                            className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
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
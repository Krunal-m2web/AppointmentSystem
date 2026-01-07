import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Clock, Search, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { fetchServices, createService, updateService, deleteService } from '../../services/serviceApi';
import { Service } from '../../types/types';
import { getToken, getCompanyIdFromToken, getRoleFromToken } from '../../utils/auth';
import { getDefaultCurrency } from '../../services/settingsService';
import { getCurrencySymbol } from '../../utils/currency';

export function ManageServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState<Partial<Service>>({});
  const [loading, setLoading] = useState(false);
  const [defaultCurrency, setDefaultCurrency] = useState('USD');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Pagination & Search State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!editingService.name?.trim()) {
      errors.name = 'Service name is required';
    } else if (editingService.name.trim().length < 3) {
      errors.name = 'Service name must be at least 3 characters';
    }

    if (editingService.price === undefined || editingService.price === null) {
      errors.price = 'Price is required';
    } else if (editingService.price < 0) {
      errors.price = 'Price cannot be negative';
    }

    if (!editingService.serviceDuration) {
      errors.serviceDuration = 'Duration is required';
    } else if (editingService.serviceDuration < 5) {
      errors.serviceDuration = 'Minimum duration is 5 minutes';
    }

    if (editingService.description && editingService.description.length > 500) {
      errors.description = 'Description cannot exceed 500 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    loadDefaultCurrency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadServices();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, searchQuery]);

  const loadDefaultCurrency = async () => {
    const currency = await getDefaultCurrency();
    setDefaultCurrency(currency);
  };

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await fetchServices({
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
    } catch (err) {
      console.error(err);
      setServices([]); // Ensure services is an array on error
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
        if(currentPage !== 1) setCurrentPage(1); // Reset to page 1 on search change if not already
        else loadServices();
    }, 500); 
    return () => clearTimeout(timeoutId);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);


  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditingService({
      name: '',
      description: '',
      price: 0,
      serviceDuration: 30,
      isActive: true,
      currency: defaultCurrency // Use the default currency
    });
    setFormErrors({});
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const companyId = getCompanyIdFromToken(getToken() || "");
      if (!companyId) throw new Error("Company ID not found");
      
      const servicePayload = { 
        ...editingService, 
        companyId,
        currency: defaultCurrency // Ensure currency is set
      };

      if (editingService.id) {
        await updateService(editingService.id, servicePayload);
      } else {
        await createService(servicePayload);
      }
      setIsEditing(false);
      setEditingService({});
      setFormErrors({});
      loadServices();
    } catch (err: any) {
      if (err.message?.includes("Service name already exists")) {
        setFormErrors({ name: "Service name already exists in this company" });
      } else {
        alert(err.message || "Failed to save service");
        console.error(err);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this service?")) return;
    try {
      await deleteService(id);
      loadServices();
    } catch (err) {
      alert("Failed to delete service. It may be in use.");
      console.error(err);
    }
  };

  const currencySymbol = getCurrencySymbol(defaultCurrency);

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Manage Services</h1>
           <p className="text-gray-600 mt-1">Configure your services (prices in {defaultCurrency})</p>
        </div>
        {/* Add Button - Restricted */}
        {!isEditing && !(getRoleFromToken(getToken() || '') === 'Staff') && (
            <button 
                onClick={handleAddNew}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Service
            </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {editingService.id ? 'Edit Service' : 'New Service'}
            </h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
              <input
                type="text"
                value={editingService.name || ''}
                onChange={e => {
                  setEditingService({...editingService, name: e.target.value});
                  if (formErrors.name) {
                    const newErrors = { ...formErrors };
                    delete newErrors.name;
                    setFormErrors(newErrors);
                  }
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                  formErrors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.name && (
                <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={editingService.description || ''}
                onChange={e => {
                  setEditingService({...editingService, description: e.target.value});
                  if (formErrors.description) {
                    const newErrors = { ...formErrors };
                    delete newErrors.description;
                    setFormErrors(newErrors);
                  }
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 h-24 ${
                  formErrors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.description && (
                <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Price ({currencySymbol})</label>
                 <div className="relative">
                   <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">{currencySymbol}</span>
                   <input
                     type="number"
                     min="0"
                     step="1"
                     value={editingService.price ?? ''}
                     onChange={e => {
                       setEditingService({...editingService, price: e.target.value === '' ? undefined : parseFloat(e.target.value)});
                       if (formErrors.price) {
                         const newErrors = { ...formErrors };
                         delete newErrors.price;
                         setFormErrors(newErrors);
                       }
                     }}
                     className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                       formErrors.price ? 'border-red-500' : 'border-gray-300'
                     }`}
                   />
                 </div>
                 {formErrors.price && (
                   <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                 <div className="relative">
                   <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                   <input
                     type="number"
                     min="5"
                     step="5"
                     value={editingService.serviceDuration ?? ''}
                     onChange={e => {
                       setEditingService({...editingService, serviceDuration: e.target.value === '' ? undefined : parseInt(e.target.value)});
                       if (formErrors.serviceDuration) {
                         const newErrors = { ...formErrors };
                         delete newErrors.serviceDuration;
                         setFormErrors(newErrors);
                       }
                     }}
                     className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                       formErrors.serviceDuration ? 'border-red-500' : 'border-gray-300'
                     }`}
                   />
                 </div>
                 {formErrors.serviceDuration && (
                   <p className="text-red-500 text-xs mt-1">{formErrors.serviceDuration}</p>
                 )}
               </div>
            </div>
            
            <div className="flex gap-4 pt-4">
                <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Save Service
                </button>
            </div>
          </form>
        </div>
      ) : (
        <>
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-[300px]">
                        <div className="relative">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search services by name or description..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow">
            {loading ? (
                <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-2" />
                    Loading services...
                </div>
            ) : services?.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                    {searchQuery ? 'No services found matching your search.' : 'No services found. Add one to get started.'}
                </div>
            ) : (
                <>
                    <div className="divide-y divide-gray-200">
                        {services.map(service => (
                        <div key={service.id} className="p-6 flex items-start justify-between hover:bg-gray-50 transition-colors">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                                <p className="text-gray-600 mt-1">{service.description}</p>
                                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" /> {service.serviceDuration} min
                                    </span>
                                    <span className="flex items-center gap-1 font-medium text-indigo-600">
                                    {currencySymbol}{service.price}
                                    </span>
                                </div>
                            </div>
                            {/* Edit/Delete Actions - Restricted */}
                            {!(getRoleFromToken(getToken() || '') === 'Staff') && (
                              <div className="flex gap-2">
                                  <button 
                                      onClick={() => handleEdit(service)}
                                      className="p-2 text-gray-600 hover:bg-white hover:shadow rounded-lg transition-all"
                                  >
                                      <Edit2 className="w-5 h-5" />
                                  </button>
                                  <button 
                                      onClick={() => handleDelete(service.id)}
                                      className="p-2 text-red-600 hover:bg-white hover:shadow rounded-lg transition-all"
                                  >
                                      <Trash2 className="w-5 h-5" />
                                  </button>
                              </div>
                            )}
                        </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
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
                </>
            )}
            </div>
        </>
      )}
    </div>
  );
}

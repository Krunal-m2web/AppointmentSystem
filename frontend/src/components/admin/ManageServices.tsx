import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Clock, Search, ChevronLeft, ChevronRight, Loader2, DollarSign, Briefcase, FileText } from 'lucide-react';
import { fetchServices, createService, updateService, deleteService, bulkDeleteServices } from '../../services/serviceApi';
import { Service } from '../../types/types';
import { toast } from 'sonner';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { getToken, getCompanyIdFromToken, getRoleFromToken } from '../../utils/auth';
import { getDefaultCurrency } from '../../services/settingsService';
import { getCurrencySymbol, formatPrice } from '../../utils/currency';
import { Skeleton } from '../ui/skeleton';

export function ManageServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState<Partial<Service>>({});
  const [loading, setLoading] = useState(true);
  const [defaultCurrency, setDefaultCurrency] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pagination & Search State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [deleteServiceId, setDeleteServiceId] = useState<number | null>(null);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);

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
    } else if (editingService.serviceDuration < 1) {
      errors.serviceDuration = 'Minimum duration is 1 minute';
    }

    if (editingService.description && editingService.description.length > 500) {
      errors.description = 'Description cannot exceed 500 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const token = getToken();
        const companyId = token ? getCompanyIdFromToken(token) : undefined;
        // Fetch currency and services in parallel
        const [currency, data] = await Promise.all([
          getDefaultCurrency(companyId),
          fetchServices({
            page: 1,
            pageSize: itemsPerPage,
            searchTerm: '',
          }).catch(() => [])
        ]);
        const resolvedCurrency = currency || 'USD';
        setDefaultCurrency(resolvedCurrency);

        // Handle potential race condition or stale backend (which might return an array)
        if (Array.isArray(data)) {
            setServices(data);
            setTotalItems(data.length);
            setTotalPages(Math.ceil(data.length / itemsPerPage));
        } else {
            setServices(data.items || []);
            setTotalItems(data.totalCount || 0);
            setTotalPages(data.totalPages || 1);
        }
      } catch (err) {
        console.error(err);
        setDefaultCurrency('USD');
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Only reload services when pagination or search changes (after initial load)
    if (!defaultCurrency) return;
    loadServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, defaultCurrency]);

  const loadDefaultCurrency = async () => {
    const token = getToken();
    const companyId = token ? getCompanyIdFromToken(token) : undefined;
    const currency = await getDefaultCurrency(companyId);
    setDefaultCurrency(currency || 'USD');
    return currency;
  };

  const loadServices = async (currencyOverride?: string) => {
    try {
      setLoading(true);
      const data = await fetchServices({
        page: currentPage,
        pageSize: itemsPerPage,
        searchTerm: searchQuery,
        currency: currencyOverride || defaultCurrency
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

  const handleSelectAll = () => {
    if (selectedServices.length === services.length && services.length > 0) {
      setSelectedServices([]);
    } else {
      setSelectedServices(services.map((s) => s.id));
    }
  };

  const handleSelectService = (id: number) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
    );
  };



  const handleEdit = (service: Service) => {
    setEditingService({
        ...service,
        // Ensure price is a number if it comes as a string
        price: typeof service.price === 'string' ? parseFloat(service.price) : service.price
    });
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditingService({
      name: '',
      description: '',
      price: undefined,
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
      setIsSubmitting(true);
      const companyId = getCompanyIdFromToken(getToken() || "");
      if (!companyId) throw new Error("Company ID not found");
      
      const servicePayload = { 
        ...editingService, 
        companyId,
        currency: editingService.currency || defaultCurrency
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
      toast.success(editingService.id ? 'Service updated successfully' : 'Service created successfully');
    } catch (err: any) {
      if (err.message?.includes("Service name already exists")) {
        setFormErrors({ name: "Service name already exists in this company" });
      } else {
        toast.error(err.message || "Failed to save service");
        console.error(err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDeleteService = async () => {
    if (!deleteServiceId) return;
    try {
      await deleteService(deleteServiceId);
      toast.success('Service deleted successfully');
      loadServices();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete service. It may be in use.');
      console.error(err);
    } finally {
      setDeleteServiceId(null);
    }
  };

  const confirmBulkDelete = async () => {
    if (selectedServices.length === 0) return;
    try {
      setIsBulkDeleting(true);
      await bulkDeleteServices(selectedServices);
      toast.success(`${selectedServices.length} services deleted successfully`);
      setSelectedServices([]);
      loadServices();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete services');
      console.error(err);
    } finally {
      setIsBulkDeleting(false);
      setShowBulkDeleteConfirm(false);
    }
  };


  const handleDelete = (id: number) => {
    setDeleteServiceId(id);
  };

  const currencySymbol = defaultCurrency ? getCurrencySymbol(defaultCurrency) : '';

  return (
    <div className="p-8">
      

      {/* Add/Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-indigo-400 to-indigo-500 px-6 py-5 border-b border-indigo-600/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-white">
                    {editingService.id ? 'Edit Service' : 'New Service'}
                  </h2>
                  <p className="text-indigo-100 text-sm mt-0.5">
                    {editingService.id ? 'Update existing service details' : 'Create a new service for your customers'}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-white hover:rotate-90 cursor-pointer"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSave} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50/50">
                <div className="space-y-6">
                  {/* Basic Information Section */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <div className="p-1.5 bg-indigo-100 rounded-lg">
                          <Briefcase className="w-4 h-4 text-indigo-600" />
                        </div>
                        Service Information
                      </h3>
                    </div>
                    <div className="p-5 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Briefcase className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
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
                            placeholder="e.g. Executive Consultation"
                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                              formErrors.name ? 'border-red-300 bg-red-50/50' : 'border-gray-300 bg-white'
                            }`}
                          />
                        </div>
                        {formErrors.name && (
                          <p className="text-red-600 text-xs mt-1.5 font-medium">
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <div className="relative">
                          <FileText className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
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
                            placeholder="Provide details about what this service offering includes..."
                            rows={3}
                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none transition-all ${
                              formErrors.description ? 'border-red-300 bg-red-50/50' : 'border-gray-300 bg-white'
                            }`}
                          />
                        </div>
                        {formErrors.description && (
                          <p className="text-red-600 text-xs mt-1.5 font-medium">
                            {formErrors.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Duration Section */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <div className="p-1.5 bg-emerald-100 rounded-lg">
                          <span className="w-4 h-4 text-emerald-600 flex items-center justify-center font-bold text-xs">{currencySymbol}</span>
                        </div>
                        Pricing & Duration
                      </h3>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Price field */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Price ({currencySymbol}) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">{currencySymbol}</span>
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
                                placeholder="0.00"
                                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                                  formErrors.price ? 'border-red-300 bg-red-50/50' : 'border-gray-300 bg-white'
                                }`}
                              />
                            </div>
                            {formErrors.price && (
                              <p className="text-red-600 text-xs mt-1.5 font-medium">
                                {formErrors.price}
                              </p>
                            )}
                          </div>
                          {/* Duration field */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Duration (minutes) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <Clock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="number"
                                min="1"
                                step="1"
                                value={editingService.serviceDuration ?? ''}
                                onChange={e => {
                                  setEditingService({...editingService, serviceDuration: e.target.value === '' ? undefined : parseInt(e.target.value)});
                                  if (formErrors.serviceDuration) {
                                    const newErrors = { ...formErrors };
                                    delete newErrors.serviceDuration;
                                    setFormErrors(newErrors);
                                  }
                                }}
                                placeholder="30"
                                className={`w-full pl-10 pr-16 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                                  formErrors.serviceDuration ? 'border-red-300 bg-red-50/50' : 'border-gray-300 bg-white'
                                }`}
                              />
                              <span className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">min</span>
                            </div>
                            {formErrors.serviceDuration && (
                              <p className="text-red-600 text-xs mt-1.5 font-medium">
                                {formErrors.serviceDuration}
                              </p>
                            )}
                          </div>
                          {/* Buffer Time field */}
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Buffer Time After Appointment
                            </label>
                            <div className="relative">
                              <Clock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <select
                                value={editingService.bufferTimeMinutes ?? 0}
                                onChange={e => setEditingService({...editingService, bufferTimeMinutes: parseInt(e.target.value)})}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white appearance-none"
                              >
                                <option value={0}>No buffer</option>
                                <option value={5}>5 minutes</option>
                                <option value={10}>10 minutes</option>
                                <option value={15}>15 minutes</option>
                                <option value={30}>30 minutes</option>
                                <option value={45}>45 minutes</option>
                                <option value={60}>60 minutes</option>
                              </select>
                            </div>
                            <p className="text-xs text-gray-500 mt-1.5">Blocks the calendar after each appointment (e.g. for cleanup or travel).</p>
                          </div>
                        </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-white flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                       {editingService.id ? 'Update Service' : 'Create Service'}
                    </span>
                  ) : (
                    editingService.id ? 'Update Service' : 'Create Service'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                placeholder="Search services"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Service
            </button>
          </div>
        </div>
      </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {(!defaultCurrency || loading) ? (
                <div className="divide-y divide-gray-100">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="px-6 py-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <Skeleton className="col-span-4 h-4 w-32 bg-gray-200" />
                        <Skeleton className="col-span-4 h-4 w-40 bg-gray-200" />
                        <Skeleton className="col-span-2 h-4 w-16 bg-gray-200" />
                        <Skeleton className="col-span-1 h-4 w-12 bg-gray-200" />
                        <Skeleton className="col-span-1 h-4 w-8 bg-gray-200 ml-auto" />
                      </div>
                    </div>
                  ))}
                </div>
            ) : services?.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                    {searchQuery ? 'No services found matching your search.' : 'No services found. Add one to get started.'}
                </div>
            ) : (
            <>
                    {/* Table Header */}
                    <div className="px-6 py-3 bg-gray-50/80 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          {/* px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 */}
                            <div className="flex-1 grid grid-cols-12 gap-4 text-left text-sm font-medium text-gray-700 items-center">
                                <div className="col-span-1">
                                    <input
                                        type="checkbox"
                                        checked={selectedServices.length === services.length && services.length > 0}
                                        onChange={handleSelectAll}
                                        disabled={services.length === 0}
                                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                    />
                                </div>
                                <div className="col-span-3 cursor-pointer hover:bg-gray-100">Service Name</div>
                                <div className="col-span-4 cursor-pointer hover:bg-gray-100">Description</div>
                                <div className="col-span-2 cursor-pointer hover:bg-gray-100">Duration</div>
                                <div className="col-span-1 cursor-pointer hover:bg-gray-100">Price ({currencySymbol})</div>
                                <div className="col-span-1 text-right">Actions</div>
                            </div>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {services.map(service => (
                        <div key={service.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-1">
                                    <input
                                        type="checkbox"
                                        checked={selectedServices.includes(service.id)}
                                        onChange={() => handleSelectService(service.id)}
                                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                    />
                                </div>
                                <div className="col-span-3">
                                    <h3 className="text-sm font-large text-gray-900">{service.name}</h3>
                                </div>
                                <div className="col-span-4">
                                    <p className="text-sm text-gray-500 line-clamp-2">{service.description || '-'}</p>
                                </div>
                                <div className="col-span-2">
                                    <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                                        <Clock className="w-4 h-4 text-gray-400" /> {service.serviceDuration} min
                                    </span>
                                </div>
                                 <div className="col-span-1">
                                     <span className="text-sm text-gray-600">
                                         {formatPrice(service.price, service.currency || defaultCurrency)}
                                     </span>
                                 </div>
                                <div className="col-span-1 flex justify-end">
                                    {/* Edit/Delete Actions - Restricted */}
                                    {!(getRoleFromToken(getToken() || '') === 'Staff') && (
                                      <div className="flex items-center gap-1">
                                          <button 
                                              onClick={() => handleEdit(service)}
                                              className="p-2 text-indigo-600 hover:text-white hover:bg-indigo-600 hover:shadow-md active:scale-95 rounded-md transition-all duration-200 cursor-pointer"
                                              title="Edit Service"
                                          >
                                              <Pencil className="w-4 h-4" />
                                          </button>
                                          <button 
                                              onClick={() => handleDelete(service.id)}
                                              className="p-2 text-indigo-600 hover:text-white hover:bg-indigo-600 hover:shadow-md active:scale-95 rounded-md transition-all duration-200 cursor-pointer"
                                              title="Delete Service"
                                          >
                                              <Trash2 className="w-4 h-4" />
                                          </button>
                                      </div>
                                    )}
                                </div>
                            </div>
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
                            {selectedServices.length > 1 && (
                                <button
                                    onClick={() => setShowBulkDeleteConfirm(true)}
                                    disabled={isBulkDeleting}
                                    className="flex items-center gap-2 px-4 py-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all text-sm shadow-sm active:scale-95 font-medium disabled:opacity-50 cursor-pointer"
                                >
                                    {isBulkDeleting ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                    Delete {selectedServices.length} selected
                                </button>
                            )}
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1 || loading}
                                className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-sm text-gray-700">
                                Page {currentPage} of {totalPages || 1}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages || totalPages === 0 || loading}
                                className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </>
            )}
            </div>

      <ConfirmationModal
        isOpen={!!deleteServiceId}
        onClose={() => setDeleteServiceId(null)}
        onConfirm={confirmDeleteService}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
      />

      <ConfirmationModal
        isOpen={showBulkDeleteConfirm}
        onClose={() => setShowBulkDeleteConfirm(false)}
        onConfirm={confirmBulkDelete}
        title="Delete Multiple Services"
        description={`Are you sure you want to delete these ${selectedServices.length} services? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}

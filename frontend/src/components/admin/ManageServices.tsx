import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Clock } from 'lucide-react';
import { fetchServices, createService, updateService, deleteService } from '../../services/serviceApi';
import { Service } from '../../types/types';
import { getToken, getCompanyIdFromToken } from '../../utils/auth';
import { getDefaultCurrency } from '../../services/settingsService';
import { getCurrencySymbol } from '../../utils/currency';

export function ManageServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState<Partial<Service>>({});
  const [loading, setLoading] = useState(false);
  const [defaultCurrency, setDefaultCurrency] = useState('USD');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      // Load default currency first
      const currency = await getDefaultCurrency();
      setDefaultCurrency(currency);
      // Then load services
      const data = await fetchServices();
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      loadInitialData();
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
      loadInitialData();
    } catch (err) {
      alert("Failed to delete service. It may be in use.");
      console.error(err);
    }
  };

  const currencySymbol = getCurrencySymbol(defaultCurrency);

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Manage Services</h1>
           <p className="text-gray-600 mt-1">Configure your services (prices in {defaultCurrency})</p>
        </div>
        {!isEditing && (
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
                required
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
                     required
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
                     required
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
        <div className="bg-white rounded-lg shadow">
           {loading ? (
             <div className="p-8 text-center text-gray-500">Loading services...</div>
           ) : services.length === 0 ? (
             <div className="p-8 text-center text-gray-500">No services found. Add one to get started.</div>
           ) : (
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
                 </div>
               ))}
             </div>
           )}
        </div>
      )}
    </div>
  );
}

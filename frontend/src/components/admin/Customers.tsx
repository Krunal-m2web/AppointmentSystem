import { useState, useEffect } from 'react';
import { Search, Download, Upload, Plus, Edit, Trash2, X, Mail, Phone, User, Loader2, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, FileText } from 'lucide-react';
import { 
  fetchCustomers, 
  createCustomer, 
  updateCustomer, 
  deleteCustomer,
  CustomerResponse 
} from '../../services/customerApi';
import { toast } from 'sonner';
import { ConfirmationModal } from '../../components/ConfirmationModal';

export function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [deleteCustomerId, setDeleteCustomerId] = useState<number | null>(null);

  // Pagination & Sorting State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    notes: '',
  });

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 3) {
      errors.lastName = 'Last name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-()+]{7,20}$/.test(formData.phone.trim())) {
      errors.phone = 'Invalid phone format';
    }

    if (formData.notes && formData.notes.length > 500) {
      errors.notes = 'Notes cannot exceed 500 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const loadCustomers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchCustomers({
        page: currentPage,
        pageSize: itemsPerPage,
        sortBy: sortField,
        sortDirection: sortOrder,
        searchTerm: searchQuery
      });
      setCustomers(data.customers);
      setTotalItems(data.totalCount);
    } catch (err: any) {
      console.error('Error loading customers:', err);
      setError(err.message || 'Failed to load customers');
    } finally {
      setIsLoading(false);
    }
  };

  // Reload on page/sort change
  useEffect(() => {
    loadCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, sortField, sortOrder]);

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1); // Reset to page 1 on search
      loadCustomers();
    }, 500); // Increased debounce time slightly
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);


  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <ArrowUp className="w-4 h-4 inline ml-1" /> : <ArrowDown className="w-4 h-4 inline ml-1" />;
  };


  const handleSelectAll = () => {
    if (selectedCustomers.length === customers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customers.map((c) => c.id));
    }
  };

  const handleSelectCustomer = (id: number) => {
    setSelectedCustomers((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  const handleNewCustomer = () => {
    setEditingCustomer(null);
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      notes: '',
    });
    setFormErrors({});
    setShowNewCustomerForm(true);
  };

  const handleEditCustomer = (customer: CustomerResponse) => {
    setEditingCustomer(customer);
    setFormData({
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone || '',
      email: customer.email,
      notes: customer.notes || '',
    });
    setFormErrors({});
    setShowNewCustomerForm(true);
  };

  const confirmDeleteCustomer = async () => {
    if (!deleteCustomerId) return;
    try {
      await deleteCustomer(deleteCustomerId);
      toast.success('Customer deleted successfully');
      loadCustomers();
      setSelectedCustomers(selectedCustomers.filter((cId) => cId !== deleteCustomerId));
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete customer');
    } finally {
      setDeleteCustomerId(null);
    }
  };

  const handleDeleteCustomer = (id: number) => {
    setDeleteCustomerId(id);
  };

  const handleCloseForm = () => {
    setShowNewCustomerForm(false);
    setEditingCustomer(null);
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      notes: '',
    });
    setFormErrors({});
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSaving(true);

    try {
      if (editingCustomer) {
        // Update existing customer
        await updateCustomer(editingCustomer.id, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || undefined,
          notes: formData.notes || undefined,
          isActive: true,
        });
      } else {
        // Create new customer
        await createCustomer({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || undefined,
          notes: formData.notes || undefined,
        });
      }
      handleCloseForm();
      loadCustomers(); // Reload list
      toast.success(editingCustomer ? 'Customer updated successfully' : 'Customer created successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save customer');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportCSV = () => {
    // Note: This currently only exports loaded customers. 
    // Ideally should hit a backend endpoint for full export.
    const headers = ['Name', 'First Name', 'Last Name', 'Phone', 'Email', 'Notes', 'Last Appointment', 'Total Appointments'];
    const rows = customers.map((c) => [
      c.name,
      c.firstName,
      c.lastName,
      c.phone || '',
      c.email,
      c.notes || '',
      c.lastAppointment ? new Date(c.lastAppointment).toLocaleDateString() : '',
      c.totalAppointments.toString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981',
      '#6366f1', '#0ea5e9', '#f97316', '#14b8a6', '#a855f7',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (isLoading && customers.length === 0 && !searchQuery) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-4" />
        <p className="text-gray-600">Loading customers...</p>
      </div>
    );
  }

  if (error && customers.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 font-medium mb-2">Error Loading Customers</p>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="p-6">
       

      {/* Search and Actions Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Quick search customers"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
            >
              <Download className="w-4 h-4" />
              Export to CSV...
            </button>
            
            <button
              onClick={handleNewCustomer}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm shadow-sm"
            >
              <Plus className="w-4 h-4" />
              New customer...
            </button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.length === customers.length && customers.length > 0}
                    onChange={handleSelectAll}
                    disabled={customers.length === 0}
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </th>
                <th 
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}
                >
                  Name <SortIcon field="name" />
                </th>
                <th 
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('phone')}
                >
                  Phone <SortIcon field="phone" />
                </th>
                <th 
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('email')}
                >
                  Email <SortIcon field="email" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Notes
                </th>
                <th 
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('lastAppointment')}
                >
                  Last Appointment <SortIcon field="lastAppointment" />
                </th>
                <th 
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('totalAppointments')}
                >
                  Total Appts <SortIcon field="totalAppointments" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {isLoading && (
                    <tr>
                        <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                            <div className="flex justify-center items-center gap-2">
                                <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                                <span>Loading...</span>
                            </div>
                        </td>
                    </tr>
                )}
              {!isLoading && customers.length > 0 ? (
                customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => handleSelectCustomer(customer.id)}
                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                          style={{ backgroundColor: getAvatarColor(customer.name) }}
                        >
                          {getInitials(customer.name)}
                        </div>
                        <span className="text-sm text-gray-900">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {customer.phone || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {customer.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 max-w-[200px]">
                      <div className="truncate" title={customer.notes || ''}>
                        {customer.notes || '-'}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {customer.lastAppointment
                        ? new Date(customer.lastAppointment).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      {customer.totalAppointments}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditCustomer(customer)}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Edit className="w-3 h-3" />
                          Edit...
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : !isLoading && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                    {searchQuery ? 'No customers found matching your search' : 'No customers yet'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
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
              <option value={100}>100 per page</option>
            </select>
          </div>
            
                <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || isLoading}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0 || isLoading}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Customer Form Modal */}
      {showNewCustomerForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-indigo-400 to-indigo-500 px-6 py-5 border-b border-indigo-600/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-white">
                    {editingCustomer ? 'Edit Customer' : 'New Customer'}
                  </h2>
                  <p className="text-indigo-100 text-sm mt-0.5">
                    {editingCustomer ? 'Update customer profile information' : 'Add a new customer to your database'}
                  </p>
                </div>
                <button
                  onClick={handleCloseForm}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-white hover:rotate-90"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmitForm} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50/50">
                <div className="space-y-6">
                  {/* Personal Information Section */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <div className="p-1.5 bg-indigo-100 rounded-lg">
                          <User className="w-4 h-4 text-indigo-600" />
                        </div>
                        Personal Information
                      </h3>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              value={formData.firstName}
                              onChange={(e) => {
                                setFormData({ ...formData, firstName: e.target.value });
                                if (formErrors.firstName) {
                                  const newErrors = { ...formErrors };
                                  delete newErrors.firstName;
                                  setFormErrors(newErrors);
                                }
                              }}
                              placeholder="John"
                              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                                formErrors.firstName ? 'border-red-300 bg-red-50/50' : 'border-gray-300 bg-white'
                              }`}
                            />
                          </div>
                          {formErrors.firstName && (
                            <p className="text-red-600 text-xs mt-1.5">
                              {formErrors.firstName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              value={formData.lastName}
                              onChange={(e) => {
                                setFormData({ ...formData, lastName: e.target.value });
                                if (formErrors.lastName) {
                                  const newErrors = { ...formErrors };
                                  delete newErrors.lastName;
                                  setFormErrors(newErrors);
                                }
                              }}
                              placeholder="Doe"
                              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                                formErrors.lastName ? 'border-red-300 bg-red-50/50' : 'border-gray-300 bg-white'
                              }`}
                            />
                          </div>
                          {formErrors.lastName && (
                            <p className="text-red-600 text-xs mt-1.5">
                              {formErrors.lastName}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Details & Notes Section */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <div className="p-1.5 bg-emerald-100 rounded-lg">
                          <Mail className="w-4 h-4 text-emerald-600" />
                        </div>
                        Contact & Notes
                      </h3>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value });
                                if (formErrors.email) {
                                  const newErrors = { ...formErrors };
                                  delete newErrors.email;
                                  setFormErrors(newErrors);
                                }
                              }}
                              placeholder="john.doe@example.com"
                              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                                formErrors.email ? 'border-red-300 bg-red-50/50' : 'border-gray-300 bg-white'
                              }`}
                            />
                          </div>
                          {formErrors.email && (
                            <p className="text-red-600 text-xs mt-1.5">
                              {formErrors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => {
                                setFormData({ ...formData, phone: e.target.value });
                                if (formErrors.phone) {
                                  const newErrors = { ...formErrors };
                                  delete newErrors.phone;
                                  setFormErrors(newErrors);
                                }
                              }}
                              placeholder="+1 (555) 000-0000"
                              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                                formErrors.phone ? 'border-red-300 bg-red-50/50' : 'border-gray-300 bg-white'
                              }`}
                            />
                          </div>
                          {formErrors.phone && (
                            <p className="text-red-600 text-xs mt-1.5">
                              {formErrors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Internal Notes
                        </label>
                        <div className="relative">
                          <FileText className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
                          <textarea
                            value={formData.notes}
                            onChange={(e) => {
                              setFormData({ ...formData, notes: e.target.value });
                              if (formErrors.notes) {
                                const newErrors = { ...formErrors };
                                delete newErrors.notes;
                                setFormErrors(newErrors);
                              }
                            }}
                            placeholder="Add private notes about preferences, history, etc..."
                            rows={3}
                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none transition-all ${
                              formErrors.notes ? 'border-red-300 bg-red-50/50' : 'border-gray-300 bg-white'
                            }`}
                          />
                        </div>
                        {formErrors.notes && (
                          <p className="text-red-600 text-xs mt-1.5">
                            {formErrors.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-white flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="flex-1 px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <span className="flex items-center justify-center gap-2">
                       <Loader2 className="w-4 h-4 animate-spin" />
                       Saving...
                    </span>
                  ) : (
                    editingCustomer ? 'Update Customer' : 'Add Customer'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <ConfirmationModal
        isOpen={!!deleteCustomerId}
        onClose={() => setDeleteCustomerId(null)}
        onConfirm={confirmDeleteCustomer}
        title="Delete Customer"
        description="Are you sure you want to delete this customer? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}

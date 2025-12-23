import { useState, useEffect } from 'react';
import { Search, Download, Upload, Plus, Edit, Trash2, X, Mail, Phone, User, Loader2 } from 'lucide-react';
import { 
  fetchCustomers, 
  createCustomer, 
  updateCustomer, 
  deleteCustomer, 
  CustomerResponse 
} from '../../services/customerApi';

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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    notes: '',
  });

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (formData.phone && formData.phone.trim().length > 0) {
      // Basic phone validation - digits, spaces, dashes, parentheses, plus
      if (!/^[\d\s\-()+]{7,20}$/.test(formData.phone.trim())) {
        errors.phone = 'Invalid phone format';
      }
    }

    if (formData.notes && formData.notes.length > 1000) {
      errors.notes = 'Notes cannot exceed 1000 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Fetch customers on mount and when search changes
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchCustomers(searchQuery || undefined);
        setCustomers(data);
      } catch (err: any) {
        console.error('Error loading customers:', err);
        setError(err.message || 'Failed to load customers');
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(loadCustomers, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

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

  const handleDeleteCustomer = async (id: number) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(id);
        setCustomers(customers.filter((c) => c.id !== id));
        setSelectedCustomers(selectedCustomers.filter((cId) => cId !== id));
      } catch (err: any) {
        alert(err.message || 'Failed to delete customer');
      }
    }
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
        const updated = await updateCustomer(editingCustomer.id, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || undefined,
          notes: formData.notes || undefined,
          isActive: true,
        });
        setCustomers(customers.map((c) => (c.id === updated.id ? updated : c)));
      } else {
        // Create new customer
        const created = await createCustomer({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || undefined,
          notes: formData.notes || undefined,
        });
        setCustomers([...customers, created]);
      }
      handleCloseForm();
    } catch (err: any) {
      alert(err.message || 'Failed to save customer');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportCSV = () => {
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

  if (isLoading && customers.length === 0) {
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

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <p className="text-gray-600 mt-1">Manage your customer database</p>
      </div>

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
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
            >
              <Upload className="w-4 h-4" />
              Import...
            </button>
            <button
              onClick={handleNewCustomer}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
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
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Notes
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Last Appointment
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Total Appointments
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.length > 0 ? (
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
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                    {searchQuery ? 'No customers found matching your search' : 'No customers yet'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Form Modal */}
      {showNewCustomerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{editingCustomer ? 'Edit Customer' : 'New Customer'}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {editingCustomer ? 'Update customer information' : 'Add a new customer to your database'}
                </p>
              </div>
              <button
                onClick={handleCloseForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitForm} className="p-6 space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-600" />
                    First Name <span className="text-red-500">*</span>
                  </div>
                </label>
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
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
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
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-indigo-600" />
                    Phone
                  </div>
                </label>
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
                  placeholder="+1 (555) 123-4567"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    formErrors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    Email <span className="text-red-500">*</span>
                  </div>
                </label>
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
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
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
                  placeholder="Add any notes about this customer..."
                  rows={4}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${
                    formErrors.notes ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.notes && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.notes}</p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                  disabled={isSaving}
                >
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingCustomer ? 'Update Customer' : 'Add Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

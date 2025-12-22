import { useState } from 'react';
import { Search, User, Mail, Phone, Calendar, DollarSign, X, Clock } from 'lucide-react';
import { formatDate } from '../../utils/datetime';
import type { Customer, Appointment } from '../../types/types';

// Mock customers data
const mockCustomers: Customer[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234-567-8900',
        totalAppointments: 5,
        totalSpent: 750,
        currency: 'USD',
        lastAppointment: '2024-12-27T14:00:00Z',
        createdAt: '2024-01-15T10:00:00Z',
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 234-567-8901',
        totalAppointments: 3,
        totalSpent: 600,
        currency: 'USD',
        lastAppointment: '2024-12-28T16:30:00Z',
        createdAt: '2024-02-20T10:00:00Z',
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '+1 234-567-8902',
        totalAppointments: 8,
        totalSpent: 1200,
        currency: 'USD',
        lastAppointment: '2024-12-25T10:00:00Z',
        createdAt: '2023-11-10T10:00:00Z',
    },
    {
        id: 4,
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        phone: '+1 234-567-8903',
        totalAppointments: 2,
        totalSpent: 400,
        currency: 'USD',
        lastAppointment: '2024-12-20T14:00:00Z',
        createdAt: '2024-03-05T10:00:00Z',
    },
];

// Mock appointment history
const mockAppointmentHistory: Record<number, Appointment[]> = {
    1: [
        {
            id: 1,
            customerId: 1,
            customerName: 'John Doe',
            customerEmail: 'john@example.com',
            customerPhone: '+1 234-567-8900',
            staffId: 1,
            staffName: 'Sarah Johnson',
            serviceId: 1,
            serviceName: 'Web Design',
            dateTime: '2024-12-27T14:00:00Z',
            duration: 60,
            meetingType: 'zoom',
            status: 'confirmed',
            price: 150,
            currency: 'USD',
            paymentMethod: 'credit-card',
            createdAt: '2024-12-20T10:00:00Z',
            updatedAt: '2024-12-20T10:00:00Z',
        },
    ],
    2: [
        {
            id: 2,
            customerId: 2,
            customerName: 'Jane Smith',
            customerEmail: 'jane@example.com',
            customerPhone: '+1 234-567-8901',
            staffId: 2,
            staffName: 'Mike Wilson',
            serviceId: 2,
            serviceName: 'Software Development',
            dateTime: '2024-12-28T16:30:00Z',
            duration: 90,
            meetingType: 'in-person',
            status: 'confirmed',
            price: 200,
            currency: 'USD',
            paymentMethod: 'pay-later',
            createdAt: '2024-12-21T10:00:00Z',
            updatedAt: '2024-12-21T10:00:00Z',
        },
    ],
};

export function Customers() {
    const [customers] = useState<Customer[]>(mockCustomers);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);

    const filteredCustomers = customers.filter(
        (customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm)
    );

    const handleSelectCustomer = (customer: Customer) => {
        setSelectedCustomer(customer);
        setEditedCustomer({ ...customer });
        setEditMode(false);
    };

    const handleSave = () => {
        if (editedCustomer) {
            // In real app, this would update the database
            console.log('Saving customer:', editedCustomer);
            setSelectedCustomer(editedCustomer);
            setEditMode(false);
            alert('Customer updated successfully!');
        }
    };

    const customerAppointments = selectedCustomer
        ? mockAppointmentHistory[selectedCustomer.id] || []
        : [];

    return (
        <div className="p-4 md:p-8">
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold">Customers</h1>
                <p className="text-gray-600 mt-1">Manage customer information and view appointment history</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Customer List */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b border-gray-200">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search customers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                            {filteredCustomers.map((customer) => (
                                <div
                                    key={customer.id}
                                    onClick={() => handleSelectCustomer(customer)}
                                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedCustomer?.id === customer.id ? 'bg-indigo-50' : ''
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{customer.name}</p>
                                            <p className="text-sm text-gray-600 truncate">{customer.email}</p>
                                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                                <span>{customer.totalAppointments} appointments</span>
                                                <span>•</span>
                                                <span>${customer.totalSpent}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-gray-200 text-center text-sm text-gray-600">
                            {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                </div>

                {/* Customer Details */}
                <div className="lg:col-span-2">
                    {selectedCustomer && editedCustomer ? (
                        <div className="space-y-6">
                            {/* Customer Info Card */}
                            <div className="bg-white rounded-lg shadow">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl md:text-2xl font-bold">Customer Details</h2>
                                        <div className="flex items-center gap-2">
                                            {editMode ? (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            setEditMode(false);
                                                            setEditedCustomer({ ...selectedCustomer });
                                                        }}
                                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={handleSave}
                                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                                    >
                                                        Save
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => setEditMode(true)}
                                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                            <button
                                                onClick={() => {
                                                    setSelectedCustomer(null);
                                                    setEditedCustomer(null);
                                                }}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <User className="w-4 h-4 inline mr-2" />
                                                Full Name
                                            </label>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    value={editedCustomer.name}
                                                    onChange={(e) => setEditedCustomer({ ...editedCustomer, name: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            ) : (
                                                <p className="text-gray-900 font-medium">{selectedCustomer.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Mail className="w-4 h-4 inline mr-2" />
                                                Email
                                            </label>
                                            {editMode ? (
                                                <input
                                                    type="email"
                                                    value={editedCustomer.email}
                                                    onChange={(e) => setEditedCustomer({ ...editedCustomer, email: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            ) : (
                                                <p className="text-gray-900 font-medium">{selectedCustomer.email}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Phone className="w-4 h-4 inline mr-2" />
                                                Phone
                                            </label>
                                            {editMode ? (
                                                <input
                                                    type="tel"
                                                    value={editedCustomer.phone}
                                                    onChange={(e) => setEditedCustomer({ ...editedCustomer, phone: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            ) : (
                                                <p className="text-gray-900 font-medium">{selectedCustomer.phone}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Calendar className="w-4 h-4 inline mr-2" />
                                                Customer Since
                                            </label>
                                            <p className="text-gray-900 font-medium">
                                                {formatDate(selectedCustomer.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Statistics */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-lg shadow p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Total Appointments</p>
                                            <p className="text-3xl font-bold mt-2">{selectedCustomer.totalAppointments}</p>
                                        </div>
                                        <div className="bg-blue-100 p-3 rounded-lg">
                                            <Calendar className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Total Spent</p>
                                            <p className="text-3xl font-bold mt-2">
                                                ${selectedCustomer.totalSpent}
                                            </p>
                                        </div>
                                        <div className="bg-green-100 p-3 rounded-lg">
                                            <DollarSign className="w-6 h-6 text-green-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Last Appointment</p>
                                            <p className="text-lg font-bold mt-2">
                                                {selectedCustomer.lastAppointment
                                                    ? formatDate(selectedCustomer.lastAppointment)
                                                    : 'N/A'}
                                            </p>
                                        </div>
                                        <div className="bg-purple-100 p-3 rounded-lg">
                                            <Clock className="w-6 h-6 text-purple-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Appointment History */}
                            <div className="bg-white rounded-lg shadow">
                                <div className="p-6 border-b border-gray-200">
                                    <h3 className="text-xl font-bold">Appointment History</h3>
                                </div>
                                <div className="p-6">
                                    {customerAppointments.length > 0 ? (
                                        <div className="space-y-4">
                                            {customerAppointments.map((apt) => (
                                                <div
                                                    key={apt.id}
                                                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold">{apt.serviceName}</h4>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                with {apt.staffName}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                {formatDate(apt.dateTime)} at {new Date(apt.dateTime).toLocaleTimeString('en-US', {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                })}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs font-medium ${apt.status === 'confirmed'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : apt.status === 'pending'
                                                                        ? 'bg-yellow-100 text-yellow-700'
                                                                        : 'bg-gray-100 text-gray-700'
                                                                    }`}
                                                            >
                                                                {apt.status}
                                                            </span>
                                                            <span className="font-semibold">
                                                                ${apt.price} {apt.currency}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                            <p>No appointment history available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow p-12 text-center">
                            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Customer Selected</h3>
                            <p className="text-gray-600">Select a customer from the list to view their details and appointment history</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

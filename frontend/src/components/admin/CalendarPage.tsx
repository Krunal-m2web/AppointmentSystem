import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Edit2, Trash2, Clock, User, Phone, Mail, MapPin } from 'lucide-react';
import { getDaysInMonth, getFirstDayOfMonth, formatDate, formatTime, getDateString, combineDateTimeToUTC } from '../../utils/datetime';
import type { Appointment, MeetingType } from '../../types/types';

// Mock appointments data
const mockAppointments: Appointment[] = [
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
];

const MEETING_TYPE_COLORS: Record<MeetingType, string> = {
    'in-person': 'bg-green-100 border-green-500 text-green-800',
    'phone': 'bg-blue-100 border-blue-500 text-blue-800',
    'zoom': 'bg-purple-100 border-purple-500 text-purple-800',
};

const MEETING_TYPE_LABELS: Record<MeetingType, string> = {
    'in-person': 'In Person',
    'phone': 'Phone Call',
    'zoom': 'Zoom',
};

export function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const getAppointmentsForDate = (date: Date) => {
        return appointments.filter((apt) => {
            const aptDate = new Date(apt.dateTime);
            return (
                aptDate.getDate() === date.getDate() &&
                aptDate.getMonth() === date.getMonth() &&
                aptDate.getFullYear() === date.getFullYear()
            );
        });
    };

    const handleDateClick = (day: number) => {
        const clickedDate = new Date(year, month, day);
        setSelectedDate(clickedDate);
        setShowAddModal(true);
    };

    const handleAppointmentClick = (apt: Appointment) => {
        setSelectedAppointment(apt);
    };

    const handleDeleteAppointment = (id: number) => {
        if (confirm('Are you sure you want to delete this appointment?')) {
            setAppointments(appointments.filter((apt) => apt.id !== id));
            setSelectedAppointment(null);
        }
    };

    const renderCalendarDays = () => {
        const days = [];
        const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;

        for (let i = 0; i < totalCells; i++) {
            const day = i - firstDayOfMonth + 1;
            const isValidDay = day > 0 && day <= daysInMonth;
            const date = isValidDay ? new Date(year, month, day) : null;
            const dayAppointments = date ? getAppointmentsForDate(date) : [];
            const isToday = date && date.toDateString() === new Date().toDateString();

            days.push(
                <div
                    key={i}
                    className={`min-h-24 md:min-h-32 border border-gray-200 p-1 md:p-2 ${isValidDay ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'
                        } ${isToday ? 'ring-2 ring-indigo-500' : ''}`}
                    onClick={() => isValidDay && handleDateClick(day)}
                >
                    {isValidDay && (
                        <>
                            <div className={`text-sm md:text-base font-medium mb-1 ${isToday ? 'text-indigo-600' : 'text-gray-700'}`}>
                                {day}
                            </div>
                            <div className="space-y-1 overflow-y-auto max-h-20 md:max-h-24">
                                {dayAppointments.map((apt) => (
                                    <div
                                        key={apt.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAppointmentClick(apt);
                                        }}
                                        className={`text-xs p-1 rounded border-l-2 ${MEETING_TYPE_COLORS[apt.meetingType]} cursor-pointer hover:opacity-80`}
                                    >
                                        <div className="font-medium truncate">{formatTime(apt.dateTime)}</div>
                                        <div className="truncate">{apt.customerName}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="p-4 md:p-8">
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold">Calendar</h1>
                <p className="text-gray-600 mt-1">View and manage appointments</p>
            </div>

            {/* Calendar Header */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={previousMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl md:text-2xl font-semibold min-w-[200px] text-center">
                            {monthNames[month]} {year}
                        </h2>
                        <button
                            onClick={nextMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <button
                        onClick={() => {
                            setSelectedDate(new Date());
                            setShowAddModal(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors w-full sm:w-auto justify-center"
                    >
                        <Plus className="w-5 h-5" />
                        New Appointment
                    </button>
                </div>

                {/* Legend */}
                <div className="px-4 md:px-6 py-3 border-b border-gray-200 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-100 border-l-2 border-green-500 rounded"></div>
                        <span>In Person</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-100 border-l-2 border-blue-500 rounded"></div>
                        <span>Phone Call</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-100 border-l-2 border-purple-500 rounded"></div>
                        <span>Zoom</span>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="p-2 md:p-4">
                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-0 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} className="text-center font-semibold text-gray-700 py-2 text-sm md:text-base">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-0">
                        {renderCalendarDays()}
                    </div>
                </div>
            </div>

            {/* Appointment Detail Modal */}
            {selectedAppointment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
                            <h2 className="text-xl md:text-2xl font-bold">Appointment Details</h2>
                            <button
                                onClick={() => setSelectedAppointment(null)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className={`p-4 rounded-lg border-l-4 ${MEETING_TYPE_COLORS[selectedAppointment.meetingType]}`}>
                                <p className="font-semibold">{MEETING_TYPE_LABELS[selectedAppointment.meetingType]}</p>
                                <p className="text-sm mt-1">{selectedAppointment.serviceName}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-600 flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Customer Name
                                    </label>
                                    <p className="mt-1 font-medium">{selectedAppointment.customerName}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600 flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        Email
                                    </label>
                                    <p className="mt-1 font-medium">{selectedAppointment.customerEmail}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600 flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        Phone
                                    </label>
                                    <p className="mt-1 font-medium">{selectedAppointment.customerPhone}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600 flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Staff
                                    </label>
                                    <p className="mt-1 font-medium">{selectedAppointment.staffName}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600 flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        Date & Time
                                    </label>
                                    <p className="mt-1 font-medium">
                                        {formatDate(selectedAppointment.dateTime)} at {formatTime(selectedAppointment.dateTime)}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600">Duration</label>
                                    <p className="mt-1 font-medium">{selectedAppointment.duration} minutes</p>
                                </div>
                            </div>

                            {selectedAppointment.description && (
                                <div>
                                    <label className="text-sm text-gray-600">Description</label>
                                    <p className="mt-1 p-4 bg-gray-50 rounded-lg">{selectedAppointment.description}</p>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-gray-200 flex gap-3">
                            <button
                                onClick={() => setSelectedAppointment(null)}
                                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    // TODO: Implement edit functionality
                                    alert('Edit functionality coming soon!');
                                }}
                                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <Edit2 className="w-4 h-4" />
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteAppointment(selectedAppointment.id)}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Appointment Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl md:text-2xl font-bold">Add New Appointment</h2>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setSelectedDate(null);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6">
                            <p className="text-gray-600">
                                Selected Date: {selectedDate ? formatDate(selectedDate.toISOString()) : 'None'}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Full appointment form will be implemented in the Appointments page enhancement.
                            </p>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex gap-3">
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setSelectedDate(null);
                                }}
                                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    alert('Add appointment functionality will be fully implemented in Appointments page!');
                                    setShowAddModal(false);
                                }}
                                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Continue to Form
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

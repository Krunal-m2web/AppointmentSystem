import { useState } from "react";
import {
  LogOut,
  Calendar as CalendarIcon,
  Users,
  Settings,
  LayoutDashboard,
  DollarSign,
  Tag,
  UserCheck,
  CalendarDays,
} from "lucide-react";
import { DashboardHome } from "../components/admin/DashboardHome";
import { CalendarPage } from "../components/admin/CalendarPage";
import { AppointmentsPage } from "../components/admin/AppointmentsPage";
import { StaffMembers } from "../components/admin/StaffMembers";
import { ManageServices } from "../components/admin/ManageServices";
import { CustomersPage } from "../components/admin/Customers";
import { ServicePricing } from "../components/admin/ServicePricing";
import { PaymentSettings } from "../components/admin/PaymentSettings";
import { SettingsPage } from "../components/admin/SettingsPage";
import { useTimezone } from "../context/TimezoneContext";
import { useEffect } from "react";

interface AdminDashboardProps {
  onLogout: () => void;
}

type Tab =
  | "dashboard"
  | "calendar"
  | "appointments"
  | "staff"
  | "services"
  | "customers"
  | "pricing"
  | "payment"
  | "settings";

export function AdminDashboard({
  onLogout,
}: AdminDashboardProps) {
  const { refreshTimezone } = useTimezone();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  useEffect(() => {
    refreshTimezone();
  }, [refreshTimezone]);

  const tabs = [
    {
      id: "dashboard" as Tab,
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "calendar" as Tab,
      label: "Calendar",
      icon: CalendarDays,
    },
    {
      id: "appointments" as Tab,
      label: "Appointments",
      icon: CalendarIcon,
    },
    {
      id: "staff" as Tab,
      label: "Staff Members",
      icon: UserCheck,
    },
    {
      id: "services" as Tab,
      label: "Services",
      icon: Settings,
    },
    { id: "customers" as Tab, label: "Customers", icon: Users },
    {
      id: "pricing" as Tab,
      label: "Service Pricing",
      icon: Tag,
    },
    {
      id: "payment" as Tab,
      label: "Payment Settings",
      icon: DollarSign,
    },
    {
      id: "settings" as Tab,
      label: "Global Settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-600 mt-1">
            Appointment System
          </p>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === "dashboard" && <DashboardHome />}
        {activeTab === "calendar" && <CalendarPage />}
        {activeTab === "appointments" && <AppointmentsPage />}
        {activeTab === "staff" && <StaffMembers />}
        {activeTab === "services" && <ManageServices />}
        {activeTab === "customers" && <CustomersPage />}
        {activeTab === "pricing" && <ServicePricing />}
        {activeTab === "payment" && <PaymentSettings />}
        {activeTab === "settings" && <SettingsPage />}
      </main>
    </div>
  );
}
import { useState } from "react";
import {
  LogOut,
  Calendar as CalendarIcon,
  Users,
  Settings as SettingsIcon,
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
import { Settings } from "../components/admin/Settings";
import { useTimezone } from "../context/TimezoneContext";
import { useEffect } from "react";
import { getRoleFromToken } from "../utils/auth";

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
  | "settings";

export function AdminDashboard({
  onLogout,
}: AdminDashboardProps) {
  const { refreshTimezone } = useTimezone();
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    return (localStorage.getItem("adminActiveTab") as Tab) || "dashboard";
  });

  useEffect(() => {
    localStorage.setItem("adminActiveTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    refreshTimezone();
  }, [refreshTimezone]);

  const token = localStorage.getItem('auth_token');
  const role = token ? getRoleFromToken(token) : undefined;

  const allTabs = [
    {
      id: "dashboard" as Tab,
      label: "Dashboard",
      icon: LayoutDashboard,
      roles: ['Admin', 'Staff']
    },
    {
      id: "calendar" as Tab,
      label: "Calendar",
      icon: CalendarDays,
      roles: ['Admin', 'Staff']
    },
    {
      id: "appointments" as Tab,
      label: "Appointments",
      icon: CalendarIcon,
      roles: ['Admin', 'Staff']
    },
    {
      id: "staff" as Tab,
      label: role === 'Staff' ? "My Profile" : "Staff Members",
      icon: UserCheck,
      roles: ['Admin', 'Staff']
    },
    {
      id: "services" as Tab,
      label: "Services",
      icon: SettingsIcon,
      roles: ['Admin', 'Staff']
    },
    { id: "customers" as Tab, label: "Customers", icon: Users, roles: ['Admin'] },
    // {
    //   id: "pricing" as Tab,
    //   label: "Service Pricing",
    //   icon: Tag,
    //   roles: ['Admin']
    // },
    {
      id: "settings" as Tab,
      label: "Settings",
      icon: SettingsIcon,
      roles: ['Admin']
    },
  ];

  let visibleTabs = allTabs.filter(t => !role || t.roles.includes(role));
  
  // Custom reordering for Staff: Move 'My Profile' to the bottom
  if (role === 'Staff') {
      visibleTabs = [
          ...visibleTabs.filter(t => t.id !== 'staff'),
          ...visibleTabs.filter(t => t.id === 'staff')
      ];
  }

  const tabs = visibleTabs;

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
        {/* {activeTab === "pricing" && <ServicePricing />} */}
        {activeTab === "settings" && <Settings />}
      </main>
    </div>
  );
}
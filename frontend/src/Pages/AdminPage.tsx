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
  Clock,
} from "lucide-react";
import { DashboardHome } from "../components/admin/DashboardHome";
import { CalendarPage } from "../components/admin/CalendarPage";
import { AppointmentsPage } from "../components/admin/AppointmentsPage";
import { StaffMembers } from "../components/admin/StaffMembers";
import { TimeOffPage } from "../components/admin/TimeOffPage";
import { ManageServices } from "../components/admin/ManageServices";
import { CustomersPage } from "../components/admin/Customers";
import { ServicePricing } from "../components/admin/ServicePricing";
import { Settings } from "../components/admin/Settings";
import { UserProfile } from "../components/admin/UserProfile";
import { useTimezone } from "../context/TimezoneContext";
import { useEffect } from "react";
import { getRoleFromToken, getToken, getUserNameFromToken, getEmailFromToken } from "../utils/auth";
import { User, Bell, ChevronDown } from "lucide-react";
import { jwtDecode } from "jwt-decode";

interface AdminDashboardProps {
  onLogout: () => void;
}

type Tab =
  | "dashboard"
  | "calendar"
  | "appointments"
  | "staff"
  | "timeoff"
  | "services"
  | "customers"
  | "pricing"
  | "settings"
  | "profile";

export function AdminDashboard({
  onLogout,
}: AdminDashboardProps) {
  const { refreshTimezone } = useTimezone();
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    return (localStorage.getItem("adminActiveTab") as Tab) || "dashboard";
  });

  const [timeOffBadgeCount, setTimeOffBadgeCount] = useState(0);

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
      roles: ['Admin', 'Staff'],
    },
    {
      id: "timeoff" as Tab,
      label: "Time Off",
      icon: Clock,
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

  const visibleTabs = allTabs.filter(t => {
    if (!role || !t.roles.includes(role)) return false;
    // Hide 'staff' tab from sidebar for Staff role (accessible via profile menu)
    if (role === 'Staff' && t.id === 'staff') return false;
    return true;
  });
  const tabs = visibleTabs;

  useEffect(() => {
    localStorage.setItem("adminActiveTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    refreshTimezone();
  }, [refreshTimezone]);

  // Ensure active tab is valid for current role
  useEffect(() => {
    const currentTab = allTabs.find(t => t.id === activeTab);
    if (currentTab && role && !currentTab.roles.includes(role)) {
      setActiveTab("dashboard");
    }
  }, [role, activeTab]);

  // Fetch pending time-off count for admin
  useEffect(() => {
    const fetchCount = async () => {
      const token = localStorage.getItem('auth_token');
      const role = token ? getRoleFromToken(token) : undefined;
      
      try {
        const { fetchBadgeCounts } = await import('../services/staffApi');
        const data = await fetchBadgeCounts();
        if (role === 'Admin') {
          setTimeOffBadgeCount(data.adminBadgeCount + data.staffBadgeCount);
        } else {
          setTimeOffBadgeCount(data.staffBadgeCount);
        }
      } catch (err) {
        console.error('Failed to fetch badge counts:', err);
      }
    };

    fetchCount();
    // Refresh every 30 seconds
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const userName = token ? getUserNameFromToken(token) : 'Admin';
  const userInitials = userName ? userName.substring(0, 2).toUpperCase() : 'AD';

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-gray-900">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col bg-white border-r border-gray-200">
        <div className="p-6 h-16 flex items-center border-b border-gray-200">
          <h2 className="text-xl font-bold text-indigo-600">Admin Panel</h2>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const badge = tab.id === 'timeoff' ? timeOffBadgeCount : 0;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{tab.label}</span>
                {badge > 0 && (
                  <span className="ml-auto min-w-[20px] h-5 px-1.5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                    {badge > 99 ? '99+' : badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
              {userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{userName}</p>
              <p className="text-xs text-gray-500 capitalize">{role?.toLowerCase() || 'Admin'}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-800 hidden md:block">
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
            {/* Mobile Sidebar Toggle would go here */}
          </div>

          <div className="flex items-center gap-4">
            
            
            <div className="h-8 w-px bg-gray-200 mx-1"></div>

            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                  {userInitials}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">{userName}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {showProfileMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowProfileMenu(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-2 overflow-hidden transform origin-top-right transition-all animate-in fade-in zoom-in duration-75">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500 truncate">{token ? getEmailFromToken(token) : ''}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (role === 'Staff') {
                          setActiveTab('staff');
                        } else {
                          setActiveTab('profile');
                        }
                        setShowProfileMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </button>
                    {role !== 'Staff' && (
                      <button
                        onClick={() => {
                          setActiveTab('settings');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <SettingsIcon className="w-4 h-4" />
                        Settings
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-0 bg-gray-50/50">
          <div className="max-w-[1600px] mx-auto">
            {activeTab === "dashboard" && <DashboardHome />}
            {activeTab === "calendar" && <CalendarPage />}
            {activeTab === "appointments" && <AppointmentsPage />}
            {activeTab === "staff" && <StaffMembers />}
            {activeTab === "timeoff" && <TimeOffPage onCountChange={setTimeOffBadgeCount} />}
            {activeTab === "services" && <ManageServices />}
            {activeTab === "customers" && <CustomersPage />}
            {activeTab === "settings" && <Settings />}
            {activeTab === "profile" && <UserProfile />}
          </div>
        </main>
      </div>
    </div>
  );
}
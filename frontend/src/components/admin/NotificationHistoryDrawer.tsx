import { useState, useEffect } from 'react';
import { X, Mail, MessageSquare, Check, AlertCircle, Clock, Loader2, ChevronDown } from 'lucide-react';
import { CustomerResponse, fetchCustomerLogs, LogEntry } from '../../services/customerApi';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '../ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface NotificationHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  customer: CustomerResponse;
}

type LogType = 'email' | 'sms';

export function NotificationHistoryDrawer({
  isOpen,
  onClose,
  customer,
}: NotificationHistoryDrawerProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeTab, setActiveTab] = useState<LogType>('email');
  const [filterDays, setFilterDays] = useState(30);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchLogs = (targetPage: number, isLoadMore: boolean = false) => {
    if (!customer) return;

    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    fetchCustomerLogs(customer.id, {
      type: activeTab,
      days: filterDays,
      page: targetPage,
      pageSize: 20
    })
      .then(data => {
        if (isLoadMore) {
          setLogs(prev => [...(prev || []), ...(data.logs || [])]);
        } else {
          setLogs(data.logs || []);
        }
        setHasNextPage(data.hasNextPage);
        setPage(data.page);
      })
      .catch(err => {
        console.error("Failed to fetch logs:", err);
      })
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    if (isOpen && customer) {
      setPage(1);
      fetchLogs(1, false);
    } else {
      setLogs([]);
    }
  }, [isOpen, customer, activeTab, filterDays]);

  const handleLoadMore = () => {
    if (hasNextPage && !loadingMore) {
      fetchLogs(page + 1, true);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
      case 'delivered':
        return <Check className="w-3.5 h-3.5 text-green-600" />;
      case 'failed':
        return <AlertCircle className="w-3.5 h-3.5 text-red-600" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      sent: 'bg-green-50 text-green-700 border-green-200',
      delivered: 'bg-green-50 text-green-700 border-green-200',
      failed: 'bg-red-50 text-red-700 border-red-200',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border flex items-center gap-1 w-fit uppercase tracking-wider ${styles[status as keyof typeof styles] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
        {getStatusIcon(status)}
        {status}
      </span>
    );
  };

  const renderLogTable = (type: LogType) => {
    if (loading && page === 1) {
      return (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      );
    }

    return (
      <div className="mt-4 flex flex-col gap-4">
        <div className="border rounded-lg overflow-hidden border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-tight">Time</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-tight">
                  {type === 'email' ? 'Subject' : 'Message'}
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-tight w-24">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs && logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} <br/>
                      <span className="text-gray-400">{new Date(log.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                    </td>
                    <td className="px-4 py-3.5 text-xs font-medium text-gray-700">
                      {type === 'email' ? log.subject : log.message}
                    </td>
                    <td className="px-4 py-3.5">
                      {getStatusBadge(log.status)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-2 bg-gray-50 rounded-full text-gray-400">
                         {type === 'email' ? <Mail className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                      </div>
                      <p className="text-xs text-gray-500">No {type} logs</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {hasNextPage && (
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="w-full py-2.5 px-4 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-gray-100 disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
          >
            {loadingMore ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent className="h-full rounded-none">
        <div className="mx-auto w-full max-w-md flex flex-col h-full bg-white">
          <DrawerHeader className="border-b border-gray-100 pb-6">
            <div className="flex items-center justify-between mb-2">
               <DrawerTitle className="text-xl font-bold tracking-tight text-gray-900">Communication Logs</DrawerTitle>
               <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
               </button>
            </div>
            <DrawerDescription className="text-gray-500 text-xs">
              History of all automated messages sent to <span className="text-gray-900 font-medium">{customer.firstName} {customer.lastName}</span>
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-6 pb-0 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <Tabs 
                value={activeTab} 
                onValueChange={(v) => setActiveTab(v as LogType)} 
                className="flex-1"
              >
                <TabsList className="grid w-full grid-cols-2 h-9 p-1 bg-gray-100/50 border border-gray-200/50 rounded-lg">
                  <TabsTrigger value="email" className="text-xs gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Mail className="w-3.5 h-3.5" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="sms" className="text-xs gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <MessageSquare className="w-3.5 h-3.5" />
                    SMS
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="relative inline-block">
                <select
                  value={filterDays}
                  onChange={(e) => setFilterDays(Number(e.target.value))}
                  className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 pr-8 transition-colors hover:bg-gray-100 cursor-pointer"
                >
                  <option value={30}>Last 30 Days</option>
                  <option value={60}>Last 60 Days</option>
                  <option value={90}>Last 90 Days</option>
                  <option value={365}>Last Year</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <ChevronDown className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 pt-0 overflow-y-auto mt-2">
            {renderLogTable(activeTab)}
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50/30">
             {!hasNextPage && logs && logs.length > 0 && (
               <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-semibold italic">End of History</p>
             )}
             {(!logs || logs.length === 0) && !loading && (
               <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-semibold italic">No History Found</p>
             )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

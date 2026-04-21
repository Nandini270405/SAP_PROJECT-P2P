'use client';

import { useOrders } from '@/hooks/useOrders';
import { useNotification } from '@/components/NotificationProvider';
import { 
  FileText, 
  ShoppingCart, 
  Package, 
  CreditCard,
  RefreshCcw,
  TrendingUp,
  Clock,
  Layers,
  BarChart3,
  Award,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export default function Dashboard() {
  const { getStats, stock, isHydrated, resetOrders, approveOrder } = useOrders();
  const { addNotification } = useNotification();
  
  if (!isHydrated) return null;

  const stats = getStats();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all simulation data?')) {
      resetOrders();
      addNotification('Simulation data reset successfully', 'info');
    }
  };

  const statCards = [
    { label: 'Total Requests', value: stats.Requested, icon: <FileText className="text-gray-500" />, color: 'bg-gray-100' },
    { label: 'Total Orders', value: stats.Ordered, icon: <ShoppingCart className="text-blue-500" />, color: 'bg-blue-100' },
    { label: 'Total Received', value: stats.Received, icon: <Package className="text-orange-500" />, color: 'bg-orange-100' },
    { label: 'Total Paid', value: stats.Paid, icon: <CreditCard className="text-green-500" />, color: 'bg-green-100' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black text-[#1d2d3e] tracking-tight">Executive Dashboard</h1>
          <p className="text-gray-500 font-medium">Global Procurement Analytics & Workflow Monitoring</p>
        </div>
        <button 
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all bg-white shadow-sm active:scale-95"
        >
          <RefreshCcw size={14} />
          SYSTEM RESET
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="sap-card p-6 flex items-center justify-between group cursor-default">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-[#1d2d3e] mt-1 tracking-tighter">{stat.value}</p>
            </div>
            <div className={`p-4 rounded-xl ${stat.color} group-hover:rotate-12 transition-transform duration-300`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="sap-card p-8">
            <h2 className="sap-tile-header flex items-center gap-2">
              <TrendingUp size={16} className="text-blue-500" />
              Real-Time Workflow Stage Tracking
            </h2>
            <div className="flex items-center justify-between max-w-2xl mx-auto py-10 relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 -z-0"></div>
              
              {[
                { label: 'PR', status: 'Requested' },
                { label: 'PO', status: 'Ordered' },
                { label: 'GR', status: 'Received' },
                { label: 'IR', status: 'Invoiced' },
                { label: 'FI', status: 'Paid' }
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-700 ${
                    stats[step.status] > 0 
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 rotate-0' 
                      : 'bg-white border border-gray-200 text-gray-300 rotate-12'
                  }`}>
                    {step.label}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-tighter transition-colors ${
                    stats[step.status] > 0 ? 'text-blue-600' : 'text-gray-400'
                  }`}>{step.label} Stage</span>
                  {stats[step.status] > 0 && (
                    <span className="absolute -top-6 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black shadow-sm">
                      {stats[step.status]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="sap-card p-6 border-l-4 border-l-purple-500">
              <h2 className="sap-tile-header flex items-center gap-2">
                <Layers size={16} className="text-purple-500" />
                Material Inventory
              </h2>
              <div className="space-y-5 mt-4">
                {Object.entries(stock).map(([item, qty]) => (
                  <div key={item} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-gray-500">{item}</span>
                      <span className="text-[#1d2d3e]">{qty}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 rounded-full ${qty < 20 ? 'bg-red-500' : 'bg-blue-500'}`} 
                        style={{ width: `${Math.min(100, (qty / 200) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sap-card p-6 border-l-4 border-l-yellow-500">
              <h2 className="sap-tile-header flex items-center gap-2">
                <Award size={16} className="text-yellow-500" />
                Vendor Reliability
              </h2>
              <div className="space-y-3 mt-4">
                {Object.keys(stats.vendorPerformance).length > 0 ? (
                  Object.entries(stats.vendorPerformance).map(([vendor, time]) => (
                    <div key={vendor} className="flex items-center justify-between p-3 bg-[#f5f6f7] rounded-xl border border-gray-100">
                      <span className="text-xs font-bold text-gray-700">{vendor}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-black text-blue-600">{time}m</span>
                          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Avg Latency</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-40 flex flex-col items-center justify-center text-gray-400 text-[10px] font-bold uppercase text-center space-y-2">
                    <AlertCircle size={20} className="opacity-20" />
                    <span>Insufficient Logistics Data</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#1c2d3d] p-8 rounded-2xl shadow-2xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            <h2 className="text-xs font-black opacity-50 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <CreditCard size={14} />
              Balance Settled
            </h2>
            <div className="space-y-1 mb-8">
              <p className="text-4xl font-black tracking-tighter tabular-nums">${stats.TotalSpend.toLocaleString()}</p>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Confirmed Expenditure</p>
            </div>
            
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Awaiting Order</span>
                <span className="text-sm font-black">{stats.PendingOrders}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Verification Due</span>
                <span className="text-sm font-black">{stats.PendingInvoices}</span>
              </div>
            </div>
          </div>

          <div className="sap-card p-6">
            <h2 className="sap-tile-header flex items-center gap-2">
              <AlertCircle size={16} className="text-orange-500" />
              Compliance Alerts
            </h2>
            {stats.PendingApproval > 0 ? (
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-orange-800 font-black text-[10px] uppercase tracking-wider">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                  High Value Release
                </div>
                <p className="text-[11px] text-orange-700 font-medium leading-relaxed">
                  {stats.PendingApproval} transaction(s) exceed standard delegation of authority thresholds ($5,000+).
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 gap-2 text-green-600 bg-green-50/50 rounded-xl border border-green-100/50">
                <CheckCircle size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest">Audit Passed</span>
              </div>
            )}
          </div>

          <div className="sap-card p-6">
            <h2 className="sap-tile-header flex items-center gap-2">
              <BarChart3 size={16} className="text-blue-500" />
              Strategic Spend
            </h2>
            <div className="space-y-4">
              {Object.entries(stats.spendByVendor).sort((a,b) => b[1] - a[1]).map(([vendor, amount]) => (
                <div key={vendor} className="group">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-bold text-gray-600 truncate">{vendor}</span>
                    <span className="text-[11px] font-black text-gray-900">${amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 opacity-30 group-hover:opacity-100 transition-all" 
                      style={{ width: `${Math.min(100, (amount / stats.TotalSpend) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              {Object.keys(stats.spendByVendor).length === 0 && (
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center py-4">No Data</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

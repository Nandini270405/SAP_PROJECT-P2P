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
    <div className="space-y-12 pb-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex justify-between items-end border-b border-gray-200 pb-8">
        <div>
          <h1 className="text-4xl font-black text-[#1d2d3e] tracking-tight mb-2">Executive Command</h1>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-[0.3em]">Real-Time SAP Intelligence</p>
        </div>
        <button 
          onClick={handleReset}
          className="sap-button-gradient flex items-center gap-2 text-xs uppercase"
        >
          <RefreshCcw size={14} />
          Reset Core
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, i) => (
          <div key={i} className="sap-glass-card p-8 group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black text-[#1d2d3e] mt-1 tracking-tighter tabular-nums">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="sap-glass-card p-10">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <TrendingUp size={16} className="text-blue-500" />
                Procurement Lifecycle Progress
              </h2>
              <span className="sap-stat-pill bg-blue-50 text-blue-600">Active Sync</span>
            </div>
            
            <div className="flex items-center justify-between max-w-3xl mx-auto py-12 relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 -z-0 rounded-full"></div>
              
              {[
                { label: 'PR', status: 'Requested' },
                { label: 'PO', status: 'Ordered' },
                { label: 'GR', status: 'Received' },
                { label: 'IR', status: 'Invoiced' },
                { label: 'FI', status: 'Paid' }
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center gap-4 group">
                  <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center font-black text-sm transition-all duration-1000 ${
                    stats[step.status] > 0 
                      ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/40 active-stage' 
                      : 'bg-white border-2 border-gray-100 text-gray-200 group-hover:border-blue-200'
                  }`}>
                    {step.label}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-tighter transition-all ${
                    stats[step.status] > 0 ? 'text-blue-600' : 'text-gray-300'
                  }`}>{step.label} stage</span>
                  {stats[step.status] > 0 && (
                    <span className="absolute -top-8 bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] font-black shadow-lg animate-bounce">
                      {stats[step.status]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="sap-glass-card p-8 border-t-4 border-t-purple-500">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                <Layers size={18} className="text-purple-500" />
                Inventory Assets
              </h2>
              <div className="space-y-6">
                {Object.entries(stock).map(([item, qty]) => (
                  <div key={item} className="space-y-2 group">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-tighter">
                      <span className="text-gray-500 group-hover:text-purple-600 transition-colors">{item}</span>
                      <span className="text-[#1d2d3e]">{qty} Units</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden p-0.5 shadow-inner">
                      <div 
                        className={`h-full transition-all duration-1000 rounded-full ${qty < 20 ? 'bg-gradient-to-r from-red-500 to-orange-400' : 'bg-gradient-to-r from-purple-500 to-blue-500'}`} 
                        style={{ width: `${Math.min(100, (qty / 200) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sap-glass-card p-8 border-t-4 border-t-yellow-500">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                <Award size={18} className="text-yellow-500" />
                Logistic Latency
              </h2>
              <div className="space-y-4">
                {Object.keys(stats.vendorPerformance).length > 0 ? (
                  Object.entries(stats.vendorPerformance).map(([vendor, time]) => (
                    <div key={vendor} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-300">
                      <span className="text-xs font-black text-gray-700">{vendor}</span>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-16 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500" style={{ width: `${Math.min(100, (time/10)*100)}%` }}></div>
                        </div>
                        <span className="text-xs font-black text-blue-600">{time}m</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-44 flex flex-col items-center justify-center gap-4 opacity-30 grayscale">
                    <AlertCircle size={32} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Data Pending</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-[#121c26] p-10 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="relative z-10">
              <h2 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-8">Financial Settlement</h2>
              <div className="space-y-2 mb-10">
                <p className="text-5xl font-black tracking-tighter tabular-nums leading-none">${stats.TotalSpend.toLocaleString()}</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Gross Expenditure</p>
              </div>
              
              <div className="space-y-6 pt-10 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pending Orders</span>
                  </div>
                  <span className="text-lg font-black">{stats.PendingOrders}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Invoices Due</span>
                  </div>
                  <span className="text-lg font-black">{stats.PendingInvoices}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="sap-glass-card p-8 border-l-8 border-l-orange-500">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <AlertCircle size={16} className="text-orange-500" />
              Governance Hub
            </h2>
            {stats.PendingApproval > 0 ? (
              <div className="space-y-4">
                <div className="p-5 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                    <span className="text-[10px] font-black text-orange-800 uppercase tracking-widest">Threshold Breach</span>
                  </div>
                  <p className="text-xs text-orange-900/80 font-bold leading-relaxed italic">
                    {stats.PendingApproval} requisitions require executive override ($5,000+ limit).
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 gap-4 bg-green-500/5 rounded-2xl border border-green-100/50">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-600">
                  <CheckCircle size={32} />
                </div>
                <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Regulatory Clean</span>
              </div>
            )}
          </div>

          <div className="sap-glass-card p-8 border-l-8 border-l-blue-500">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
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

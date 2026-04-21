'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileEdit, 
  ShoppingCart, 
  PackageCheck, 
  Receipt, 
  CreditCard 
} from 'lucide-react';

import CommandBar from './CommandBar';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} />, tcode: '/DB' },
    { label: 'Requisition', path: '/requisition', icon: <FileEdit size={20} />, tcode: 'ME51N' },
    { label: 'Orders', path: '/orders', icon: <ShoppingCart size={20} />, tcode: 'ME21N' },
    { label: 'Goods Receipt', path: '/goods-receipt', icon: <PackageCheck size={20} />, tcode: 'MIGO' },
    { label: 'Invoice', path: '/invoice', icon: <Receipt size={20} />, tcode: 'MIRO' },
    { label: 'Payment', path: '/payment', icon: <CreditCard size={20} />, tcode: 'F-53' },
  ];

  return (
    <div className="w-68 h-[calc(100vh-2rem)] bg-[#121c26]/95 backdrop-blur-xl text-white flex flex-col fixed left-4 top-4 rounded-3xl border border-white/10 shadow-2xl z-40 transition-all duration-500 overflow-hidden">
      <div className="p-8 border-b border-white/5 bg-gradient-to-br from-white/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-xs font-black shadow-lg rotate-3 group-hover:rotate-0 transition-transform">SAP</div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight leading-none">P2P Core</span>
            <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] mt-1">Enterprise</span>
          </div>
        </div>
      </div>
      
      <div className="px-4 mt-4">
        <CommandBar />
      </div>

      <nav className="flex-1 mt-6 overflow-y-auto px-4 space-y-2 pb-8">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 mb-4">Operations Console</p>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`sap-nav-item group ${
                isActive 
                  ? 'sap-nav-item-active text-white' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={`${isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-blue-400'} transition-colors`}>
                {item.icon}
              </span>
              <span className="font-bold text-sm tracking-wide">{item.label}</span>
              {isActive && (
                <div className="absolute right-0 w-1 h-6 bg-blue-500 rounded-l-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
              )}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-6 bg-white/5 backdrop-blur-md">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-tighter text-gray-500">
          <span>Server: PRD-EAST-1</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

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
    <div className="w-64 h-screen bg-[#1c2d3d] text-white flex flex-col fixed left-0 top-0 border-r border-[#2d4154] shadow-2xl z-40">
      <div className="p-6 text-xl font-bold border-b border-[#2d4154] text-blue-300 flex flex-col gap-1 bg-[#1a2836]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-xs">P2P</div>
          <span className="tracking-tight">SAP Simulation</span>
        </div>
        <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-1">Horizon v3.0 | PROD-100</span>
      </div>
      <CommandBar />
      <nav className="flex-1 mt-6 overflow-y-auto px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-600/90 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-gray-400 hover:bg-[#2d4154] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`${isActive ? 'text-white' : 'text-blue-400 group-hover:text-blue-300'}`}>
                  {item.icon}
                </span>
                <span className="font-semibold text-sm">{item.label}</span>
              </div>
              <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${
                isActive ? 'border-blue-400/50 text-blue-200' : 'border-gray-700 text-gray-600'
              }`}>{item.tcode}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 text-[10px] text-gray-600 text-center border-t border-[#2d4154] italic">
        Cloud Operations &copy; 2026 SAP SE
      </div>
    </div>
  );
};

export default Sidebar;

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
    <div className="w-64 h-screen bg-[#354a5f] text-white flex flex-col fixed left-0 top-0">
      <div className="p-6 text-xl font-bold border-b border-[#2a3c4e] text-blue-300 flex flex-col gap-1">
        <span>SAP P2P Sim</span>
        <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">System: PROD-100</span>
      </div>
      <CommandBar />
      <nav className="flex-1 mt-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center justify-between px-6 py-4 transition-colors hover:bg-[#2a3c4e] ${
                isActive ? 'bg-[#2a3c4e] border-r-4 border-blue-400 text-blue-300' : 'text-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </div>
              <span className="text-[9px] font-mono text-gray-500">{item.tcode}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 text-xs text-gray-400 text-center border-t border-[#2a3c4e]">
        &copy; 2026 SAP Simulation
      </div>
    </div>
  );
};

export default Sidebar;

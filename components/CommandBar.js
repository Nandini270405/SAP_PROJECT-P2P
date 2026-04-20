'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal, Command } from 'lucide-react';
import { useNotification } from './NotificationProvider';

const T_CODES = {
  '/DB': '/dashboard',
  'ME51N': '/requisition',
  'ME21N': '/orders',
  'MIGO': '/goods-receipt',
  'MIRO': '/invoice',
  'F-53': '/payment',
  'MM03': '/dashboard', // Placeholder for stock
  'SU01': '/dashboard', // Placeholder for user
};

const CommandBar = () => {
  const [input, setInput] = useState('');
  const router = useRouter();
  const { addNotification } = useNotification();

  const handleCommand = (e) => {
    e.preventDefault();
    let cmd = input.toUpperCase().trim();
    let newTab = false;

    if (cmd.startsWith('/N')) {
      newTab = true;
      cmd = cmd.slice(2).trim();
    }
    
    if (T_CODES[cmd]) {
      if (newTab) {
        window.open(T_CODES[cmd], '_blank');
        addNotification(`Opening ${cmd} in new tab`, 'info');
      } else {
        router.push(T_CODES[cmd]);
        addNotification(`Navigating to ${cmd}`, 'info');
      }
      setInput('');
    } else {
      addNotification(`Invalid T-Code: ${cmd}`, 'error');
    }
  };

  return (
    <div className="px-4 py-3 border-b border-[#2a3c4e] bg-[#2a3c4e]/50">
      <form onSubmit={handleCommand} className="relative group">
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-blue-300 transition-colors">
          <Terminal size={14} />
        </div>
        <input 
          type="text" 
          placeholder="Enter T-Code (e.g. ME51N)"
          className="w-full bg-[#1c2935] border border-[#3d5a75] rounded px-8 py-1.5 text-xs text-blue-300 font-mono focus:outline-none focus:border-blue-400 placeholder:text-gray-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <Command size={12} className="text-gray-600" />
        </div>
      </form>
    </div>
  );
};

export default CommandBar;

'use client';

import { X, Printer, Download } from 'lucide-react';

const DocumentModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const isPO = order.status === 'Ordered' || order.status === 'Received';
  const isInvoice = order.status === 'Invoiced' || order.status === 'Paid';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-800">
              {isPO ? 'Purchase Order' : isInvoice ? 'Commercial Invoice' : 'Document View'}
            </h3>
            <span className="text-xs font-mono bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
              {order.transactionId}
            </span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 font-serif" id="printable-doc">
          <div className="flex justify-between mb-8">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-blue-900">SAP P2P CORP</h1>
              <p className="text-xs text-gray-500 uppercase tracking-tighter">Enterprise Procurement Division</p>
              <div className="pt-4 text-sm text-gray-600">
                <p>123 ERP Avenue, Tech City</p>
                <p>Digital State, 56789</p>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-bold mb-4 uppercase tracking-widest">
                {order.status}
              </div>
              <p className="text-sm text-gray-500 font-sans">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500 font-sans">Doc #: {order.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8 border-t border-b border-gray-100 py-6">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 font-sans">Ship To:</h4>
              <div className="text-sm text-gray-800 leading-relaxed">
                <p className="font-bold">Central Warehouse A1</p>
                <p>Unit 45, Logi-Park</p>
                <p>Sector 9, Digital Hub</p>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 font-sans">Vendor:</h4>
              <div className="text-sm text-gray-800 leading-relaxed">
                <p className="font-bold">{order.vendor}</p>
                <p>Approved SAP Partner</p>
                <p>Certified Supplier Network</p>
              </div>
            </div>
          </div>

          <table className="w-full text-left mb-12">
            <thead className="border-b-2 border-gray-800">
              <tr>
                <th className="py-2 text-xs font-bold uppercase font-sans">Description</th>
                <th className="py-2 text-xs font-bold uppercase font-sans text-right">Quantity</th>
                <th className="py-2 text-xs font-bold uppercase font-sans text-right">Price</th>
                <th className="py-2 text-xs font-bold uppercase font-sans text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-4 text-sm font-bold">{order.itemName}</td>
                <td className="py-4 text-sm text-right">{order.quantity}</td>
                <td className="py-4 text-sm text-right">${order.price.toLocaleString()}</td>
                <td className="py-4 text-sm text-right font-bold">${(order.price * order.quantity).toLocaleString()}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-800">
                <td colSpan="3" className="py-4 text-sm font-bold text-right uppercase font-sans">Grand Total</td>
                <td className="py-4 text-lg font-black text-right">${(order.price * order.quantity).toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>

          <div className="bg-gray-50 p-4 rounded text-[10px] text-gray-500 font-sans space-y-1">
            <p>1. This is a computer-generated document for SAP Simulation purposes.</p>
            <p>2. Subject to standard ERP procurement terms and conditions.</p>
            <p>3. Electronic verification ID: {order.transactionId}-{order.id}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Printer size={16} />
            Print
          </button>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentModal;

'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'sap_p2p_orders';

export const MASTER_DATA = {
  vendors: [
    { id: 'V100', name: 'Dell Technologies', terms: 'Net 30' },
    { id: 'V200', name: 'Microsoft Corporation', terms: 'Net 15' },
    { id: 'V300', name: 'Amazon Web Services', terms: 'Due on Receipt' },
    { id: 'V400', name: 'Apple Inc.', terms: 'Net 45' },
  ],
  materials: [
    { id: 'M001', name: 'Laptops - Latitude 5000', price: 1200 },
    { id: 'M002', name: 'Cloud Server Instance', price: 500 },
    { id: 'M003', name: 'Software License - ERP', price: 2500 },
    { id: 'M004', name: 'Peripheral - Monitor 4K', price: 350 },
  ],
  costCenters: [
    { id: '1000', name: 'IT Infrastructure' },
    { id: '2000', name: 'Finance & Accounts' },
    { id: '3000', name: 'Human Resources' },
    { id: '4000', name: 'Marketing & Sales' },
  ]
};

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [stock, setStock] = useState({});
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const storedStock = localStorage.getItem('sap_p2p_stock');
    if (stored) {
      try {
        setOrders(JSON.parse(stored));
      } catch (e) {
        setOrders([]);
      }
    }
    if (storedStock) {
      try {
        setStock(JSON.parse(storedStock));
      } catch (e) {
        setStock({});
      }
    } else {
      // Initial stock
      const initialStock = {};
      MASTER_DATA.materials.forEach(m => initialStock[m.name] = 50);
      setStock(initialStock);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever orders or stock change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
      localStorage.setItem('sap_p2p_stock', JSON.stringify(stock));
    }
  }, [orders, stock, isHydrated]);

  const addOrder = (orderData) => {
    const id = Date.now();
    const total = orderData.price * orderData.quantity;
    const requiresApproval = total > 5000;
    
    const newOrder = {
      ...orderData,
      id: id,
      transactionId: `PR-${id.toString().slice(-4)}`,
      status: 'Requested',
      approvalStatus: requiresApproval ? 'Pending Approval' : 'Approved',
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [...prev, newOrder]);
    return newOrder.transactionId;
  };

  const approveOrder = (id) => {
    setOrders((prev) =>
      prev.map((order) => 
        order.id === id ? { ...order, approvalStatus: 'Approved' } : order
      )
    );
  };

  const updateStatus = (id, newStatus, extraData = {}) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === id) {
          const updated = { ...order, status: newStatus, ...extraData };
          
          if (newStatus === 'Ordered') {
            updated.transactionId = updated.transactionId.replace('PR', 'PO');
            updated.orderedAt = new Date().toISOString();
          }
          if (newStatus === 'Received') {
            updated.transactionId = updated.transactionId.replace('PO', 'GR');
            updated.receivedAt = new Date().toISOString();
            
            // Update stock if it's a known material
            if (updated.itemCategory === 'Stock Material') {
              setStock(prevStock => ({
                ...prevStock,
                [updated.itemName]: (prevStock[updated.itemName] || 0) + Number(updated.quantity)
              }));
            }
          }
          if (newStatus === 'Invoiced') updated.transactionId = updated.transactionId.replace('GR', 'INV');
          if (newStatus === 'Paid') updated.transactionId = updated.transactionId.replace('INV', 'PAY');
          return updated;
        }
        return order;
      })
    );
  };

  const resetOrders = () => {
    setOrders([]);
    const initialStock = {};
    MASTER_DATA.materials.forEach(m => initialStock[m.name] = 50);
    setStock(initialStock);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('sap_p2p_stock');
  };

  const getStats = () => {
    const counts = {
      Requested: 0,
      Ordered: 0,
      Received: 0,
      Invoiced: 0,
      Paid: 0,
      PendingApproval: 0,
      Total: orders.length,
      TotalSpend: 0,
      PendingOrders: 0,
      PendingInvoices: 0,
      spendByVendor: {},
      vendorPerformance: {}, // Average delivery time in ms
    };
    
    orders.forEach((o) => {
      counts[o.status]++;
      if (o.approvalStatus === 'Pending Approval' && o.status === 'Requested') {
        counts.PendingApproval++;
      }
      
      if (o.status === 'Paid') {
        const amount = (o.price * o.quantity);
        counts.TotalSpend += amount;
        counts.spendByVendor[o.vendor] = (counts.spendByVendor[o.vendor] || 0) + amount;
      }
      
      if (o.status === 'Requested') counts.PendingOrders++;
      if (o.status === 'Invoiced') counts.PendingInvoices++;

      // Calculate delivery time if received
      if (o.orderedAt && o.receivedAt) {
        const diff = new Date(o.receivedAt) - new Date(o.orderedAt);
        if (!counts.vendorPerformance[o.vendor]) {
          counts.vendorPerformance[o.vendor] = { totalTime: 0, count: 0 };
        }
        counts.vendorPerformance[o.vendor].totalTime += diff;
        counts.vendorPerformance[o.vendor].count += 1;
      }
    });

    // Finalize vendor performance averages
    Object.keys(counts.vendorPerformance).forEach(vendor => {
      const perf = counts.vendorPerformance[vendor];
      counts.vendorPerformance[vendor] = Math.round(perf.totalTime / perf.count / (1000 * 60)); // Minutes
    });
    
    return counts;
  };

  return {
    orders,
    stock,
    addOrder,
    approveOrder,
    updateStatus,
    resetOrders,
    getStats,
    isHydrated,
    masterData: MASTER_DATA,
  };
};

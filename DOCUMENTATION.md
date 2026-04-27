# SAP Procure-to-Pay (P2P) Management System — Documentation

## 1. Project Overview
The **SAP P2P Management System** is a web simulation of the standard SAP "Procure-to-Pay" business process. Built with **Next.js 15**, this application demonstrates the end-to-end lifecycle of corporate procurement, from the initial identification of a need to the final financial settlement.

### Objective
The primary goal is to simulate the structured, status-driven environment of an Enterprise Resource Planning (ERP) system, enforcing business rules, master data governance, and financial accountability.

---

## 2. Core Business Process (The P2P Lifecycle)
The system strictly enforces a 5-step workflow. No steps can be skipped, ensuring a complete audit trail for every transaction.

1.  **Purchase Requisition (PR)**: Identification of a requirement for materials or services.
2.  **Purchase Order (PO)**: Formalizing the request into a legal contract with a vendor.
3.  **Goods Receipt (GR)**: Confirming the physical delivery of items.
4.  **Invoice Verification (IR)**: Matching the vendor's bill against the received goods.
5.  **Payment (FI)**: The final financial settlement of the liability.

---

## 3. Key ERP Features & Logic

### A. Master Data Governance
In real SAP, users don't type data manually; they select from "Master Records." Our system implements:
- **Material Master**: Pre-defined items (Laptops, Cloud Servers) with standard pricing.
- **Vendor Master**: A database of approved suppliers (Dell, Microsoft, Amazon) with unique IDs.
- **Cost Center Master**: Pre-defined internal departments (IT, Finance, HR) for budget allocation.

### B. Stock vs. Non-Stock Procurement
The system handles two distinct procurement types in the Requisition (ME51N) stage:
- **Stock Items**: Items selected from the Material Master. Pricing is locked/auto-filled, and they are destined for warehouse inventory.
- **Manual Entry (Non-Stock)**: For services or unique items not in the database. 
    - *SAP Business Rule*: Manual entries **must** be assigned to a **Cost Center** (Account Assignment Category 'K') to ensure the expense is charged to a specific department's budget.

### C. SAP T-Code Command Bar
To mimic the power-user experience of SAP, a **Command Bar** is integrated into the sidebar. Users can navigate the system using standard SAP Transaction Codes:
- `ME51N`: Create Requisition
- `ME21N`: Create Purchase Order
- `MIGO`: Goods Receipt
- `MIRO`: Invoice Verification
- `F-53`: Post Outgoing Payments
- `/DB`: Dashboard

### D. Transaction ID Mapping
IDs dynamically change prefixes as they move through the lifecycle, providing a realistic SAP document flow:
- `PR-xxxx` (Requisition) $\rightarrow$ `PO-xxxx` (Order) $\rightarrow$ `GR-xxxx` (Receipt) $\rightarrow$ `INV-xxxx` (Invoice) $\rightarrow$ `PAY-xxxx` (Payment)

---

## 4. Page-by-Page Breakdown

### Dashboard (`/dashboard`)
- **Executive Summary**: 4 KPIs showing total counts at each stage.
- **Financial Analytics**: Displays "Total Spend" (sum of all 'Paid' items).
- **Spend by Vendor**: A breakdown of expenditure per supplier.
- **Workflow Tracker**: A visual progress bar showing how many items are currently at each stage of the P2P cycle.
- **Reset System**: Capability to clear all `localStorage` data for a fresh simulation.

### Purchase Requisition (`/requisition` - ME51N)
- Supports both "Master Data" selection and "Manual Entry."
- Enforces mandatory Cost Center assignment for non-stock items.
- Auto-calculates totals based on quantity and unit price.

### Purchase Orders (`/orders` - ME21N)
- **Conversion Engine**: Allows "Converting" a PR into a PO.
- **Document Output**: Features a **"View PO"** button that generates a professional, printable Purchase Order document with corporate branding and ship-to details.

### Goods Receipt (`/goods-receipt` - MIGO)
- Users confirm that items have physically arrived.
- Updates the status to "Received," which is the trigger for the finance department to expect an invoice.

### Invoice Verification (`/invoice` - MIRO)
- The "Three-Way Match" simulation. Users verify the vendor's invoice against the Goods Receipt.
- Ensures the price and quantity billed match what was received.

### Payments (`/payment` - F-53)
- Lists all verified invoices awaiting payment.
- **Payment Methods**: Users must select a method (UPI or Card) to finalize the transaction.
- Maintains a "Payment History" log of all settled debts.

---

## 5. Technical Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS (Utility-first CSS for a clean, professional UI)
- **State Management**: React `useState` & `useEffect` hooks.
- **Data Persistence**: `localStorage`. All data is synced to the browser's storage, allowing work to persist after refreshes.
- **Icons**: Lucide-react.

### Data Model
```javascript
{
  id: number,              // Unique Internal ID
  transactionId: string,   // SAP-style ID (e.g., PO-1234)
  itemName: string,        // Description or Material Name
  itemCategory: string,    // Stock Material vs Non-Stock
  quantity: number,
  vendor: string,
  price: number,
  costCenter?: string,     // Optional for stock, required for non-stock
  status: string,          // Workflow stage
  paymentMethod?: string,  // Added at final stage
  createdAt: string        // Timestamp
}
```

### Global Storage Hook (`useOrders.js`)
A centralized custom hook manages all logic. It provides:
- Filtering logic for each stage.
- Status transition methods.
- Calculation of analytics (Spend by Vendor, Pending Actions).
- Syncing with `localStorage`.

---

## 6. How to Run
1.  Ensure **Node.js** is installed.
2.  Run `npm install` to install dependencies.
3.  Run `npm run dev` to start the development server.
4.  Open `http://localhost:3000` in your browser.

---

## 7. Conclusion
This project connects web development concepts with enterprise business logic. It demonstrates practical work with the **Next.js** ecosystem and an academic understanding of **Procurement Operations** and **ERP Systems Architecture**.

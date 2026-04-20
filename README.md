# SAP Procure-to-Pay (P2P) Management System Simulation

A high-fidelity web application built with **Next.js 15** that simulates the core SAP Procure-to-Pay (P2P) business process. This project demonstrates enterprise-level workflow integration, master data governance, and financial internal controls.

---

## 🚀 Overview

This system provides a structured, status-based environment mirroring the SAP MM (Materials Management) and FI (Financial Accounting) modules. It enforces a strict procurement lifecycle, ensuring data integrity and financial accountability at every stage.

## 🌐 Live Demo

The application is deployed and accessible online:

👉 https://sap-p2p.vercel.app/

Users can explore the full Procure-to-Pay workflow, including requisition creation, order processing, goods receipt, invoice verification, and payment simulation.


### The P2P Lifecycle:
`Purchase Requisition (PR)` ➔ `Purchase Order (PO)` ➔ `Goods Receipt (GR)` ➔ `Invoice Verification (IR)` ➔ `Payment (FI)`

---

## ✨ Key Features

### 🔹 SAP-Standard Business Logic
- **Master Data Governance:** Utilizes centralized Material Master, Vendor Master, and Cost Center records to eliminate manual data entry errors.
- **Account Assignment (Category K):** Implements complex ERP logic where non-stock/service items MUST be assigned to a specific department's Cost Center budget.
- **Three-Way Match:** A critical financial control that ensures invoices are only verified if they match the original Purchase Order and the confirmed Goods Receipt.

### 🔹 Advanced User Experience
- **SAP T-Code Engine:** Navigate the system using industry-standard transaction codes via a functional command bar:
  - `ME51N` (Requisition)
  - `ME21N` (Orders)
  - `MIGO` (Goods Receipt)
  - `MIRO` (Invoice)
  - `F-53` (Payments)
  - `/DB` (Dashboard)
- **Document Generation:** Real-time generation of professional, printable Purchase Order documents with corporate branding.
- **Dynamic Analytics:** Executive dashboard tracking "Total Spend," "Spend by Vendor," and real-time workflow bottlenecks.

### 🔹 Technical Highlights
- **Persistence:** All transaction data is stored in `localStorage`, ensuring the "Company's" data persists across browser refreshes.
- **Responsive UI:** Built with **Tailwind CSS** for a clean, professional, enterprise-grade aesthetic.
- **Toast Notifications:** Immediate feedback for all business actions.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** JavaScript (React.js)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** React Hooks (useState, useEffect)
- **Storage:** Web Storage API (LocalStorage)

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (Routes)
│   ├── dashboard/        # Executive Analytics
│   ├── requisition/      # PR Creation (ME51N)
│   ├── orders/           # PO Management (ME21N)
│   ├── goods-receipt/    # Logistics (MIGO)
│   ├── invoice/          # Accounting (MIRO)
│   └── payment/          # Finance (F-53)
├── components/           # Reusable UI Components
│   ├── Sidebar.js        # Navigation & Command Bar
│   ├── DataTable.js      # Global Searchable Tables
│   └── DocumentModal.js  # PO Document Generation
├── hooks/                # Custom React Hooks
│   └── useOrders.js      # Centralized P2P Business Logic
└── public/               # Static Assets
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation & Running

1. **Clone the repository:**
   ```bash
   git clone https://github.com/the-raja/Sap-p2p.git
   cd Sap-p2p
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Business Rules Implemented

1. **No Step-Skipping:** An item cannot be received if it hasn't been ordered. It cannot be paid if the invoice hasn't been verified.
2. **Accounting Integrity:** Manual text entries (Non-stock) trigger a mandatory Cost Center selection field.
3. **Master Data Sync:** Prices for Stock Items are automatically pulled from the Material Master and cannot be manually altered by the user (simulating Info Records).
4. **Document Mapping:** IDs evolve through the lifecycle (e.g., `PR-1001` becomes `PO-1001` once converted).

---

## 📄 Documentation

For a detailed breakdown of the system architecture and academic report, please refer to:
- [Technical Documentation](./DOCUMENTATION.md)

---


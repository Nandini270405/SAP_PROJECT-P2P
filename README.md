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

### 🔹 Enterprise Business Logic
- **Release Strategy (Approvals):** Implements a high-value financial control where any requisition exceeding $5,000 triggers a mandatory "Pending Approval" state, requiring executive release before ordering.
- **Inventory & Stock Management:** Integrated virtual warehouse that automatically updates stock levels upon Goods Receipt (MIGO), allowing for real-time inventory tracking.
- **Vendor Performance Analytics:** Advanced logic calculates delivery "Lead Times" for every vendor, providing a reliability score based on the speed from Order to Receipt.
- **Three-Way Match:** Strict accounting control ensuring Invoices (MIRO) are only verified if they align perfectly with the original Purchase Order and confirmed Goods Receipt.
- **Account Assignment (Category K):** Enforces mandatory Cost Center allocation for all non-stock/service items to ensure departmental budget accountability.

### 🔹 Advanced User Experience
- **Next-Gen SAP Horizon UI:** A premium design system featuring **High-Contrast Glassmorphism**, floating navigation consoles, and micro-interactions.
- **SAP T-Code Engine:** Navigate the entire system using standard transaction codes (e.g., `ME51N`, `MIGO`, `MIRO`, `F-53`) via a functional command terminal.
- **Multi-Tab Terminal Support:** Support for the `/N` prefix (e.g., `/NME21N`) allows power users to open transactions in new browser tabs simultaneously.
- **Enterprise Reporting:** One-click **Export to CSV** functionality on all data tables for external audit and procurement reporting.

### 🔹 Technical Core
- **Client-Side Persistence:** Utilizing the Web Storage API (LocalStorage) to maintain a persistent corporate environment that survives browser refreshes.
- **Visual Intelligence:** Executive dashboard with dynamic SVG/CSS visualizations for Spend, Inventory, and Logistic Latency.
- **Modern Stack:** Built with **Next.js 15 (App Router)** and **Tailwind CSS** for maximum performance and a responsive, enterprise-grade aesthetic.

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


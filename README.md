# SAP Procure-to-Pay (P2P) Management System Simulation

A web-based academic project built with Next.js 15 to simulate the core SAP Procure-to-Pay business process. The application demonstrates how purchase requisitions, purchase orders, goods receipts, invoice verification, and payment activities can be represented in a structured workflow.

## Overview

The system models a status-driven procurement lifecycle inspired by SAP MM (Materials Management) and FI (Financial Accounting) processes. It focuses on workflow continuity, basic master data usage, internal controls, and transaction visibility across the P2P cycle.

The P2P lifecycle used in this project is:

```text
Purchase Requisition (PR) -> Purchase Order (PO) -> Goods Receipt (GR) -> Invoice Verification (IR) -> Payment (FI)
```

## Features

- Release strategy simulation for requisitions above $5,000.
- Stock and non-stock procurement flows.
- Mandatory cost center assignment for non-stock or service items.
- Purchase requisition to purchase order conversion.
- Goods receipt confirmation and inventory update simulation.
- Three-way match concept for purchase order, goods receipt, and invoice verification.
- Payment processing simulation with payment history.
- SAP-style transaction code navigation, including `ME51N`, `ME21N`, `MIGO`, `MIRO`, and `F-53`.
- Dashboard summaries for workflow status, spend, vendor activity, and pending actions.
- CSV export support for table data.
- Browser-based persistence using `localStorage`.

## Tech Stack

- Framework: [Next.js 15](https://nextjs.org/) with App Router
- Language: JavaScript and React
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- Icons: [Lucide React](https://lucide.dev/)
- State management: React hooks
- Storage: Web Storage API (`localStorage`)

## Installation

### Prerequisites

- Node.js 18 or higher
- npm

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Nandini270405/SAP_PROJECT-P2P.git
   cd SAP_PROJECT-P2P
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the application:

   ```text
   http://localhost:3000
   ```

## Project Structure

```text
├── app/                  # Next.js App Router pages
│   ├── dashboard/        # Dashboard and analytics
│   ├── requisition/      # Purchase requisition workflow
│   ├── orders/           # Purchase order workflow
│   ├── goods-receipt/    # Goods receipt workflow
│   ├── invoice/          # Invoice verification workflow
│   └── payment/          # Payment workflow
├── components/           # Reusable UI components
│   ├── Sidebar.js
│   ├── CommandBar.js
│   ├── DataTable.js
│   ├── DocumentModal.js
│   └── StatusBadge.js
├── hooks/                # Shared React hooks
│   └── useOrders.js
├── public/               # Static assets
└── DOCUMENTATION.md      # Detailed project documentation
```

## Routes and Pages

- `/` - Landing page for the P2P simulation.
- `/dashboard` - Summary cards, spend analysis, vendor analytics, and workflow status.
- `/requisition` - Create purchase requisitions using stock or non-stock items.
- `/orders` - Convert eligible requisitions into purchase orders and view PO documents.
- `/goods-receipt` - Record goods receipt for ordered items.
- `/invoice` - Verify invoices using the three-way match concept.
- `/payment` - Process verified invoices and view payment history.

## Usage

Use the sidebar or command bar to move through the procurement lifecycle. Create a requisition, convert it to a purchase order, confirm goods receipt, verify the invoice, and complete payment. The project stores data in the browser, so transactions remain available after refresh until the local data is reset.

## Business Rules Implemented

1. Items must move through the workflow in sequence.
2. Non-stock and service items require a cost center.
3. Stock item prices are filled from the material data used by the app.
4. Transaction IDs change as records move through the lifecycle, for example `PR-1001` to `PO-1001`.
5. Invoices are verified only after the related goods receipt exists.

## Documentation

Additional project material is available in:

- [Technical Documentation](./DOCUMENTATION.md)
- [Project Documentation PDF](./PROJECT_DOCUMENTATION.pdf)

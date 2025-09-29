# Annaml Accounting System

Annaml Accounting is a modern, web-based accounting system built with React, TypeScript, and Tailwind CSS. It features a comprehensive dashboard, transaction management with AI-powered categorization, detailed modules for sales and purchases, and extensive setup options.

## ✨ Key Features

The application is structured into several modules, many of which are fully functional:

- **Dashboard**: A welcoming landing page with a dynamic particle effect background.
- **Setup Module**:
  - **Company**: Configure company settings, profile, and taxpayer information.
  - **General**: Manage yearbooks, account numbering rules, classifications, chart of accounts, and departments.
  - **Linked Accounts**: Set up default accounts for various processes.
  - **Taxes**: Define and manage tax codes and their linked accounts.
- **Sales Module**:
  - Includes placeholders for managing customers, sales orders, invoices, and more.
- **Purchases Module (Fully Functional)**:
  - **Vendors**: A complete CRUD interface for adding and listing vendors.
  - **Purchase Orders**: Create, manage, and track purchase orders.
  - **Purchase Invoices**: Record and manage invoices received from vendors.
  - **Payments & Prepayments**: Record payments made to vendors and apply them to outstanding invoices (simulated).
  - **Payment Expenses**: A dedicated interface for recording and tracking miscellaneous expenses.
- **General Journals**:
  - A functional interface for creating balanced debit/credit journal entries.
- **Reports**:
  - A dynamic **Income Statement** with a pie chart for expense breakdown powered by Recharts.
  - Placeholders for General Ledger, Trial Balance, Balance Sheet, and Cashflow reports.
- **AI Integration**:
  - **Smart Transaction Categorization**: When adding a transaction, the description is sent to the **Google Gemini API** to automatically suggest a relevant category.

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (`@google/genai`)
- **Charting**: Recharts
- **Environment**: Runs directly in the browser using ES Modules and an `importmap` for dependency management, requiring no local build step.

## 📁 Project Structure

The codebase is organized logically to separate concerns and improve maintainability.

```
/
├── components/
│   ├── icons/         # SVG icon components
│   ├── layout/        # Main layout components (Navbar, Header)
│   ├── pages/         # Top-level components for each page, organized by module
│   │   ├── purchases/ # Functional purchase module components
│   │   ├── sales/     # Placeholder sales module components
│   │   ├── setup/     # Functional setup module components
│   │   └── ...
│   └── ui/            # Reusable UI elements (Button, Input, Modal)
├── context/
│   └── DataContext.tsx  # Global state management with React Context
├── data/
│   └── mockData.ts    # Centralized mock data for the entire application
├── hooks/
│   └── useData.ts     # Custom hook to access DataContext
├── services/
│   └── geminiService.ts # Service for interacting with the Gemini API
├── App.tsx              # Main component with page routing logic
├── types.ts             # TypeScript type and interface definitions
├── index.html           # Entry point with importmap for dependencies
└── index.tsx            # React application root
```

## ⚙️ Core Functionality Explained

### State Management (`DataContext.tsx`)

The application uses React's Context API for global state management. `DataContext` provides mock data (vendors, accounts, etc.) and functions (`addVendor`, `addTransaction`) to all components wrapped within its provider. This approach centralizes data logic and makes it easy to access and modify state from anywhere in the app.

### View Switching

Many components, such as `Vendors.tsx`, `PurchaseOrders.tsx`, and `Payments.tsx`, use local state (`useState`) to switch between a `list` view and a `form` view. This creates a seamless single-page experience for viewing data and creating new entries without navigating to a different URL.

### AI-Powered Categorization (`geminiService.ts`)

To enhance user experience, the "Add Transaction" form leverages the Gemini API. When a user enters a description and moves to the next field, the `categorizeTransaction` function sends the description to the `gemini-2.5-flash` model. The model is prompted to return one of a predefined list of categories, which is then automatically selected in the form's category dropdown.

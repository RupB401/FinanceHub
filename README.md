# FinanceHub

A modern, responsive financial dashboard web application built with React and Vite. FinanceHub helps users track income, expenses, and financial transactions with powerful visualization tools, role-based access control, and real-time insights.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Architecture & Approach](#architecture--approach)
- [Development Guide](#development-guide)
- [Build & Deployment](#build--deployment)

---

## Project Overview

**FinanceHub** is a comprehensive financial management application designed to help users gain insights into their financial health. The application provides:

- **User Authentication**: Secure login and session management
- **Financial Tracking**: Add, manage, and categorize financial transactions
- **Data Visualization**: Interactive charts showing financial trends and patterns
- **Role-Based Access**: Admin and user roles with different permission levels
- **Multi-Currency Support**: View financial data in different currencies
- **Advanced Analytics**: Gain actionable insights from transaction data
- **Dark/Light Theme**: Responsive UI with customizable appearance

---

## Key Features

### 1. **Financial Dashboard**
- **Summary Cards**: At-a-glance view of total income, expenses, and balance
- **Transaction Management**: Add, view, edit, and delete financial transactions
- **Visual Analytics**: Interactive charts using Recharts for trend analysis
- **Role-Based Controls**: Admin users can clear data and manage permissions
- **Insights Section**: AI-powered or calculated insights based on transaction patterns
- **Data Export**: Export transactions to CSV or other formats

### 2. **Authentication & Security**
- Secure user login with session persistence
- Protected routes requiring authentication
- Automatic session management with timeout handling
- Cookie-based session storage
- Error boundary protection from component crashes

### 3. **User Experience**
- **Dark/Light Theme**: Toggle between themes with persistent preferences
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Animated Landing Page**: Engaging particle effects on the home page
- **Currency Selection**: Support for multiple currencies (₹, $, €, ¥, etc.)
- **Notifications**: Real-time feedback for user actions
- **Accessibility**: Semantic HTML and keyboard navigation

### 4. **Analytics & Reporting**
- Dedicated Analytics page for in-depth financial analysis
- Visual representations using interactive charts
- Transaction history and filtering
- Financial insights generation and trend analysis

---

## Tech Stack

### Frontend Framework
- **React 19**: Modern UI library with hooks and context API
- **Vite 7**: Lightning-fast build tool with HMR
- **React Router 7**: Client-side routing for multi-page navigation

### Styling & UI
- **Tailwind CSS 3**: Utility-first CSS framework
- **DaisyUI 5**: Pre-built UI components for Tailwind
- **React Icons 5**: Comprehensive icon library

### State Management & Data Fetching
- **React Context API**: Global state management (Auth, Theme, Currency, Financial Data)
- **React Query (TanStack) 5**: Server state management with caching and synchronization
- **Axios**: HTTP client for API requests

### Visualization
- **Recharts 3**: Composable React charting library
- **React Particles**: Animated particle effects for landing page

### Development Tools
- **ESLint**: Code quality and style enforcement
- **PostCSS & Autoprefixer**: CSS processing and browser compatibility

---

## Setup Instructions

### Prerequisites
- **Node.js**: v16 or higher
- **npm** or **yarn**: Package manager
- **Backend Server**: Running at `http://localhost:8000`

### Installation Steps

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   - The application assumes the backend API is running at `http://localhost:8000`
   - API requests are proxied through Vite dev server (see `vite.config.js`)

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   - Application will be available at `http://localhost:5173`
   - Hot Module Replacement (HMR) enabled for live code updates

5. **Build for production**:
   ```bash
   npm run build
   ```
   - Output generated in the `dist/` folder
   - Optimized and minified for production deployment

6. **Preview production build**:
   ```bash
   npm run preview
   ```

7. **Lint code**:
   ```bash
   npm run lint
   ```
   - Checks code quality and style against ESLint rules

### Quick Start with Batch Script (Windows)
On Windows, you can use the provided batch script:
```bash
./start-dev.bat
```

---

## Project Structure

```
Frontend/
├── public/                          # Static assets
│   └── _redirects                   # Netlify redirects config
├── src/
│   ├── components/                  # Reusable React components
│   │   ├── AnalyticsPage.jsx        # Analytics dashboard page
│   │   ├── CurrencySelector.jsx     # Currency switcher component
│   │   ├── ErrorBoundary.jsx        # Error boundary for error handling
│   │   ├── FinancialDashboard.jsx   # Main financial dashboard
│   │   ├── Footer.jsx               # Application footer
│   │   ├── LandingPage.jsx          # Home/landing page with animations
│   │   ├── Login.jsx                # User login form
│   │   ├── LoginAlert.jsx           # Alert notifications
│   │   ├── Nav.jsx                  # Navigation bar
│   │   ├── ProtectedRoute.jsx       # Route guard for authentication
│   │   ├── SessionManager.jsx       # Session timeout management
│   │   ├── Theme.jsx                # Theme provider wrapper
│   │   ├── TitleBar.jsx             # Application header/title bar
│   │   └── FinancialDashboard/      # Financial dashboard sub-components
│   │       ├── AddTransactionModal.jsx
│   │       ├── ExportModal.jsx
│   │       ├── FinancialCharts.jsx
│   │       ├── InsightsSection.jsx
│   │       ├── RoleSelector.jsx
│   │       ├── SummaryCards.jsx
│   │       └── TransactionsSection.jsx
│   ├── contexts/                    # React Context providers
│   │   ├── AuthContext.jsx          # Authentication state
│   │   ├── CurrencyContext.jsx      # Currency selection state
│   │   ├── FinancialDashboardContext.jsx  # Financial data state
│   │   ├── NotificationContext.jsx  # Notifications management
│   │   └── ThemeContext.jsx         # Dark/light theme state
│   ├── services/                    # API service layer
│   │   ├── earningsService.js       # Earnings-related API calls
│   │   ├── screenerService.js       # Screener API calls
│   │   └── stockApi.js              # Stock/financial API calls
│   ├── utils/                       # Utility functions
│   │   ├── cookieManager.js         # Cookie handling utilities
│   │   └── sessionManager.js        # Session handling utilities
│   ├── data/
│   │   └── mockFinancialData.js     # Mock data for development
│   ├── assets/                      # Images, fonts, etc.
│   ├── App.jsx                      # Main application component
│   ├── App.css                      # Application-level styles
│   ├── main.jsx                     # React DOM entry point
│   └── index.css                    # Global styles
├── eslint.config.js                 # ESLint configuration
├── vite.config.js                   # Vite configuration with API proxy
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── package.json                     # Project metadata and dependencies
├── package-lock.json                # Locked dependency versions
└── README.md                        # This file
```

---

## Architecture & Approach

### Design Patterns

#### 1. **Context API for Global State**
The application uses React Context to manage global state across the application:

- **AuthContext**: Manages user authentication state and login/logout
- **ThemeContext**: Manages dark/light theme preference
- **CurrencyContext**: Manages selected currency for display
- **FinancialDashboardContext**: Manages financial data, transactions, and insights
- **NotificationContext**: Manages user notifications and alerts

This approach eliminates prop drilling and keeps state management simple for a medium-sized application.

#### 2. **React Query for Server State**
React Query (TanStack Query) handles:
- API request caching and synchronization
- Smart retry logic with exponential backoff
- Stale data management
- Automatic request deduplication

Configuration example from `App.jsx`:
```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on auth errors
        if (error?.message?.includes("Authentication")) return false;
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      staleTime: 10000,
    },
  },
});
```

#### 3. **Service Layer Architecture**
API calls are centralized in the `services/` directory:
- **earningsService.js**: Earnings and income endpoints
- **screenerService.js**: Stock screener functionality
- **stockApi.js**: Stock market data and financial instruments

This separates API logic from components, making it easier to:
- Test components in isolation
- Refactor API endpoints without touching UI code
- Reuse API calls across multiple components

#### 4. **Protected Routes with Role-Based Access**
The **ProtectedRoute** component guards authenticated pages:
- Requires valid user session
- Redirects to login if not authenticated
- Role-based access control for admin features

#### 5. **Error Handling**
- **ErrorBoundary Component**: Catches React component errors and displays fallback UI
- **React Query Retry Logic**: Automatic retry for failed requests
- **Session Management**: Monitors session validity and handles timeouts

### API Integration

The application proxies API requests to the backend:

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

**Request Flow:**
1. Frontend makes request to `/api/endpoint`
2. Vite proxy intercepts and forwards to `http://localhost:8000/endpoint`
3. Backend response is returned to frontend

### State Flow

```
┌─────────────────────────────────────────┐
│      React Components (UI Layer)        │
├─────────────────────────────────────────┤
│   Context Providers (Global State)      │
│  ├─ AuthContext                         │
│  ├─ ThemeContext                        │
│  ├─ CurrencyContext                     │
│  ├─ FinancialDashboardContext           │
│  └─ NotificationContext                 │
├─────────────────────────────────────────┤
│  React Query + Axios (API Layer)        │
├─────────────────────────────────────────┤
│   Backend API (localhost:8000)          │
└─────────────────────────────────────────┘
```

---

## Development Guide

### Component Development

#### Creating a New Component
1. Create file in `src/components/ComponentName.jsx`
2. Import necessary dependencies and context hooks
3. Use React hooks (`useState`, `useContext`, etc.)
4. Export component as default

Example:
```jsx
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function MyComponent() {
  const { isDark } = useTheme();
  
  return (
    <div className={isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}>
      Content here
    </div>
  );
}
```

#### Using Context
```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isLoggedIn, logout } = useAuth();
  // Use auth state...
}
```

### Styling Approach

The project uses **Tailwind CSS** with utility-first styling:

```jsx
<div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Title</h2>
  <p className="text-gray-600 dark:text-gray-400">Content</p>
</div>
```

### Making API Calls

Use services for API calls:

```jsx
import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '../services/stockApi';

function TransactionList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* Render data */}</div>;
}
```

### Hot Module Replacement (HMR)

Vite provides fast refresh during development:
- Edit and save files
- Changes appear instantly without losing component state
- Perfect for rapid development and testing

---

## Build & Deployment

### Production Build

```bash
npm run build
```

This command:
1. Bundles and minifies all JavaScript and CSS
2. Optimizes assets and images
3. Outputs production-ready files to `dist/`
4. Produces an optimized single-page application

### Deployment Options

#### Netlify
The project includes a `public/_redirects` file for Netlify:
```
/*    /index.html    200
```
This ensures React Router works correctly with client-side routing.

#### Docker (Example)
```dockerfile
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Environment Variables
Configure backend URL via environment variables (can be added to `.env` file):
```
VITE_API_BASE_URL=http://your-backend-api.com
```

Update `vite.config.js` to use the variable:
```javascript
server: {
  proxy: {
    '/api': {
      target: process.env.VITE_API_BASE_URL || 'http://localhost:8000',
      // ...
    }
  }
}
```

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020 JavaScript features supported
- Responsive design works on all device sizes

---

## Performance Optimizations

1. **Code Splitting**: Automatic by Vite/React
2. **Lazy Loading**: Route-based code splitting via React Router
3. **Image Optimization**: Tailwind CSS handles efficient styling
4. **Caching**: React Query manages API response caching
5. **Tree Shaking**: Vite removes unused code in production

---

## Troubleshooting

### Backend Connection Issues
- Ensure backend is running on `http://localhost:8000`
- Check browser console for CORS or network errors
- Verify API endpoint paths in service files

### Session Timeout
- Session timeout configured in `SessionManager.jsx`
- User is redirected to login on timeout

### Build Errors
- Clear `node_modules` and reinstall: `npm install`
- Clear Vite cache: `rm -rf .vite`
- Check Node.js version: `node --version` (v16+)

### Styling Issues
- Rebuild Tailwind: `npm run build`
- Check `tailwind.config.js` for content paths
- Ensure dark mode classes are enabled in config

---

## Contributing

When contributing to the project:
1. Follow the existing code structure and naming conventions
2. Use Tailwind CSS for styling (no inline styles)
3. Create reusable components in `src/components/`
4. Use Context API for global state
5. Run `npm run lint` before committing
6. Test changes in development with HMR

---

## License

[Add your license information here]

---

## Contact & Support

For questions or issues, please contact the development team or create an issue in the project repository.

---

**Last Updated**: April 2026

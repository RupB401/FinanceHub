import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MOCK_TRANSACTIONS,
  MOCK_SUMMARY_STATS,
  MOCK_BALANCE_HISTORY,
  MOCK_SPENDING_CATEGORIES,
  MOCK_INSIGHTS,
  generateInsights,
  calculateSpendingByCategory,
  calculateSummaryStats,
  calculateBalanceHistory,
} from '../data/mockFinancialData';

const FinancialDashboardContext = createContext();

export const ROLES = {
  VIEWER: 'viewer',
  ADMIN: 'admin',
};

export const FinancialDashboardProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    // Load transactions from localStorage or use mock data
    const saved = localStorage.getItem('financialDashboard_transactions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert string dates back to Date objects
        return parsed.map(t => ({
          ...t,
          date: typeof t.date === 'string' ? new Date(t.date) : t.date
        }));
      } catch (error) {
        console.error("Error loading transactions from localStorage:", error);
        return MOCK_TRANSACTIONS.map(t => ({
          ...t,
          date: new Date(t.date)
        }));
      }
    }
    return MOCK_TRANSACTIONS.map(t => ({
      ...t,
      date: new Date(t.date)
    }));
  });
  const [userRole, setUserRole] = useState(() => {
    // Load role from localStorage or default to viewer
    const saved = localStorage.getItem('userRole');
    return saved || ROLES.VIEWER;
  });

  const [filters, setFilters] = useState({
    category: '',
    type: '',
    dateRange: 'all', // all, month, week
    searchQuery: '',
  });

  const [sortBy, setSortBy] = useState('date-desc');

  // Calculate derived data
  const spendingByCategory = calculateSpendingByCategory(transactions);
  const summaryStats = calculateSummaryStats(transactions);
  const balanceHistory = calculateBalanceHistory(transactions);
  const insights = generateInsights(transactions, spendingByCategory);

  // Persist role to localStorage
  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  // Persist transactions to localStorage
  useEffect(() => {
    const transactionsToSave = transactions.map(t => ({
      ...t,
      date: t.date instanceof Date ? t.date.toISOString() : t.date
    }));
    localStorage.setItem('financialDashboard_transactions', JSON.stringify(transactionsToSave));
  }, [transactions]);

  // Filter and sort transactions
  const filteredTransactions = React.useMemo(() => {
    let filtered = [...transactions];

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((t) => t.category === filters.category);
    }

    // Apply type filter
    if (filters.type) {
      filtered = filtered.filter((t) => t.type === filters.type);
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      let startDate;

      if (filters.dateRange === 'week') {
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (filters.dateRange === 'month') {
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }

      filtered = filtered.filter((t) => new Date(t.date) >= startDate);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'amount-desc':
          return b.amount - a.amount;
        case 'amount-asc':
          return a.amount - b.amount;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [transactions, filters, sortBy]);

  // Add transaction (Admin only)
  const addTransaction = (transaction) => {
    if (userRole !== ROLES.ADMIN) {
      console.warn('Only admins can add transactions');
      return false;
    }

    // Ensure date is a Date object
    let transactionDate = transaction.date;
    if (typeof transactionDate === 'string') {
      transactionDate = new Date(transactionDate);
    } else if (!(transactionDate instanceof Date)) {
      transactionDate = new Date();
    }

    const newTransaction = {
      id: `transaction_${Date.now()}`,
      ...transaction,
      date: transactionDate,
    };

    // Add new transaction to the front of the list (most recent first)
    setTransactions([newTransaction, ...transactions]);
    return true;
  };

  // Edit transaction (Admin only)
  const editTransaction = (id, updates) => {
    if (userRole !== ROLES.ADMIN) {
      console.warn('Only admins can edit transactions');
      return false;
    }

    setTransactions(
      transactions.map((t) => {
        if (t.id !== id) return t;

        // Ensure date is a Date object if being updated
        let updatedDate = t.date;
        if (updates.date) {
          if (typeof updates.date === 'string') {
            updatedDate = new Date(updates.date);
          } else if (updates.date instanceof Date) {
            updatedDate = updates.date;
          }
        }

        return {
          ...t,
          ...updates,
          date: updatedDate,
        };
      })
    );
    return true;
  };

  // Delete transaction (Admin only)
  const deleteTransaction = (id) => {
    if (userRole !== ROLES.ADMIN) {
      console.warn('Only admins can delete transactions');
      return false;
    }

    setTransactions(transactions.filter((t) => t.id !== id));
    return true;
  };

  // Bulk import transactions (Admin only)
  const importTransactions = (newTransactions) => {
    if (userRole !== ROLES.ADMIN) {
      console.warn('Only admins can import transactions');
      return false;
    }

    const formatted = newTransactions.map((t) => {
      // Ensure date is a Date object
      let transactionDate = t.date;
      if (typeof transactionDate === 'string') {
        transactionDate = new Date(transactionDate);
      } else if (!(transactionDate instanceof Date)) {
        transactionDate = new Date();
      }

      return {
        ...t,
        id: `transaction_${Date.now()}_${Math.random()}`,
        date: transactionDate,
      };
    });

    setTransactions([...formatted, ...transactions]);
    return true;
  };

  // Export transactions
  const exportTransactions = (format = 'json') => {
    if (format === 'csv') {
      const headers = ['Date', 'Type', 'Category', 'Amount', 'Description'];
      const rows = filteredTransactions.map((t) => [
        new Date(t.date).toISOString().split('T')[0],
        t.type,
        t.category,
        t.amount,
        t.description,
      ]);

      const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
      return csv;
    }

    return JSON.stringify(filteredTransactions, null, 2);
  };

  const value = {
    // Data
    transactions: filteredTransactions,
    allTransactions: transactions,
    spendingByCategory,
    summaryStats,
    balanceHistory,
    insights,

    // Filters and sorting
    filters,
    setFilters,
    sortBy,
    setSortBy,

    // Role management
    userRole,
    setUserRole,
    isAdmin: userRole === ROLES.ADMIN,
    isViewer: userRole === ROLES.VIEWER,

    // Actions
    addTransaction,
    editTransaction,
    deleteTransaction,
    importTransactions,
    exportTransactions,
  };

  return (
    <FinancialDashboardContext.Provider value={value}>
      {children}
    </FinancialDashboardContext.Provider>
  );
};

export const useFinancialDashboard = () => {
  const context = useContext(FinancialDashboardContext);
  if (!context) {
    throw new Error(
      'useFinancialDashboard must be used within FinancialDashboardProvider'
    );
  }
  return context;
};

import React, { useState } from 'react';
import { useFinancialDashboard } from '../../contexts/FinancialDashboardContext';
import { TRANSACTION_CATEGORIES } from '../../data/mockFinancialData';
import { useTheme } from '../../contexts/ThemeContext';
import {
  MdSearch,
  MdFilterList,
  MdSort,
  MdEdit,
  MdDelete,
  MdSave,
  MdClose,
  MdArrowUpward,
  MdArrowDownward,
  MdCalendarMonth,
  MdLabel,
} from 'react-icons/md';

function TransactionsSection() {
  const { isDark } = useTheme();
  const {
    transactions,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    userRole,
    isAdmin,
    deleteTransaction,
    editTransaction,
  } = useFinancialDashboard();

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [expandedId, setExpandedId] = useState(null);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleEditStart = (transaction) => {
    setEditingId(transaction.id);
    setEditData({
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
      date: new Date(transaction.date).toISOString().split('T')[0],
    });
  };

  const handleEditSave = () => {
    editTransaction(editingId, editData);
    setEditingId(null);
    setEditData({});
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const getCategoryColor = (category) => {
    const categoryColors = {
      [TRANSACTION_CATEGORIES.SALARY]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      [TRANSACTION_CATEGORIES.BONUS]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      [TRANSACTION_CATEGORIES.FREELANCE]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      [TRANSACTION_CATEGORIES.FOOD]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      [TRANSACTION_CATEGORIES.TRANSPORT]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      [TRANSACTION_CATEGORIES.UTILITIES]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      [TRANSACTION_CATEGORIES.ENTERTAINMENT]: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      [TRANSACTION_CATEGORIES.SHOPPING]: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      [TRANSACTION_CATEGORIES.HEALTHCARE]: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
      [TRANSACTION_CATEGORIES.EDUCATION]: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      [TRANSACTION_CATEGORIES.SUBSCRIPTION]: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300',
      [TRANSACTION_CATEGORIES.RENT]: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
    };
    return categoryColors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  };

  return (
    <div
      className={`rounded-lg border-2 ${
        isDark
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}
    >
      {/* Header */}
      <div
        className={`border-b-2 p-6 ${
          isDark
            ? 'border-gray-700'
            : 'border-gray-200'
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          📋 Transactions
        </h2>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <MdSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border-2 text-sm transition-colors ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
              } focus:outline-none`}
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <MdFilterList className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className={`flex-1 px-4 py-2 rounded-lg border-2 text-sm transition-colors ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none`}
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <MdLabel className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ marginLeft: 0 }} />
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className={`flex-1 px-4 py-2 rounded-lg border-2 text-sm transition-colors ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none`}
            >
              <option value="">All Categories</option>
              {Object.values(TRANSACTION_CATEGORIES).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div className="flex items-center gap-2">
            <MdCalendarMonth className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className={`flex-1 px-4 py-2 rounded-lg border-2 text-sm transition-colors ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none`}
            >
              <option value="all">All Time</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Sorting */}
        <div className="flex items-center gap-2">
          <MdSort className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Sort:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-3 py-1 rounded-lg border-2 text-sm transition-colors ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
            } focus:outline-none`}
          >
            <option value="date-desc">Latest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
            <option value="category">Category A-Z</option>
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="overflow-x-auto">
        {transactions.length > 0 ? (
          <div className="divide-y divide-gray-700 dark:divide-gray-600">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-6">
                {editingId === transaction.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={editData.description}
                        onChange={(e) =>
                          setEditData({...editData, description: e.target.value})
                        }
                        className={`px-3 py-2 rounded-lg border-2 text-sm ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-gray-50 border-gray-300 text-gray-900'
                        }`}
                      />
                      <input
                        type="number"
                        value={editData.amount}
                        onChange={(e) =>
                          setEditData({...editData, amount: parseFloat(e.target.value)})
                        }
                        className={`px-3 py-2 rounded-lg border-2 text-sm ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-gray-50 border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleEditSave}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          isDark
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <div
                          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getCategoryColor(
                            transaction.category
                          )}`}
                        >
                          {transaction.category}
                        </div>
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            transaction.type === 'income'
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {transaction.type === 'income' ? '+ Income' : '- Expense'}
                        </span>
                      </div>
                      <p
                        className={`font-medium mb-2 truncate ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {transaction.description}
                      </p>
                      <p
                        className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`text-lg sm:text-xl font-bold ${
                          transaction.type === 'income'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </span>

                      {isAdmin && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditStart(transaction)}
                            className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteClick(transaction.id)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={`p-12 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="text-lg">No transactions found</p>
            <p className="text-sm mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Footer with count */}
      <div
        className={`border-t-2 px-6 py-3 text-sm ${
          isDark
            ? 'border-gray-700 text-gray-400'
            : 'border-gray-200 text-gray-600'
        }`}
      >
        Showing {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

export default TransactionsSection;

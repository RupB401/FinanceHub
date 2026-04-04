import React, { useState } from 'react';
import { useFinancialDashboard } from '../../contexts/FinancialDashboardContext';
import { useTheme } from '../../contexts/ThemeContext';
import { TRANSACTION_CATEGORIES, TRANSACTION_TYPES } from '../../data/mockFinancialData';
import {
  FaTimes,
  FaPlus,
  FaDollarSign,
  FaTag,
  FaCalendar,
  FaList,
  FaExchangeAlt,
} from 'react-icons/fa';

function AddTransactionModal({ onClose }) {
  const { isDark } = useTheme();
  const { addTransaction } = useFinancialDashboard();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: TRANSACTION_CATEGORIES.FOOD,
    type: TRANSACTION_TYPES.EXPENSE,
    date: new Date().toISOString().split('T')[0],
  });

  const incomeCategories = [
    TRANSACTION_CATEGORIES.SALARY,
    TRANSACTION_CATEGORIES.BONUS,
    TRANSACTION_CATEGORIES.FREELANCE,
  ];

  const expenseCategories = Object.values(TRANSACTION_CATEGORIES).filter(
    (cat) => !incomeCategories.includes(cat)
  );

  const categoryOptions =
    formData.type === TRANSACTION_TYPES.INCOME ? incomeCategories : expenseCategories;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Reset category when type changes
      if (name === 'type') {
        updated.category =
          value === TRANSACTION_TYPES.INCOME
            ? TRANSACTION_CATEGORIES.SALARY
            : TRANSACTION_CATEGORIES.FOOD;
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.description.trim()) {
      setError('Please describe the transaction');
      return;
    }

    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      const transaction = {
        description: formData.description,
        amount: parseFloat(formData.amount),
        category: formData.category,
        type: formData.type,
        date: new Date(formData.date),
      };

      const result = addTransaction(transaction);

      if (result) {
        setSuccess('Transaction added successfully!');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError('Failed to add transaction. You must be an admin.');
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <h2 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : ''}`}>
            <FaPlus className="text-green-500" />
            Add Transaction
          </h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition-colors ${
              isDark
                ? 'hover:bg-gray-700 text-gray-400'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          {/* Description */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : ''}`}>
              <FaTag className="inline mr-2" />
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g., Grocery shopping, Monthly salary"
              className={`w-full px-4 py-2 rounded-lg border-2 transition-colors ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:border-blue-500 focus:outline-none`}
            />
          </div>

          {/* Amount */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : ''}`}>
              <FaDollarSign className="inline mr-2" />
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`w-full px-4 py-2 rounded-lg border-2 transition-colors ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:border-blue-500 focus:outline-none`}
            />
          </div>

          {/* Type */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : ''}`}>
              <FaExchangeAlt className="inline mr-2" />
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border-2 transition-colors ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:border-blue-500 focus:outline-none`}
            >
              <option value={TRANSACTION_TYPES.INCOME}>Income</option>
              <option value={TRANSACTION_TYPES.EXPENSE}>Expense</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : ''}`}>
              <FaList className="inline mr-2" />
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border-2 transition-colors ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:border-blue-500 focus:outline-none`}
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : ''}`}>
              <FaCalendar className="inline mr-2" />
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border-2 transition-colors ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:border-blue-500 focus:outline-none`}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 rounded-lg font-medium bg-green-500 hover:bg-green-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <FaPlus />
              {loading ? 'Adding...' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModal;

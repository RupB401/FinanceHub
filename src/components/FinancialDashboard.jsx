import React, { useState } from 'react';
import { useFinancialDashboard, ROLES } from '../contexts/FinancialDashboardContext';
import { useTheme } from '../contexts/ThemeContext';
import SummaryCards from './FinancialDashboard/SummaryCards';
import FinancialCharts from './FinancialDashboard/FinancialCharts';
import TransactionsSection from './FinancialDashboard/TransactionsSection';
import InsightsSection from './FinancialDashboard/InsightsSection';
import RoleSelector from './FinancialDashboard/RoleSelector';
import ExportModal from './FinancialDashboard/ExportModal';
import AddTransactionModal from './FinancialDashboard/AddTransactionModal';
import { FaPlus, FaDownload } from 'react-icons/fa';

function FinancialDashboard() {
  const { isDark } = useTheme();
  const { userRole, setUserRole, isAdmin, exportTransactions } = useFinancialDashboard();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div
      className={`min-h-screen pt-20 pb-8 transition-colors ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1
                className={`text-3xl sm:text-4xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Financial Dashboard
              </h1>
              <p
                className={`mt-2 text-sm sm:text-base ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Track your income, expenses, and financial insights
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() => setShowExportModal(true)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base w-full sm:w-auto flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                <FaDownload /> Export Data
              </button>
              {isAdmin && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base w-full sm:w-auto flex items-center justify-center gap-2 ${
                    isDark
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  <FaPlus /> Add Purchase
                </button>
              )}
            </div>
          </div>

          {/* Role Selector */}
          <div className="mt-4">
            <RoleSelector userRole={userRole} setUserRole={setUserRole} />
          </div>
        </div>

        {/* Summary Cards */}
        <SummaryCards />

        {/* Charts Section - 3 columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <FinancialCharts.BalanceTrendChart />
          <FinancialCharts.SpendingByCategoryChart />
          <FinancialCharts.ExpenseBreakdownPieChart />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transactions Section (2 columns on large screens) */}
          <div className="lg:col-span-2">
            <TransactionsSection />
          </div>

          {/* Insights Section (1 column on large screens) */}
          <div>
            <InsightsSection />
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          onClose={() => setShowExportModal(false)}
          onExport={exportTransactions}
        />
      )}

      {/* Add Transaction Modal */}
      {showAddModal && (
        <AddTransactionModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}

export default FinancialDashboard;

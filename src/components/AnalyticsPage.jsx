import React from 'react';
import { useFinancialDashboard } from '../contexts/FinancialDashboardContext';
import { useTheme } from '../contexts/ThemeContext';
import { useCurrency } from '../contexts/CurrencyContext';
import FinancialCharts from './FinancialDashboard/FinancialCharts';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { MdBarChart, MdShowChart, MdPieChart, MdArrowUpward } from 'react-icons/md';

const COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#EC4899', '#06B6D4', '#F97316', '#6366F1', '#14B8A6',
];

function AnalyticsPage() {
  const { isDark } = useTheme();
  const { formatCurrency, getCurrencySymbol } = useCurrency();
  const { allTransactions, summaryStats, spendingByCategory, balanceHistory } =
    useFinancialDashboard();

  // Create formatter for chart tooltips
  const formatChartValue = (value) => {
    return formatCurrency(value);
  };

  // Calculate monthly income vs expenses
  const monthlyData = React.useMemo(() => {
    const data = {};
    allTransactions.forEach((t) => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!data[monthKey]) {
        data[monthKey] = { month: monthKey, income: 0, expense: 0 };
      }

      if (t.type === 'income') {
        data[monthKey].income += t.amount;
      } else {
        data[monthKey].expense += t.amount;
      }
    });

    return Object.values(data).sort((a, b) => a.month.localeCompare(b.month)).slice(-6);
  }, [allTransactions]);

  // Calculate category comparison
  const categoryComparison = spendingByCategory.slice(0, 6);

  // Calculate daily average
  const dailyAverage = allTransactions.length > 0
    ? (allTransactions.reduce((sum, t) => sum + t.amount, 0) / allTransactions.length).toFixed(2)
    : 0;

  const chartContainerClass = `rounded-lg border-2 p-6 ${
    isDark
      ? 'bg-gray-800 border-gray-700'
      : 'bg-white border-gray-200'
  }`;

  const headingClass = `text-xl font-bold mb-4 flex items-center gap-2 ${
    isDark ? 'text-white' : 'text-gray-900'
  }`;

  const statCardClass = `rounded-lg border-2 p-6 ${
    isDark
      ? 'bg-gray-800 border-gray-700'
      : 'bg-white border-gray-200'
  }`;

  return (
    <div
      className={`min-h-screen pt-20 pb-8 transition-colors ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-3xl sm:text-4xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Analytics & Insights
          </h1>
          <p
            className={`text-sm sm:text-base ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Detailed financial analysis and trending data
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={statCardClass}>
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Balance
                </p>
                <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {formatCurrency(summaryStats.totalBalance || 0)}
                </p>
              </div>
              <div className="text-3xl"></div>
            </div>
          </div>

          <div className={statCardClass}>
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Transactions
                </p>
                <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {allTransactions.length}
                </p>
              </div>
              <div className="text-3xl"></div>
            </div>
          </div>

          <div className={statCardClass}>
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Daily Average
                </p>
                <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  ${dailyAverage}
                </p>
              </div>
              <div className="text-3xl"></div>
            </div>
          </div>

          <div className={statCardClass}>
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Top Category
                </p>
                <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {spendingByCategory[0]?.category || 'N/A'}
                </p>
              </div>
              <div className="text-3xl"></div>
            </div>
          </div>
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Income vs Expenses */}
          <div className={chartContainerClass}>
            <h2 className={headingClass}>
              <MdBarChart /> Monthly Overview
            </h2>
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? '#374151' : '#E5E7EB'}
                  />
                  <XAxis
                    dataKey="month"
                    stroke={isDark ? '#9CA3AF' : '#6B7280'}
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis stroke={isDark ? '#9CA3AF' : '#6B7280'} style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                      border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                      borderRadius: '8px',
                      color: isDark ? '#E5E7EB' : '#1F2937',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="income" fill="#10B981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="expense" fill="#EF4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-400">
                No data available
              </div>
            )}
          </div>

          {/* Balance Trend Area Chart */}
          <div className={chartContainerClass}>
            <h2 className={headingClass}>
              <MdShowChart /> Balance Progression
            </h2>
            {balanceHistory.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={balanceHistory}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? '#374151' : '#E5E7EB'}
                  />
                  <XAxis
                    dataKey="date"
                    stroke={isDark ? '#9CA3AF' : '#6B7280'}
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis stroke={isDark ? '#9CA3AF' : '#6B7280'} style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                      border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                      borderRadius: '8px',
                      color: isDark ? '#E5E7EB' : '#1F2937',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorBalance)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-400">
                No data available
              </div>
            )}
          </div>

          {/* Top Categories */}
          <div className={chartContainerClass}>
            <h2 className={headingClass}>
              <MdPieChart /> Top Categories
            </h2>
            {categoryComparison.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={categoryComparison}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? '#374151' : '#E5E7EB'}
                  />
                  <XAxis
                    type="number"
                    stroke={isDark ? '#9CA3AF' : '#6B7280'}
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    type="category"
                    dataKey="category"
                    stroke={isDark ? '#9CA3AF' : '#6B7280'}
                    style={{ fontSize: '12px' }}
                    width={140}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                      border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                      borderRadius: '8px',
                      color: isDark ? '#E5E7EB' : '#1F2937',
                    }}
                    formatter={formatChartValue}
                  />
                  <Bar dataKey="amount" fill="#8B5CF6" radius={[0, 8, 8, 0]}>
                    {categoryComparison.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-400">
                No data available
              </div>
            )}
          </div>

          {/* Expense Breakdown */}
          <FinancialCharts.ExpenseBreakdownPieChart />
        </div>

        {/* Additional Insights */}
        <div className={chartContainerClass}>
          <h2 className={headingClass}>
            <MdArrowUpward /> Key Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Income
              </p>
              <p className={`text-2xl font-bold mt-2 text-green-500`}>
                ${allTransactions
                  .filter((t) => t.type === 'income')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </p>
            </div>

            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Expenses
              </p>
              <p className={`text-2xl font-bold mt-2 text-red-500`}>
                ${allTransactions
                  .filter((t) => t.type === 'expense')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </p>
            </div>

            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Net Income
              </p>
              <p
                className={`text-2xl font-bold mt-2 ${
                  (summaryStats.thisMonthNetIncome || 0) >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {formatCurrency(summaryStats.thisMonthNetIncome || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;

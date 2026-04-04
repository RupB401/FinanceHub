import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useFinancialDashboard } from '../../contexts/FinancialDashboardContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useCurrency } from '../../contexts/CurrencyContext';

const COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // amber
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#F97316', // orange
  '#6366F1', // indigo
  '#14B8A6', // teal
];

function BalanceTrendChart() {
  const { isDark } = useTheme();
  const { formatCurrency } = useCurrency();
  const { balanceHistory } = useFinancialDashboard();

  return (
    <div
      className={`rounded-lg border-2 p-6 ${
        isDark
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}
    >
      <h2
        className={`text-xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        Balance Trend (Last 30 Days)
      </h2>

      {balanceHistory.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={balanceHistory}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? '#374151' : '#E5E7EB'}
            />
            <XAxis
              dataKey="date"
              stroke={isDark ? '#9CA3AF' : '#6B7280'}
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke={isDark ? '#9CA3AF' : '#6B7280'}
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                borderRadius: '8px',
                color: isDark ? '#E5E7EB' : '#1F2937',
              }}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-80 flex items-center justify-center text-gray-400">
          No balance history available
        </div>
      )}
    </div>
  );
}

function SpendingByCategoryChart() {
  const { isDark } = useTheme();
  const { formatCurrency } = useCurrency();
  const { spendingByCategory } = useFinancialDashboard();

  // Limit to top 8 categories for better visualization
  const topCategories = spendingByCategory.slice(0, 8);

  return (
    <div
      className={`rounded-lg border-2 p-6 ${
        isDark
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}
    >
      <h2
        className={`text-xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        Spending by Category
      </h2>

      {topCategories.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={topCategories}
            margin={{ top: 5, right: 30, left: 0, bottom: 60 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? '#374151' : '#E5E7EB'}
            />
            <XAxis
              dataKey="category"
              angle={-45}
              textAnchor="end"
              height={100}
              stroke={isDark ? '#9CA3AF' : '#6B7280'}
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke={isDark ? '#9CA3AF' : '#6B7280'}
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                borderRadius: '8px',
                color: isDark ? '#E5E7EB' : '#1F2937',
              }}
            />
            <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
              {topCategories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-80 flex items-center justify-center text-gray-400">
          No spending data available
        </div>
      )}
    </div>
  );
}

function ExpenseBreakdownPieChart() {
  const { isDark } = useTheme();
  const { spendingByCategory } = useFinancialDashboard();

  return (
    <div
      className={`rounded-lg border-2 p-6 ${
        isDark
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}
    >
      <h2
        className={`text-xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        Expense Breakdown
      </h2>

      {spendingByCategory.length > 0 ? (
        <div className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={spendingByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {spendingByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                  border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                  borderRadius: '8px',
                  color: isDark ? '#E5E7EB' : '#1F2937',
                }}
                formatter={(value) => formatCurrency(value)}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Legend */}
          <div className={`grid grid-cols-2 gap-3 mt-6 text-sm max-h-48 overflow-y-auto w-full`}>
            {spendingByCategory.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {entry.category}: {formatCurrency(entry.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-80 flex items-center justify-center text-gray-400">
          No expense data available
        </div>
      )}
    </div>
  );
}

// Export as object with named functions
export default {
  BalanceTrendChart,
  SpendingByCategoryChart,
  ExpenseBreakdownPieChart,
};

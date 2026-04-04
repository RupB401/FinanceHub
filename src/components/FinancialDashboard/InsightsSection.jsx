import React from 'react';
import { useFinancialDashboard } from '../../contexts/FinancialDashboardContext';
import { useTheme } from '../../contexts/ThemeContext';

function InsightsSection() {
  const { isDark } = useTheme();
  const { insights, summaryStats } = useFinancialDashboard();

  const getInsightColor = (type) => {
    switch (type) {
      case 'highest_category':
      case 'monthly_trend':
      case 'income_ratio':
        return isDark
          ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
          : 'bg-blue-50 border-blue-200 text-blue-900';
      case 'net_income':
        return summaryStats.thisMonthNetIncome >= 0
          ? isDark
            ? 'bg-green-500/10 border-green-500/30 text-green-300'
            : 'bg-green-50 border-green-200 text-green-900'
          : isDark
          ? 'bg-red-500/10 border-red-500/30 text-red-300'
          : 'bg-red-50 border-red-200 text-red-900';
      default:
        return isDark
          ? 'bg-gray-700 border-gray-600'
          : 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div
      className={`rounded-lg border-2 p-6 h-full ${
        isDark
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}
    >
      <h2
        className={`text-xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        💡 Insights & Tips
      </h2>

      <div className="space-y-4">
        {insights.length > 0 ? (
          insights.map((insight, index) => (
            <div
              key={index}
              className={`rounded-lg border-2 p-4 break-words ${getInsightColor(
                insight.type
              )}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{insight.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1">{insight.title}</h3>
                  <p className="text-xs sm:text-sm mb-2">{insight.message}</p>
                  <p className="text-xs opacity-75">
                    Value: {typeof insight.value === 'number' ?
                      (insight.type === 'income_ratio'
                        ? `$${insight.value}`
                        : insight.type === 'monthly_trend'
                        ? `${insight.value.toFixed(1)}%`
                        : `$${insight.value.toFixed(2)}`)
                      : insight.value}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
            <p>No insights available yet</p>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className={`mt-6 pt-6 border-t-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3
          className={`text-lg font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          Money Tips
        </h3>
        <ul className="space-y-2 text-sm">
          <li className={`flex gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <span>•</span>
            <span>Track all expenses daily for accurate budgeting</span>
          </li>
          <li className={`flex gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <span>•</span>
            <span>Set category limits and monitor them closely</span>
          </li>
          <li className={`flex gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <span>•</span>
            <span>Review trends monthly to identify savings opportunities</span>
          </li>
          <li className={`flex gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <span>•</span>
            <span>Aim to save at least 20% of your monthly income</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default InsightsSection;

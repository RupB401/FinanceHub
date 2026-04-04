import React from 'react';
import { useFinancialDashboard } from '../../contexts/FinancialDashboardContext';
import { useTheme } from '../../contexts/ThemeContext';

function SummaryCards() {
  const { isDark } = useTheme();
  const { summaryStats } = useFinancialDashboard();

  const cards = [
    {
      title: 'Total Balance',
      value: summaryStats.totalBalance,
      icon: '$',
      color: 'blue',
      isBalance: true,
    },
    {
      title: 'This Month Income',
      value: summaryStats.thisMonthIncome,
      icon: '↑',
      color: 'green',
    },
    {
      title: 'This Month Expenses',
      value: summaryStats.thisMonthExpense,
      icon: '↓',
      color: 'red',
    },
    {
      title: 'Net Income',
      value: summaryStats.thisMonthNetIncome,
      icon: '✓',
      color: summaryStats.thisMonthNetIncome >= 0 ? 'green' : 'red',
    },
  ];

  const colorMap = {
    blue: isDark ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200',
    green: isDark ? 'bg-green-500/10 border-green-500/30' : 'bg-green-50 border-green-200',
    red: isDark ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200',
  };

  const textColorMap = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    red: 'text-red-600 dark:text-red-400',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-lg border-2 p-6 transition-all hover:shadow-lg ${
            colorMap[card.color]
          } ${isDark ? 'border-opacity-30' : 'border-opacity-100'}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p
                className={`text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {card.title}
              </p>
              <p
                className={`text-3xl font-bold ${textColorMap[card.color]} ${
                  card.value < 0 ? 'text-red-600 dark:text-red-400' : ''
                }`}
              >
                ${Math.abs(card.value).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              {card.value < 0 && !card.isBalance && (
                <p className="text-xs mt-1 text-red-600 dark:text-red-400">
                  Negative balance
                </p>
              )}
            </div>
            <span className="text-4xl">{card.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;

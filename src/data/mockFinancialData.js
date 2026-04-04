/**
 * Mock Financial Data for Dashboard
 * Contains transactions, balance data, and insights
 */

// Categories for transactions
export const TRANSACTION_CATEGORIES = {
  INCOME: 'Income',
  SALARY: 'Salary',
  BONUS: 'Bonus',
  INVESTMENT: 'Investment',
  FREELANCE: 'Freelance',
  OTHER_INCOME: 'Other Income',
  FOOD: 'Food & Dining',
  TRANSPORT: 'Transportation',
  UTILITIES: 'Utilities',
  ENTERTAINMENT: 'Entertainment',
  SHOPPING: 'Shopping',
  HEALTHCARE: 'Healthcare',
  EDUCATION: 'Education',
  SUBSCRIPTION: 'Subscription',
  RENT: 'Rent',
  OTHER_EXPENSE: 'Other Expense',
};

// Transaction types
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

/**
 * Generate mock transactions for 6 months
 */
export const generateMockTransactions = () => {
  const transactions = [];
  const categories = Object.values(TRANSACTION_CATEGORIES);
  const today = new Date();

  // Income transactions
  const incomeTransactions = [
    { category: TRANSACTION_CATEGORIES.SALARY, amount: 4500, description: 'Monthly Salary', dayOfMonth: 1 },
    { category: TRANSACTION_CATEGORIES.BONUS, amount: 1200, description: 'Performance Bonus', dayOfMonth: 15 },
    { category: TRANSACTION_CATEGORIES.FREELANCE, amount: 800, description: 'Freelance Project', dayOfMonth: 20 },
  ];

  // Expense transactions
  const expenseTemplates = [
    { category: TRANSACTION_CATEGORIES.FOOD, min: 15, max: 50, descriptions: ['Grocery', 'Restaurant', 'Coffee Shop', 'Food Delivery'] },
    { category: TRANSACTION_CATEGORIES.TRANSPORT, min: 10, max: 60, descriptions: ['Gas', 'Uber', 'Public Transit', 'Parking'] },
    { category: TRANSACTION_CATEGORIES.UTILITIES, min: 50, max: 150, descriptions: ['Electricity', 'Water', 'Internet', 'Phone Bill'] },
    { category: TRANSACTION_CATEGORIES.ENTERTAINMENT, min: 20, max: 100, descriptions: ['Movie', 'Concert', 'Gaming', 'Streaming'] },
    { category: TRANSACTION_CATEGORIES.SHOPPING, min: 30, max: 200, descriptions: ['Clothing', 'Electronics', 'Books', 'Home Goods'] },
    { category: TRANSACTION_CATEGORIES.HEALTHCARE, min: 20, max: 300, descriptions: ['Gym', 'Doctor Visit', 'Pharmacy', 'Medical'] },
    { category: TRANSACTION_CATEGORIES.EDUCATION, min: 50, max: 200, descriptions: ['Course', 'Books', 'Workshop', 'Certification'] },
    { category: TRANSACTION_CATEGORIES.SUBSCRIPTION, min: 5, max: 50, descriptions: ['Netflix', 'Spotify', 'Adobe CC', 'AWS'] },
    { category: TRANSACTION_CATEGORIES.RENT, min: 800, max: 1500, descriptions: ['Monthly Rent'], dayOfMonth: 1 },
  ];

  // Generate transactions for 180 days
  for (let i = 0; i < 180; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Add income transactions
    for (const income of incomeTransactions) {
      if (date.getDate() === income.dayOfMonth) {
        transactions.push({
          id: `transaction_${transactions.length + 1}`,
          date: new Date(date),
          amount: income.amount,
          category: income.category,
          type: TRANSACTION_TYPES.INCOME,
          description: income.description,
        });
      }
    }

    // Add random expense transactions (2-5 per day)
    const expenseCount = Math.floor(Math.random() * 4) + 2;
    for (let j = 0; j < expenseCount; j++) {
      const template = expenseTemplates[Math.floor(Math.random() * expenseTemplates.length)];
      const amount = Math.floor(Math.random() * (template.max - template.min + 1)) + template.min;
      const description = template.descriptions[Math.floor(Math.random() * template.descriptions.length)];

      transactions.push({
        id: `transaction_${transactions.length + 1}`,
        date: new Date(date.getTime() + Math.random() * 86400000), // Random time of day
        amount: parseFloat(amount.toFixed(2)),
        category: template.category,
        type: TRANSACTION_TYPES.EXPENSE,
        description: description,
      });
    }
  }

  return transactions.sort((a, b) => b.date - a.date);
};

/**
 * Calculate balance history for trend visualization
 */
export const calculateBalanceHistory = (transactions) => {
  const balanceByDate = {};
  let runningBalance = 0;

  // Sort transactions by date ascending
  const sorted = [...transactions].sort((a, b) => a.date - b.date);

  for (const transaction of sorted) {
    const dateKey = new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const amount = transaction.type === TRANSACTION_TYPES.INCOME ? transaction.amount : -transaction.amount;
    runningBalance += amount;

    if (!balanceByDate[dateKey]) {
      balanceByDate[dateKey] = runningBalance;
    } else {
      balanceByDate[dateKey] = runningBalance;
    }
  }

  // Create array for chart (limit to last 30 days for clarity)
  return Object.entries(balanceByDate)
    .slice(-30)
    .map(([date, balance]) => ({
      date,
      balance: parseFloat(balance.toFixed(2)),
    }));
};

/**
 * Calculate spending by category
 */
export const calculateSpendingByCategory = (transactions) => {
  const spending = {};

  for (const transaction of transactions) {
    if (transaction.type === TRANSACTION_TYPES.EXPENSE) {
      if (!spending[transaction.category]) {
        spending[transaction.category] = 0;
      }
      spending[transaction.category] += transaction.amount;
    }
  }

  return Object.entries(spending)
    .map(([category, amount]) => ({
      category,
      amount: parseFloat(amount.toFixed(2)),
    }))
    .sort((a, b) => b.amount - a.amount);
};

/**
 * Calculate summary statistics
 */
export const calculateSummaryStats = (transactions) => {
  const now = new Date();
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  // Total balance
  let totalBalance = 0;
  let thisMonthIncome = 0;
  let thisMonthExpense = 0;
  let lastMonthIncome = 0;
  let lastMonthExpense = 0;

  for (const transaction of transactions) {
    const amount = transaction.type === TRANSACTION_TYPES.INCOME ? transaction.amount : -transaction.amount;
    totalBalance += amount;

    // This month
    if (transaction.date >= monthAgo) {
      if (transaction.type === TRANSACTION_TYPES.INCOME) {
        thisMonthIncome += transaction.amount;
      } else {
        thisMonthExpense += transaction.amount;
      }
    }

    // Last month
    if (transaction.date >= twoMonthsAgo && transaction.date < monthAgo) {
      if (transaction.type === TRANSACTION_TYPES.INCOME) {
        lastMonthIncome += transaction.amount;
      } else {
        lastMonthExpense += transaction.amount;
      }
    }
  }

  return {
    totalBalance: parseFloat(totalBalance.toFixed(2)),
    thisMonthIncome: parseFloat(thisMonthIncome.toFixed(2)),
    thisMonthExpense: parseFloat(thisMonthExpense.toFixed(2)),
    lastMonthIncome: parseFloat(lastMonthIncome.toFixed(2)),
    lastMonthExpense: parseFloat(lastMonthExpense.toFixed(2)),
    thisMonthNetIncome: parseFloat((thisMonthIncome - thisMonthExpense).toFixed(2)),
    lastMonthNetIncome: parseFloat((lastMonthIncome - lastMonthExpense).toFixed(2)),
  };
};

/**
 * Get insights from transactions
 */
export const generateInsights = (transactions, spendingByCategory) => {
  const stats = calculateSummaryStats(transactions);

  const insights = [];

  // Highest spending category
  if (spendingByCategory.length > 0) {
    insights.push({
      type: 'highest_category',
      title: 'Top Spending Category',
      message: `Your highest spending is on ${spendingByCategory[0].category} with $${spendingByCategory[0].amount.toFixed(2)}`,
      icon: '📊',
      value: spendingByCategory[0].amount,
    });
  }

  // Monthly comparison
  const monthlyChange = ((stats.thisMonthExpense - stats.lastMonthExpense) / stats.lastMonthExpense) * 100;
  insights.push({
    type: 'monthly_trend',
    title: 'Monthly Spending Trend',
    message: `Your spending is ${monthlyChange > 0 ? 'up' : 'down'} by ${Math.abs(monthlyChange).toFixed(1)}% compared to last month`,
    icon: monthlyChange > 0 ? '📈' : '📉',
    value: monthlyChange,
  });

  // Income vs Expense ratio
  const ratio = (stats.thisMonthIncome / stats.thisMonthExpense).toFixed(2);
  insights.push({
    type: 'income_ratio',
    title: 'Income to Expense Ratio',
    message: `For every $1 spent, you earn $${ratio}. Keep up the positive balance!`,
    icon: '💰',
    value: ratio,
  });

  // Net income insight
  insights.push({
    type: 'net_income',
    title: 'Net Income (This Month)',
    message: `Your net income is $${stats.thisMonthNetIncome.toFixed(2)} after expenses`,
    icon: stats.thisMonthNetIncome > 0 ? '✅' : '⚠️',
    value: stats.thisMonthNetIncome,
  });

  return insights;
};

/**
 * Initial mock data
 */
export const MOCK_TRANSACTIONS = generateMockTransactions();
export const MOCK_BALANCE_HISTORY = calculateBalanceHistory(MOCK_TRANSACTIONS);
export const MOCK_SPENDING_CATEGORIES = calculateSpendingByCategory(MOCK_TRANSACTIONS);
export const MOCK_INSIGHTS = generateInsights(MOCK_TRANSACTIONS, MOCK_SPENDING_CATEGORIES);
export const MOCK_SUMMARY_STATS = calculateSummaryStats(MOCK_TRANSACTIONS);

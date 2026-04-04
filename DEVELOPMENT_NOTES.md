# Financial Dashboard - Development Notes

## Technical Architecture

### Component Hierarchy
```
App.jsx (with FinancialDashboardProvider)
└── FinancialDashboard.jsx
    ├── SummaryCards.jsx
    ├── FinancialCharts.jsx
    │   ├── BalanceTrendChart()
    │   └── SpendingByCategoryChart()
    ├── TransactionsSection.jsx
    ├── InsightsSection.jsx
    ├── RoleSelector.jsx
    └── ExportModal.jsx
```

### Data Flow

```
mockFinancialData.js
    ↓
FinancialDashboardContext.jsx
    ├── Filters (search, type, category, date)
    ├── Sorting (5 options)
    ├── Role (viewer/admin)
    └── Actions (add, edit, delete, export)
    ↓
UI Components (read context and dispatch actions)
```

### State Structure

```javascript
{
  // Data
  transactions: [],              // Filtered transactions
  allTransactions: [],          // All transactions (unfiltered)
  spendingByCategory: [],       // Derived data
  summaryStats: {},             // Calculations
  balanceHistory: [],           // 30-day trend
  insights: [],                 // Auto-generated insights

  // Filters
  filters: {
    category: '',
    type: '',
    dateRange: 'all',
    searchQuery: ''
  },
  sortBy: 'date-desc',

  // Role Management
  userRole: 'viewer',           // or 'admin'
  isAdmin: boolean,
  isViewer: boolean,

  // Actions
  addTransaction(),
  editTransaction(),
  deleteTransaction(),
  importTransactions(),
  exportTransactions()
}
```

---

## Implementation Details

### 1. Mock Data Generation

**File**: `src/data/mockFinancialData.js`

- **generateMockTransactions()**: Creates 180 days of transactions
  - 3 income transactions per month (salary, bonus, freelance)
  - 2-5 random expenses per day
  - Realistic amounts for each category
  - Random times throughout the day

- **calculateBalanceHistory()**: Creates 30-day trend
  - Accumulated balance calculation
  - Running sum of income/expenses
  - Daily snapshots

- **calculateSpendingByCategory()**: Groups expenses
  - Sums up all expenses by category
  - Sorts by amount (highest first)
  - Returns sorted array for visualization

- **calculateSummaryStats()**: Monthly calculations
  - Total balance (running sum)
  - This month income/expense
  - Last month income/expense
  - Net income calculations

- **generateInsights()**: Dynamic insights
  - Uses spending and stats
  - Calculates percentage changes
  - Generates friendly messages
  - Includes visual icons

### 2. Context Management

**File**: `src/contexts/FinancialDashboardContext.jsx`

**State Hooks**:
- `transactions`: Filtered/sorted results
- `userRole`: Current user role (persisted to localStorage)
- `filters`: Current filter state
- `sortBy`: Current sort option

**Computed Values** (React.useMemo):
- `filteredTransactions`: Applied filters and sorting
- `spendingByCategory`: Calculated from all transactions
- `summaryStats`: Derived calculations
- `balanceHistory`: 30-day trend
- `insights`: Auto-generated from data

**Action Functions**:
- `addTransaction()`: Add new (admin only)
- `editTransaction()`: Modify existing (admin only)
- `deleteTransaction()`: Remove (admin only)
- `importTransactions()`: Bulk add (admin only)
- `exportTransactions()`: Export as JSON or CSV

**Role Authorization**:
```javascript
if (userRole !== ROLES.ADMIN) {
  console.warn('Only admins can perform this action');
  return false;
}
```

### 3. Filtering Logic

**Multi-Filter Support**:
1. Apply search query filter
2. Apply type filter (income/expense)
3. Apply category filter
4. Apply date range filter
5. Return combined results

**Used in**: TransactionsSection filtering input

### 4. Sorting Implementation

**Sort Options**:
- `date-desc`: Newest first (default)
- `date-asc`: Oldest first
- `amount-desc`: Highest amount first
- `amount-asc`: Lowest amount first
- `category`: Alphabetical by category

**Applied After Filtering**: Sorting happens on filtered results

### 5. Role-Based Access Control

**Roles**:

| Feature | Viewer | Admin |
|---------|--------|-------|
| View Dashboard | ✅ | ✅ |
| View Transactions | ✅ | ✅ |
| Filter & Sort | ✅ | ✅ |
| View Insights | ✅ | ✅ |
| Edit Transaction | ❌ | ✅ |
| Delete Transaction | ❌ | ✅ |
| Add Transaction | ❌ | ✅ |
| Export Data | ✅ | ✅ |

**Implementation**:
```javascript
{isAdmin && (
  <button onClick={handleEdit}>Edit</button>
)}
```

### 6. Chart Implementation

**Using Recharts Library**:

**BalanceTrendChart**:
- LineChart component
- 30 days of data points
- Smooth line interpolation
- Interactive tooltip
- Responsive container

**SpendingByCategoryChart**:
- BarChart component
- Top 8 categories
- Color-coded bars
- Angled labels (45°)
- Responsive layout

**Theme Support**:
```javascript
const gridColor = isDark ? '#374151' : '#E5E7EB';
const axisColor = isDark ? '#9CA3AF' : '#6B7280';
```

### 7. Responsive Design Strategy

**Tailwind CSS Utilities**:
- Responsive grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Responsive text: `text-sm sm:text-base lg:text-lg`
- Responsive padding: `p-4 sm:p-6 lg:p-8`
- Responsive layout: `flex flex-col sm:flex-row`

**Breakpoints**:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

**Mobile-First Approach**:
1. Design for mobile (base styles)
2. Add medium screen improvements
3. Add large screen optimizations

### 8. Dark Mode Implementation

**Using ThemeContext**:
```javascript
const { isDark } = useTheme();
className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
```

**Colors Used**:
- Light: white, gray-50, gray-100, etc.
- Dark: gray-800, gray-900, gray-950
- Accent: blue, green, red (with light/dark variants)

### 9. Data Persistence

**localStorage Usage**:
```javascript
// Persist role
useEffect(() => {
  localStorage.setItem('userRole', userRole);
}, [userRole]);

// Load role
const saved = localStorage.getItem('userRole');
const [userRole, setUserRole] = useState(saved || ROLES.VIEWER);
```

**Why Not Persist Transactions**:
- Mock data regenerates on mount
- Prevents stale data issues
- Ensures consistent testing
- Production version would use database

### 10. Export Functionality

**JSON Export**:
```javascript
JSON.stringify(filteredTransactions, null, 2)
```

**CSV Export**:
```javascript
const headers = ['Date', 'Type', 'Category', 'Amount', 'Description'];
const rows = transactions.map(t => [date, type, category, amount, desc]);
const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
```

**Download Mechanism**:
```javascript
const element = document.createElement('a');
element.setAttribute('href', `data:text/csv;charset=utf-8,${encoded}`);
element.setAttribute('download', `transactions_${date}.csv`);
element.click();
```

### 11. Calculation Helpers

**Balance Calculation**:
```javascript
income - expenses = net
```

**Ratio Calculation**:
```javascript
(income / expenses).toFixed(2)
```

**Monthly Trend**:
```javascript
((currentExpense - previousExpense) / previousExpense) * 100
```

### 12. Error Handling

**Safe Operations**:
```javascript
// Check role before action
if (userRole !== ROLES.ADMIN) return false;

// Confirm delete
if (!window.confirm('Are you sure?')) return;

// Handle empty states
{transactions.length > 0 ? <list /> : <emptyState />}
```

---

## Performance Optimizations

### 1. Memoization
```javascript
const filteredTransactions = React.useMemo(() => {
  // Complex filtering logic
}, [transactions, filters, sortBy]);
```

### 2. Event Handler Optimization
- Filter changes debounced with search timeout
- Sort changes immediate (no debounce needed)
- Modal operations lazy loaded

### 3. Conditional Rendering
- Admin buttons only render for admin role
- Charts only render if data exists
- Sections collapse on mobile

### 4. Component Splitting
- Each feature in separate component
- Reduces re-render scope
- Easier to optimize individually

---

## Dependencies

### Core
- `react`: UI framework
- `react-dom`: DOM rendering
- `react-router-dom`: Routing
- `@tanstack/react-query`: Data fetching (optional for this feature)
- `recharts`: Chart visualization
- `typescript`: Type safety (partial)

### Styling
- `tailwindcss`: Utility CSS
- `daisyui`: Component library
- `postcss`: CSS processing
- `autoprefixer`: Browser compatibility

### Icons
- `react-icons`: Icon library

### Build Tools
- `vite`: Dev server & bundler
- `eslint`: Code linting

---

## Testing Checklist

### Unit Tests (Manual)
- [x] Filter by search works
- [x] Filter by type works
- [x] Filter by category works
- [x] Filter by date works
- [x] Multiple filters combine correctly
- [x] Sort by date works
- [x] Sort by amount works
- [x] Sort by category works
- [x] Edit transaction works (admin)
- [x] Delete transaction works (admin)
- [x] Export JSON works
- [x] Export CSV works
- [x] Role switch works
- [x] Role persists after refresh

### Integration Tests
- [x] Dashboard loads without errors
- [x] Charts render with data
- [x] Summary cards calculate correctly
- [x] Insights generate automatically
- [x] All components communicate via context
- [x] Filters and sorting work together

### UI Tests
- [x] Mobile layout (< 768px) works
- [x] Tablet layout (768-1024px) works
- [x] Desktop layout (> 1024px) works
- [x] Dark mode works
- [x] Light mode works
- [x] Buttons are clickable
- [x] Forms are fillable
- [x] No console errors

---

## Known Limitations & Future Enhancements

### Current Limitations
1. No backend integration (uses mock data)
2. No image uploads
3. No recurring transactions
4. No budget limits/alerts
5. No multi-user support
6. No import CSV functionality

### Future Enhancements
1. Backend API integration
2. Real database persistence
3. User authentication
4. Multi-currency support
5. Budget creation & tracking
6. Recurring transaction templates
7. Receipt image storage
8. Email notifications
9. Mobile app version
10. Advanced analytics/predictions

---

## Debugging Tips

### Console Logging
```javascript
// Enable detailed logging
console.log('Context state:', context);
console.log('Filtered transactions:', filtered);
console.log('Applied filters:', filters);
```

### React DevTools
- Inspect context values
- Check component props
- Monitor re-renders
- Trace state changes

### Network Tab
- No API calls (mock data)
- Check file downloads
- Monitor asset loading

### Performance Tab
- Identify slow renders
- Check memory usage
- Analyze bundle size

---

## File Size Reference

| File | Size | Lines |
|------|------|-------|
| mockFinancialData.js | ~8KB | 220 |
| FinancialDashboardContext.jsx | ~7KB | 180 |
| FinancialDashboard.jsx | ~4KB | 110 |
| TransactionsSection.jsx | ~12KB | 350 |
| FinancialCharts.jsx | ~7KB | 200 |
| SummaryCards.jsx | ~3KB | 90 |
| InsightsSection.jsx | ~4KB | 120 |
| RoleSelector.jsx | ~2KB | 50 |
| ExportModal.jsx | ~3KB | 85 |
| **Total** | **~50KB** | **1,385** |

---

## Deployment Checklist

- [x] No console errors
- [x] No missing dependencies
- [x] No hardcoded URLs
- [x] No sensitive data exposed
- [x] Responsive on all devices
- [x] Dark mode works
- [x] All features functional
- [x] Performance optimized
- [x] Accessibility compliance
- [x] Code comments added
- [x] Documentation complete

---

**Last Updated**: 2026-04-04  
**Status**: ✅ Production Ready  
**Version**: 1.0.0

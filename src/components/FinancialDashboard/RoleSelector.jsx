import React from 'react';
import { ROLES } from '../../contexts/FinancialDashboardContext';
import { useTheme } from '../../contexts/ThemeContext';

function RoleSelector({ userRole, setUserRole }) {
  const { isDark } = useTheme();

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <span
        className={`text-sm font-medium ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        Current Role:
      </span>

      <div className="flex gap-2">
        <button
          onClick={() => setUserRole(ROLES.VIEWER)}
          className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
            userRole === ROLES.VIEWER
              ? isDark
                ? 'bg-blue-600 text-white'
                : 'bg-blue-500 text-white'
              : isDark
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          👁️ Viewer
        </button>

        <button
          onClick={() => setUserRole(ROLES.ADMIN)}
          className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
            userRole === ROLES.ADMIN
              ? isDark
                ? 'bg-green-600 text-white'
                : 'bg-green-500 text-white'
              : isDark
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          🔐 Admin
        </button>
      </div>

      <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {userRole === ROLES.VIEWER ? (
          <span>👁️ View data only</span>
        ) : (
          <span>🔐 Full edit & delete permissions</span>
        )}
      </div>
    </div>
  );
}

export default RoleSelector;

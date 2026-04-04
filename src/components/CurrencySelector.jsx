import React from 'react';
import { useCurrency, CURRENCIES } from '../contexts/CurrencyContext';
import { MdCurrencyExchange } from 'react-icons/md';
import { useTheme } from '../contexts/ThemeContext';

function CurrencySelector() {
  const { currency, setCurrency, availableCurrencies } = useCurrency();
  const { isDark } = useTheme();

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <MdCurrencyExchange className="text-xl" />
        <label className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Preferred Currency
        </label>
      </div>

      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className={`w-full px-4 py-2 rounded-lg border transition-colors ${
          isDark
            ? 'bg-gray-700 border-gray-600 text-white hover:border-blue-400 focus:border-blue-400'
            : 'bg-white border-gray-300 text-gray-900 hover:border-blue-400 focus:border-blue-400'
        } focus:outline-none focus:ring-2 ${
          isDark ? 'focus:ring-blue-500' : 'focus:ring-blue-400'
        }`}
      >
        {availableCurrencies.map((curr) => (
          <option key={curr.code} value={curr.code}>
            {curr.flag} {curr.code} - {curr.name}
          </option>
        ))}
      </select>

      <div
        className={`mt-3 p-3 rounded-lg ${
          isDark ? 'bg-gray-700/50 text-gray-300' : 'bg-blue-50 text-gray-700'
        } text-xs`}
      >
        <p>
          <strong>Current:</strong> {CURRENCIES[currency].flag} {CURRENCIES[currency].code} -{' '}
          {CURRENCIES[currency].name}
        </p>
        <p className="mt-1">
          <strong>Country:</strong> {CURRENCIES[currency].country}
        </p>
      </div>
    </div>
  );
}

export default CurrencySelector;

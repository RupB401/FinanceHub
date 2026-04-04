import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

// G20 major currencies with flags and symbols
export const CURRENCIES = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    country: 'United States',
    flag: '🇺🇸',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    country: 'European Union',
    flag: '🇪🇺',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    country: 'United Kingdom',
    flag: '🇬🇧',
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    country: 'Japan',
    flag: '🇯🇵',
  },
  CNY: {
    code: 'CNY',
    symbol: '¥',
    name: 'Chinese Yuan',
    country: 'China',
    flag: '🇨🇳',
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    country: 'India',
    flag: '🇮🇳',
  },
  CAD: {
    code: 'CAD',
    symbol: 'C$',
    name: 'Canadian Dollar',
    country: 'Canada',
    flag: '🇨🇦',
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    country: 'Australia',
    flag: '🇦🇺',
  },
  BRL: {
    code: 'BRL',
    symbol: 'R$',
    name: 'Brazilian Real',
    country: 'Brazil',
    flag: '🇧🇷',
  },
  MXN: {
    code: 'MXN',
    symbol: '$',
    name: 'Mexican Peso',
    country: 'Mexico',
    flag: '🇲🇽',
  },
  ZAR: {
    code: 'ZAR',
    symbol: 'R',
    name: 'South African Rand',
    country: 'South Africa',
    flag: '🇿🇦',
  },
  KRW: {
    code: 'KRW',
    symbol: '₩',
    name: 'South Korean Won',
    country: 'South Korea',
    flag: '🇰🇷',
  },
  IDR: {
    code: 'IDR',
    symbol: 'Rp',
    name: 'Indonesian Rupiah',
    country: 'Indonesia',
    flag: '🇮🇩',
  },
  SAR: {
    code: 'SAR',
    symbol: '﷼',
    name: 'Saudi Riyal',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
  },
  TRY: {
    code: 'TRY',
    symbol: '₺',
    name: 'Turkish Lira',
    country: 'Turkey',
    flag: '🇹🇷',
  },
  ARS: {
    code: 'ARS',
    symbol: '$',
    name: 'Argentine Peso',
    country: 'Argentina',
    flag: '🇦🇷',
  },
};

// Exchange rates relative to USD (as of April 2026 - can be updated with real API)
export const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CNY: 7.24,
  INR: 83.12,
  CAD: 1.36,
  AUD: 1.52,
  BRL: 4.97,
  MXN: 17.05,
  ZAR: 18.92,
  KRW: 1319.5,
  IDR: 15950,
  SAR: 3.75,
  TRY: 32.5,
  ARS: 835,
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('preferred_currency');
    return saved || 'USD';
  });

  // Persist currency preference to localStorage
  useEffect(() => {
    localStorage.setItem('preferred_currency', currency);
  }, [currency]);

  // Convert amount from USD to selected currency
  const convertCurrency = (amountInUSD, toCurrency = currency) => {
    if (!EXCHANGE_RATES[toCurrency]) {
      return amountInUSD;
    }
    return amountInUSD * EXCHANGE_RATES[toCurrency];
  };

  // Format currency display
  const formatCurrency = (amount, displayCurrency = currency) => {
    const converted = convertCurrency(amount, displayCurrency);
    const currencyData = CURRENCIES[displayCurrency];
    
    if (!currencyData) {
      return `${amount}`;
    }

    // Format based on currency
    if (displayCurrency === 'JPY' || displayCurrency === 'KRW' || displayCurrency === 'IDR') {
      // No decimal places for these currencies
      return `${currencyData.symbol}${Math.round(converted).toLocaleString()}`;
    }

    return `${currencyData.symbol}${converted.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Get currency symbol
  const getCurrencySymbol = (currencyCode = currency) => {
    return CURRENCIES[currencyCode]?.symbol || currencyCode;
  };

  // Get all available currencies sorted alphabetically
  const availableCurrencies = Object.keys(CURRENCIES)
    .sort()
    .map(code => CURRENCIES[code]);

  const value = {
    currency,
    setCurrency,
    formatCurrency,
    convertCurrency,
    getCurrencySymbol,
    availableCurrencies,
    currencyData: CURRENCIES[currency],
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};

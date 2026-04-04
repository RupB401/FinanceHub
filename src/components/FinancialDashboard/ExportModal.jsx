import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

function ExportModal({ onClose, onExport }) {
  const { isDark } = useTheme();
  const [selectedFormat, setSelectedFormat] = useState('json');

  const handleExport = () => {
    const data = onExport(selectedFormat);
    const filename = `transactions_${new Date().toISOString().split('T')[0]}`;
    const ext = selectedFormat === 'csv' ? 'csv' : 'json';

    const element = document.createElement('a');
    element.setAttribute(
      'href',
      selectedFormat === 'csv'
        ? `data:text/csv;charset=utf-8,${encodeURIComponent(data)}`
        : `data:application/json;charset=utf-8,${encodeURIComponent(data)}`
    );
    element.setAttribute('download', `${filename}.${ext}`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-lg p-6 w-full max-w-md ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          📥 Export Transactions
        </h2>

        <p
          className={`mb-6 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Choose a format to export your filtered transactions
        </p>

        {/* Format Selection */}
        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              value="json"
              checked={selectedFormat === 'json'}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-4 h-4"
            />
            <span
              className={`font-medium ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              JSON Format
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              (Complete data structure)
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              value="csv"
              checked={selectedFormat === 'csv'}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-4 h-4"
            />
            <span
              className={`font-medium ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              CSV Format
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              (Spreadsheet compatible)
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors text-white ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Download
          </button>
          <button
            onClick={onClose}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              isDark
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExportModal;

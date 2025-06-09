// src/components/ui/data-grid.tsx
import React from 'react';

interface DataGridProps {
  data: any[] | null;
  loading: boolean;
  error: Error | null;
  onRowClick?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

export const DataGrid: React.FC<DataGridProps> = ({ data, loading, error, onRowClick, onEdit, onDelete }) => {
  if (loading) return <p className="text-center py-4">Loading data...</p>;
  if (error) return <p className="text-center py-4 text-red-500">Error loading data: {error.message}</p>;
  if (!data || data.length === 0) return <p className="text-center py-4 text-gray-500">No data available.</p>;

  const headers = Object.keys(data[0] || {});

  return (
    <div className="overflow-x-auto shadow border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((key) => (
              <th key={key} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {key}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} onClick={() => onRowClick?.(row)} className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}>
              {headers.map((header, cellIndex) => {
                const value = row[header];
                return (
                  <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {typeof value === 'boolean' ? value.toString() : (value === null || value === undefined ? '' : String(value))}
                  </td>
                );
              })}
              {(onEdit || onDelete) && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {onEdit && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onEdit(row); }}
                      className="text-indigo-600 hover:text-indigo-900 mr-3 transition duration-150 ease-in-out"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onDelete(row); }}
                      className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

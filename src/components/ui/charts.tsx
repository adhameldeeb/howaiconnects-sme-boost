// src/components/ui/charts.tsx
import React from 'react';

interface ChartProps {
  data: any; // This would be more specific in a real chart library e.g., { labels: string[], datasets: any[] }
  loading?: boolean;
  height?: number | string; // Allow string for responsive heights like '100%'
  className?: string;
  title?: string;
}

const ChartContainer: React.FC<{title?: string, height?: number|string, loading?: boolean, className?: string, children: React.ReactNode}> =
({ title, height, loading, className, children }) => {
  const style = typeof height === 'number' ? { height: `${height}px` } : (height ? { height } : { height: '300px' });

  if (loading) {
    return (
      <div style={style} className={`flex items-center justify-center bg-gray-100 rounded-lg shadow p-4 ${className}`}>
        {title && <h3 className="text-lg font-semibold text-gray-700 mb-2 absolute top-4 left-4">{title}</h3>}
        <p className="text-gray-500">Loading chart data...</p>
      </div>
    );
  }

  return (
    <div style={style} className={`bg-white rounded-lg shadow p-4 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>}
      {children}
    </div>
  );
};


export const LineChart: React.FC<ChartProps> = ({ data, loading, height, className, title }) => {
  return (
    <ChartContainer title={title} height={height} loading={loading} className={className}>
      {!data || (Array.isArray(data.series) && data.series.every((s: any) => s.data.length === 0)) || (data.series && data.series.length === 0) ? ( // More robust check
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">No data available for Line Chart.</p>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-sm text-gray-600">
          Line Chart Placeholder
          {/* Basic data rendering for placeholder purpose */}
          {/* <pre className="text-xs overflow-auto max-h-60 bg-gray-50 p-2 rounded">Data: {JSON.stringify(data, null, 2)}</pre> */}
        </div>
      )}
    </ChartContainer>
  );
};

export const BarChart: React.FC<ChartProps> = ({ data, loading, height, className, title }) => {
  return (
    <ChartContainer title={title} height={height} loading={loading} className={className}>
      {!data || (Array.isArray(data.series) && data.series.every((s: any) => s.data.length === 0)) || (data.series && data.series.length === 0) ? ( // More robust check
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">No data available for Bar Chart.</p>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-sm text-gray-600">
          Bar Chart Placeholder
          {/* Basic data rendering for placeholder purpose */}
          {/* <pre className="text-xs overflow-auto max-h-60 bg-gray-50 p-2 rounded">Data: {JSON.stringify(data, null, 2)}</pre> */}
        </div>
      )}
    </ChartContainer>
  );
};

export const PieChart: React.FC<ChartProps> = ({ data, loading, height, className, title }) => {
    return (
      <ChartContainer title={title} height={height} loading={loading} className={className}>
        {!data || (Array.isArray(data.series) && data.series.length === 0) ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">No data available for Pie Chart.</p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-gray-600">
            Pie Chart Placeholder
          </div>
        )}
      </ChartContainer>
    );
  };

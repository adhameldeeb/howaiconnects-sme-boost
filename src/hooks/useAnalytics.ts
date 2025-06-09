// src/hooks/useAnalytics.ts
import { useState, useEffect } from 'react';

// Define more specific types for chart data if possible
interface ChartData {
  labels: string[];
  series: Array<{ name?: string; data: number[]; color?: string }>;
}

interface ActivityLogEntry {
  id: string;
  action: string;
  details: string;
  timestamp: string; // ISO string
  user?: string; // Optional user associated with the action
  status: 'success' | 'failure' | 'info';
}

interface AnalyticsData {
  syncPerformance: ChartData | null;
  dataVolumeTrend: ChartData | null;
  errorRate: ChartData | null; // Example: errors over time
  activityLog: ActivityLogEntry[];
  summaryStats: {
    totalRecordsSynced: number;
    averageSyncTime: number; // in seconds
    connectionsHealth: Array<{ name: string; status: 'online' | 'offline' | 'degraded' }>;
  } | null;
}

export const useAnalytics = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Simulate API call
    setTimeout(() => {
      try {
        setData({
          summaryStats: {
            totalRecordsSynced: 12560,
            averageSyncTime: 45, // seconds
            connectionsHealth: [
              { name: 'Airtable Base Alpha', status: 'online' },
              { name: 'Airtable Base Beta', status: 'degraded' },
              { name: 'Database Gamma', status: 'online' },
            ]
          },
          syncPerformance: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            series: [
              { name: 'Records Synced', data: [120, 150, 200, 180, 220, 190, 250], color: '#3498db' },
              { name: 'Sync Duration (s)', data: [30, 35, 40, 38, 42, 39, 45], color: '#2ecc71' },
            ],
          },
          dataVolumeTrend: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            series: [
              { name: 'Total Records', data: [10000, 10500, 11000, 11800, 12500, 13500], color: '#e74c3c' },
            ],
          },
          errorRate: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            series: [
                { name: 'Sync Errors', data: [5, 3, 6, 4], color: '#f39c12' }
            ]
          },
          activityLog: [
            { id: 'log1', action: 'Sync Started', details: 'Manual sync triggered by admin@example.com.', timestamp: new Date(Date.now() - 7200000).toISOString(), user: 'admin@example.com', status: 'info' },
            { id: 'log2', action: 'Data Processed', details: '250 records updated in Airtable Base Alpha.', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'success' },
            { id: 'log3', action: 'Sync Error', details: 'Failed to connect to Airtable Base Beta - API timeout.', timestamp: new Date(Date.now() - 1800000).toISOString(), status: 'failure' },
            { id: 'log4', action: 'Configuration Update', details: 'Sync interval changed to 10 minutes.', timestamp: new Date().toISOString(), user: 'user@example.com', status: 'info'},
          ],
        });
      } catch (e: any) {
        setError(e);
        setData(null);
      } finally {
        setLoading(false);
      }
    }, 1500);
  }, []);

  return { data, loading, error };
};

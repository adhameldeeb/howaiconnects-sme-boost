// src/hooks/useAirtableData.ts
import { useState, useEffect } from 'react';

export const useAirtableData = (tableName?: string) => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    console.log(`Fetching data for table: ${tableName || 'default'}...`);
    setTimeout(() => {
      try {
        // Example: provide different data based on tableName
        if (tableName === 'anotherTable') {
          setData([{ id: 'a1', field: 'Alpha', value: 100 }, { id: 'a2', field: 'Beta', value: 200 }]);
        } else {
          setData([
            { id: 1, name: 'Record 1 Example', status: 'Active', value: 120, lastUpdated: '2023-01-15T10:00:00Z' },
            { id: 2, name: 'Record 2 Sample', status: 'Inactive', value: 250, lastUpdated: '2023-01-18T14:30:00Z' },
            { id: 3, name: 'Another Item', status: 'Active', value: 80, lastUpdated: '2023-01-20T09:20:00Z' },
            { id: 4, name: 'Test Data Entry', status: 'Pending', value: 300, lastUpdated: '2023-01-22T11:05:00Z' },
          ]);
        }
        setError(null);
      } catch (e: any) {
        setError(e);
        setData(null);
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, [tableName]); // Rerun if tableName changes

  return { data, loading, error };
};

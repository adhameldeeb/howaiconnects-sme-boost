// src/hooks/useSyncConfig.ts
import { useState, useCallback } from 'react';

interface SyncConfigType {
  syncEnabled: boolean;
  interval: string; // Representing seconds, e.g., "300" for 5 minutes
  conflictResolution: 'source' | 'target' | 'manual';
  lastSyncStatus: 'success' | 'failed' | 'pending' | 'never';
  lastSyncTimestamp?: Date | null;
}

const initialConfig: SyncConfigType = {
  syncEnabled: false,
  interval: '300', // Default to 5 minutes
  conflictResolution: 'source', // Default to 'Source Wins'
  lastSyncStatus: 'never',
  lastSyncTimestamp: null,
};

export const useSyncConfig = () => {
  const [config, setConfig] = useState<SyncConfigType>(initialConfig);
  const [isLoading, setIsLoading] = useState(false); // For async operations

  // Simulate fetching initial config (e.g., from a backend)
  // useEffect(() => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     // Replace with actual API call
  //     // const fetchedConfig = await api.getSyncConfig();
  //     // setConfig(fetchedConfig);
  //     setIsLoading(false);
  //   }, 1000);
  // }, []);

  const updateConfig = useCallback((newConfig: Partial<Omit<SyncConfigType, 'lastSyncStatus' | 'lastSyncTimestamp'>>) => {
    setConfig((prevConfig) => ({ ...prevConfig, ...newConfig }));
    // Here you might also trigger a save to backend
    // api.saveSyncConfig({ ...config, ...newConfig });
    console.log('Sync config updated in hook:', { ...config, ...newConfig });
  }, [config]);

  const toggleSync = useCallback(async () => {
    setIsLoading(true);
    const newSyncEnabled = !config.syncEnabled;
    // Simulate API call to enable/disable sync
    await new Promise(resolve => setTimeout(resolve, 500));

    setConfig(prev => ({
      ...prev,
      syncEnabled: newSyncEnabled,
      lastSyncStatus: newSyncEnabled ? 'pending' : prev.lastSyncStatus, // If enabling, set to pending
    }));

    if (newSyncEnabled) {
      console.log('Sync started via hook');
      // Potentially trigger an immediate sync or report status
    } else {
      console.log('Sync stopped via hook');
    }
    setIsLoading(false);
  }, [config.syncEnabled]);

  const triggerManualSync = useCallback(async () => {
    if (!config.syncEnabled) {
      console.warn("Cannot start manual sync, sync is disabled.");
      return;
    }
    setIsLoading(true);
    setConfig(prev => ({ ...prev, lastSyncStatus: 'pending' }));
    console.log('Manual sync triggered via hook...');
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 2000));
    const success = Math.random() > 0.2; // Simulate success/failure
    setConfig(prev => ({
      ...prev,
      lastSyncStatus: success ? 'success' : 'failed',
      lastSyncTimestamp: new Date(),
    }));
    console.log(`Manual sync ${success ? 'succeeded' : 'failed'}`);
    setIsLoading(false);
  }, [config.syncEnabled]);

  return { config, updateConfig, toggleSync, triggerManualSync, isLoading };
};

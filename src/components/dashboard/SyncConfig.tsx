// src/components/dashboard/SyncConfig.tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label'; // Assuming Label component exists
import { useSyncConfig } from '@/hooks/useSyncConfig';

export const SyncConfig = () => {
  const { config, updateConfig, toggleSync, triggerManualSync, isLoading } = useSyncConfig();

  const handleSaveConfig = () => {
    // This function is now more of a conceptual save, as updates are immediate in the hook.
    // In a real app, this might confirm settings or trigger a specific backend save if not done on change.
    console.log('Configuration explicitly saved (current state):', config);
    alert('Configuration settings noted! (Live updates are active)');
  };

  return (
    <Card className="p-6 shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-8 pb-4 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">Sync Configuration</h2>
        <div className="flex items-center space-x-3">
          <Label htmlFor="syncEnabledSwitch" className="text-sm font-medium text-gray-700">
            {config.syncEnabled ? 'Sync Enabled' : 'Sync Disabled'}
          </Label>
          <Switch
            id="syncEnabledSwitch"
            checked={config.syncEnabled}
            onCheckedChange={toggleSync}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-8">
        {/* Sync Interval */}
        <div>
          <Label htmlFor="syncInterval" className="block text-sm font-medium text-gray-700 mb-2">
            Sync Interval
          </Label>
          <select
            id="syncInterval"
            className="w-full px-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white shadow-sm disabled:bg-gray-100"
            value={config.interval}
            onChange={(e) => updateConfig({ interval: e.target.value })}
            disabled={isLoading || !config.syncEnabled}
          >
            <option value="60">1 minute</option>
            <option value="300">5 minutes</option>
            <option value="600">10 minutes</option>
            <option value="1800">30 minutes</option>
            <option value="3600">1 hour</option>
          </select>
        </div>

        {/* Conflict Resolution */}
        <div>
          <Label htmlFor="conflictResolution" className="block text-sm font-medium text-gray-700 mb-2">
            Conflict Resolution Strategy
          </Label>
          <select
            id="conflictResolution"
            className="w-full px-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white shadow-sm disabled:bg-gray-100"
            value={config.conflictResolution}
            onChange={(e) => updateConfig({ conflictResolution: e.target.value as 'source' | 'target' | 'manual' })}
            disabled={isLoading || !config.syncEnabled}
          >
            <option value="source">Source Wins (Default)</option>
            <option value="target">Target Wins</option>
            <option value="manual">Manual Resolution Required</option>
          </select>
        </div>

        {/* Field Mapping Placeholder */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Field Mapping
          </Label>
          <div className="p-6 bg-gray-50 rounded-md border border-gray-200 text-center text-gray-500">
            Advanced Field Mapping Interface Placeholder - Configure how individual fields are synced between systems.
          </div>
        </div>

        {/* Sync Status and Manual Trigger */}
        <div className="p-4 bg-gray-50 rounded-md border">
            <p className="text-sm text-gray-600">
              Last Sync: {config.lastSyncTimestamp ? new Date(config.lastSyncTimestamp).toLocaleString() : 'Never'}
            </p>
            <p className={`text-sm font-medium ${
                config.lastSyncStatus === 'success' ? 'text-green-600' :
                config.lastSyncStatus === 'failed' ? 'text-red-600' :
                config.lastSyncStatus === 'pending' ? 'text-yellow-600' : 'text-gray-500'
            }`}>
              Status: {config.lastSyncStatus.charAt(0).toUpperCase() + config.lastSyncStatus.slice(1)}
            </p>
            <Button
                className="w-full mt-4"
                onClick={triggerManualSync}
                disabled={isLoading || !config.syncEnabled || config.lastSyncStatus === 'pending'}
            >
                {isLoading && config.lastSyncStatus === 'pending' ? 'Syncing...' : 'Trigger Manual Sync'}
            </Button>
        </div>


        {/* Save Button - conceptual, as changes are live */}
        <Button className="w-full py-3" onClick={handleSaveConfig} disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Confirm Settings'}
        </Button>
      </div>
    </Card>
  );
};

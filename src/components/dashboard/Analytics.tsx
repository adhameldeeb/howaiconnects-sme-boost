// src/components/dashboard/Analytics.tsx
import { LineChart, BarChart, PieChart } from '@/components/ui/charts'; // Assuming PieChart is available
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Assuming extended Card components
import { useAnalytics } from '@/hooks/useAnalytics';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Assuming Table components

export const Analytics = () => {
  const { data, loading, error } = useAnalytics();

  if (loading) return <p className="text-center py-8">Loading analytics dashboard...</p>;
  if (error) return <p className="text-center py-8 text-red-500">Error loading analytics: {error.message}</p>;
  if (!data) return <p className="text-center py-8 text-gray-500">No analytics data available.</p>;

  const healthyConnections = data.summaryStats?.connectionsHealth.filter(c => c.status === 'online').length || 0;
  const totalConnections = data.summaryStats?.connectionsHealth.length || 0;
  const connectionHealthPercentage = totalConnections > 0 ? (healthyConnections / totalConnections) * 100 : 100;


  return (
    <div className="space-y-6 pb-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records Synced</CardTitle>
            {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.summaryStats?.totalRecordsSynced.toLocaleString() || 'N/A'}</div>
            <p className="text-xs text-gray-500">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Sync Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.summaryStats?.averageSyncTime || 'N/A'}s</div>
            <p className="text-xs text-gray-500">Per sync cycle</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connection Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectionHealthPercentage.toFixed(0)}%</div>
            <p className="text-xs text-gray-500">{healthyConnections}/{totalConnections} connections online</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors Last 7 Days</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">{data.errorRate?.series[0]?.data.reduce((a,b) => a+b, 0) || '0'}</div>
            <p className="text-xs text-gray-500">Total sync errors</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          title="Sync Performance Over Time"
          data={data.syncPerformance}
          loading={loading}
          height={350}
        />
        <BarChart
          title="Data Volume Trend"
          data={data.dataVolumeTrend}
          loading={loading}
          height={350}
        />
      </div>

      {/* Error Rate and another chart (e.g. Pie Chart for data distribution if available) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart // Could be BarChart too
            title="Sync Errors (Last 4 Weeks)"
            data={data.errorRate}
            loading={loading}
            height={300}
        />
        <PieChart // Example Pie Chart - data might need adjustment in hook
            title="Data Distribution (Example)"
            data={{
                labels: data.summaryStats?.connectionsHealth.map(c => c.name) || [],
                series: [{ data: data.summaryStats?.connectionsHealth.map(() => Math.random()*100) || [] }] // Placeholder data
            }}
            loading={loading}
            height={300}
        />
      </div>


      {/* Activity Log Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity Log</CardTitle>
          <CardDescription>Overview of the latest sync activities and system events.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.activityLog.slice(0, 5).map((log) => ( // Display top 5 recent logs
                <TableRow key={log.id}>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      log.status === 'success' ? 'bg-green-100 text-green-800' :
                      log.status === 'failure' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800' // info
                    }`}>
                      {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{log.action}</TableCell>
                  <TableCell className="text-sm text-gray-600">{log.details}</TableCell>
                  <TableCell className="text-sm text-gray-500">{log.user || 'System'}</TableCell>
                  <TableCell className="text-right text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              {data.activityLog.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500 py-4">
                    No activity to display.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
           {data.activityLog.length > 5 && (
            <div className="text-center mt-4">
                <Button variant="link">View All Activity</Button> {/* Placeholder for navigation */}
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
};

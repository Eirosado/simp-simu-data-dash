import { useState } from 'react';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import { DataTableContainer } from './components/data-table/data-table-container';
import { StatusChart } from './components/charts/status-chart';
import { statusColors, statusIcons } from './utils/status-utils';
import { useFetchSimulationData } from './hooks/use-fetch-simu-data';


function App() {
  const { data, loading, error } = useFetchSimulationData();
  const [activeTab, setActiveTab] = useState(0); 

  if (loading) return <Box sx={{ p: 4, textAlign: 'center' }}>Loading…</Box>;
  if (error) return <Box sx={{ p: 4, textAlign: 'center', color: 'red' }}>Error: {error}</Box>;

  return (
    <Paper sx={{ p: 4, m: 4 }} elevation={3}>
      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} centered>
        <Tab label="Data Table" />
        <Tab label="Status Chart" />
      </Tabs>

      <Box sx={{ mt: 4 }}>
        {activeTab === 0 ? (
          <DataTableContainer data={data} statusColors={statusColors} statusIcons={statusIcons} />
        ) : (
          <StatusChart data={data} statusColors={statusColors} />
        )}
      </Box>
    </Paper>
  );
}

export default App;
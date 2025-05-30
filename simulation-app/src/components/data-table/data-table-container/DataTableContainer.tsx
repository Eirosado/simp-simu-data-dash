import { Paper, Box, Typography } from '@mui/material';
import { SimulationData } from '../../../types/simu-data-types';
import { useDataTableState } from '../hooks/use-data-table-state';
import { filterData } from '../utils/filter-utils';
import { CsvExportButton } from './components/CsvExportBtn';
import { SortableTable } from './components/SortableTable';
import { FilterControls } from './components/FilterControls';



export function DataTableContainer({ data, statusColors, statusIcons }: { 
  data: SimulationData[];
  statusColors: Record<SimulationData["status"], string>;
  statusIcons: Record<SimulationData["status"], React.FC>;
}) {
  const { state, setState } = useDataTableState();
  const filteredData = filterData(data, state);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}
        aria-live="polite"
      >
        Simulation Data Table
      </Typography>

      <FilterControls state={state} setState={setState} aria-label="Data filtering options" />

      <SortableTable
        data={filteredData}
        orderBy={state.orderBy}
        setOrderBy={(val) => setState({ orderBy: val })}
        order={state.order}
        setOrder={(val) => setState({ order: val })}
        statusColors={statusColors}
        statusIcons={statusIcons}
      />

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <CsvExportButton data={filteredData} aria-label="Export simulation data as CSV" />
      </Box>
    </Paper>
  );
}
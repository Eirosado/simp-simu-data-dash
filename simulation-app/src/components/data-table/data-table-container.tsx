import { Paper, Box, Typography } from '@mui/material';
import { SimulationData } from '../../types/simu-data-types';
import { FilterControls } from './filter-controls';
import { SortableTable } from './sortable-table';
import { CsvExportButton } from './csv-xport-btn';
import { useDataTableState } from './hooks/use-data-table-state';
import { filterData } from './utils/filter-utils';

export function DataTableContainer({ data, statusColors, statusIcons }: { 
  data: SimulationData[];
  statusColors: Record<SimulationData["status"], string>;
  statusIcons: Record<SimulationData["status"], React.FC>;
}) {
  const { state, setState } = useDataTableState();
  const filteredData = filterData(data, state);

  return (
    <Paper sx={{ p: 2 }}>
      {/* Título accesible con aria-live */}
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}
        aria-live="polite"
      >
        Simulation Data Table
      </Typography>

      {/* Controles de filtrado con atributos accesibles */}
      <FilterControls state={state} setState={setState} aria-label="Data filtering options" />

      {/* Tabla de datos con roles accesibles */}
      <SortableTable
        data={filteredData}
        orderBy={state.orderBy}
        setOrderBy={(val) => setState({ orderBy: val })}
        order={state.order}
        setOrder={(val) => setState({ order: val })}
        statusColors={statusColors}
        statusIcons={statusIcons}
      />

      {/* Botón de exportación accesible */}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <CsvExportButton data={filteredData} aria-label="Export simulation data as CSV" />
      </Box>
    </Paper>
  );
}
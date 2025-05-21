import { Paper, Box } from '@mui/material';
import { SimulationData } from '../../types/simu-data-types';
import { FilterControls } from './filter-controls';
import { SortableTable } from './sortable-table';
import { CsvExportButton } from './csv-xport-btn';
import { useDataTableState } from './hooks/use-data-table-state';
import { filterData } from './utils/filter-utils';


export function DataTableContainer({ data, statusColors, statusIcons }: { 
  data: SimulationData[];
  statusColors: Record<SimulationData["status"], string>;
  statusIcons: Record<SimulationData["status"], React.ReactNode>;
}) {
  const { state, setState } = useDataTableState();
  const filteredData = filterData(data, state);

  return (
    <Paper sx={{ p: 2 }}>
      {/* Filtering Controls */}
      <FilterControls state={state} setState={setState} />

      {/* Data Table */}
      <SortableTable
        data={filteredData}
        orderBy={state.orderBy}
        setOrderBy={(val) => setState({ orderBy: val })}
        order={state.order}
        setOrder={(val) => setState({ order: val })} statusColors={statusColors} statusIcons={statusIcons}      />

      {/* CSV Export Button */}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <CsvExportButton data={filteredData} />
      </Box>
    </Paper>
  );
}
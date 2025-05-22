import { Button } from '@mui/material';
import { SimulationData } from '../../../../types/simu-data-types';
import { CsvExporter } from '../../../../utils/csv-exporter';

interface CsvExportButtonProps {
  data: SimulationData[];
  filename?: string;
}

export function CsvExportButton({ data, filename = 'simulation_export.csv' }: CsvExportButtonProps) {
  const handleExport = () => CsvExporter.export(data, filename);

  return (
    <Button
      color="success"
      variant="contained"
      onClick={handleExport}
      disabled={data.length === 0}
      aria-label="Export simulation data as CSV file"
    >
      Export CSV
    </Button>
  );
}
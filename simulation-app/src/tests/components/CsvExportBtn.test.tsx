import { render, screen, fireEvent } from '@testing-library/react';
import { CsvExportButton } from '../../components/data-table/data-table-container/components/CsvExportBtn';
import { SimulationData } from '../../types/simu-data-types';
import { CsvExporter } from '../../utils/csv-exporter';


jest.mock('../../utils/csv-exporter');

describe('CsvExportButton', () => {
  const mockData: SimulationData[] = [
    { id: '1', timestamp: '2025-05-21T12:00:00Z', value: 42.5, parameter_set: 'Alpha', status: 'completed', performance_index: 85.3 }
  ];

  it('should render the button correctly', () => {
    render(<CsvExportButton data={mockData} />);
    
    const button = screen.getByRole('button', { name: /export simulation data as csv file/i });
    expect(button).toBeInTheDocument();
  });

  it('should disable the button when data is empty', () => {
    render(<CsvExportButton data={[]} />);
    
    const button = screen.getByRole('button', { name: /export simulation data as csv file/i });
    expect(button).toBeDisabled();
  });

  it('should call CsvExporter.export when clicked', () => {
    render(<CsvExportButton data={mockData} />);
    
    const button = screen.getByRole('button', { name: /export simulation data as csv file/i });
    fireEvent.click(button);
    
    expect(CsvExporter.export).toHaveBeenCalledWith(mockData, 'simulation_export.csv');
  });
});
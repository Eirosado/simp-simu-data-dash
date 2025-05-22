import { render, screen } from '@testing-library/react';
import { DataTableContainer } from '../../components/data-table/data-table-container/DataTableContainer';
import { useDataTableState } from '../../components/data-table/hooks/use-data-table-state';
import { filterData } from '../../components/data-table/utils/filter-utils';
import { SimulationData } from '../../types/simu-data-types';
import { statusColors, statusIcons } from '../../utils/status-utils';


jest.mock('../../components/data-table/hooks/use-data-table-state');
jest.mock('../../components/data-table/utils/filter-utils');

describe('DataTableContainer', () => {
  const mockData: SimulationData[] = [
    {
      id: '1',
      timestamp: '2025-05-21T12:00:00Z',
      value: 42.5,
      parameter_set: 'Alpha',
      status: 'completed',
      performance_index: 85.3,
    },
  ];

  const mockState = {
    search: '',
    filterStatus: '',
    filterParam: '',
    orderBy: 'id',
    order: 'asc',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDataTableState as jest.Mock).mockReturnValue({
      state: mockState,
      setState: jest.fn(),
    });

    (filterData as jest.Mock).mockReturnValue(mockData);
  });

  it('should render the table title correctly', () => {
    render(
        <DataTableContainer data={mockData} statusColors={statusColors} statusIcons={statusIcons} />
    );

    expect(
      screen.getByRole('heading', { name: /simulation data table/i })
    ).toBeInTheDocument();
  });

  it('should render the filter controls', () => {
    render(
        <DataTableContainer data={mockData} statusColors={statusColors} statusIcons={statusIcons} />
    );

    expect(screen.getByLabelText('Filter data by Status')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter data by Parameter')).toBeInTheDocument();
  });

  it('should render the sortable table', () => {
    render(
        <DataTableContainer data={mockData} statusColors={statusColors} statusIcons={statusIcons} />
    );
    
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('should render the export button', () => {
    render(
        <DataTableContainer data={mockData} statusColors={statusColors} statusIcons={statusIcons} />
    );

    expect(
      screen.getByRole('button', { name: /export simulation data as csv/i })
    ).toBeInTheDocument();
  });
});
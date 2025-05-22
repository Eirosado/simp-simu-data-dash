import { render, screen, fireEvent } from '@testing-library/react';
import { SortableTable } from '../../components/data-table/data-table-container/components/SortableTable';
import { SimulationData } from '../../types/simu-data-types';
import { statusColors, statusIcons } from '../../utils/status-utils';

jest.mock('../../components/data-table/utils/sort-utils', () => ({
  sortData: jest.fn((data) => data),
}));

jest.mock('../../components/data-table/hooks/use-pagination', () => ({
  usePagination: jest.fn(() => ({
    page: 0,
    rowsPerPage: 5,
    handleChangePage: jest.fn(),
    handleChangeRowsPerPage: jest.fn(),
  })),
}));

describe('SortableTable', () => {
  const mockData: SimulationData[] = [
    { id: '1', timestamp: '2025-05-21T12:00:00Z', value: 42.5, parameter_set: 'Alpha', status: 'completed', performance_index: 85.3 },
    { id: '2', timestamp: '2025-05-21T12:30:00Z', value: 30.2, parameter_set: 'Beta', status: 'failed', performance_index: 70.8 },
  ];

  const mockSetOrderBy = jest.fn();
  const mockSetOrder = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the table', () => {
    render(
      <SortableTable
        data={mockData}
        orderBy="id"
        setOrderBy={mockSetOrderBy}
        order="asc"
        setOrder={mockSetOrder}
        statusColors={statusColors}
        statusIcons={statusIcons}
      />
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('should render table headers with sort functionality', () => {
    render(
      <SortableTable
        data={mockData}
        orderBy="id"
        setOrderBy={mockSetOrderBy}
        order="asc"
        setOrder={mockSetOrder}
        statusColors={statusColors}
        statusIcons={statusIcons}
      />
    );

    const header = screen.getByLabelText(/sort by id/i);
    fireEvent.click(header);

    expect(mockSetOrderBy).toHaveBeenCalledWith('id');
    expect(mockSetOrder).toHaveBeenCalled();
  });

  it('should render rows with correct data', () => {
    render(
      <SortableTable
        data={mockData}
        orderBy="id"
        setOrderBy={mockSetOrderBy}
        order="asc"
        setOrder={mockSetOrder}
        statusColors={statusColors}
        statusIcons={statusIcons}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('85.30')).toBeInTheDocument();
    expect(screen.getByText('completed')).toBeInTheDocument();

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('70.80')).toBeInTheDocument();
    expect(screen.getByText('failed')).toBeInTheDocument();
 
  });
});
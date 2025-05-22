import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FilterControls } from '../../components/data-table/data-table-container/components/FilterControls';
import { FilterControlsState } from '../../components/data-table/types/filter-controls-types';
import userEvent from '@testing-library/user-event';

describe('FilterControls', () => {
  const mockSetState = jest.fn();
  const mockState: FilterControlsState = {
    search: '',
    filterStatus: '',
    filterParam: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the search field', () => {
    render(<FilterControls state={mockState} setState={mockSetState} />);
    expect(screen.getByRole('textbox', { name: /Search/i })).toBeInTheDocument();
  });

  it('should update search input when user types', async () => {
    render(<FilterControls state={mockState} setState={mockSetState} />);
    
    const searchInput = screen.getByRole('textbox', { name: /Search/i });

    await fireEvent.change(searchInput, { target: { value: 'test search' } });

    await waitFor(() => expect(mockSetState).toHaveBeenLastCalledWith({ search: 'test search' }));
  });

  it('should render status filter', () => {
    render(<FilterControls state={mockState} setState={mockSetState} />);
    expect(screen.getByRole('combobox', { name: /Status/i })).toBeInTheDocument();
  });

  it('should render parameter filter', () => {
    render(<FilterControls state={mockState} setState={mockSetState} />);
    expect(screen.getByRole('combobox', { name: /Parameter/i })).toBeInTheDocument();
  });

  it('should update filter status when user selects an option', async () => {
    render(<FilterControls state={mockState} setState={mockSetState} />);

    await act(async () => {
      userEvent.click(screen.getByRole('combobox', { name: /Status/i }));
    });

    await waitFor(() => expect(screen.getByText(/completed/i)).toBeInTheDocument());

    await act(async () => {
      userEvent.click(screen.getByText(/completed/i));
    });

    await waitFor(() => expect(mockSetState).toHaveBeenCalledWith({ filterStatus: 'completed' }));
  });

  it('should update filter parameter when user selects an option', async () => {
    render(<FilterControls state={mockState} setState={mockSetState} />);

    await act(async () => {
      userEvent.click(screen.getByRole('combobox', { name: /Parameter/i }));
    });

    await waitFor(() => expect(screen.getByText(/Alpha/i)).toBeInTheDocument());

    await act(async () => {
      userEvent.click(screen.getByText(/Alpha/i));
    });

    await waitFor(() => expect(mockSetState).toHaveBeenCalledWith({ filterParam: 'Alpha' }));
  });
});

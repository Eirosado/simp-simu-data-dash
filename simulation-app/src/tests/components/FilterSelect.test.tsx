import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FilterSelect } from '../../components/data-table/data-table-container/components/FilterSelect';
import userEvent from '@testing-library/user-event';

describe('FilterSelect', () => {
  const mockSetValue = jest.fn();

  const props = {
    label: 'Status',
    value: '',
    setValue: mockSetValue,
    options: ['completed', 'running', 'failed', 'pending'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the select dropdown with correct label', () => {
    render(<FilterSelect {...props} />);
    expect(screen.getByLabelText(/filter data by status/i)).toBeInTheDocument();
  });

  it('should render all options including "All"', async () => {
    render(<FilterSelect {...props} />);
    
    await userEvent.click(screen.getByRole('combobox', { name: /Status/i }));

    await waitFor(() => {
      expect(screen.getByText(/all/i)).toBeInTheDocument();
      expect(screen.getByText(/completed/i)).toBeInTheDocument();
      expect(screen.getByText(/running/i)).toBeInTheDocument();
      expect(screen.getByText(/failed/i)).toBeInTheDocument();
      expect(screen.getByText(/pending/i)).toBeInTheDocument();
    });
  });

  it('should update value when selecting an option', async () => {
    render(<FilterSelect {...props} />);

    await userEvent.click(screen.getByRole('combobox', { name: /Status/i }));

    await waitFor(() => screen.getByText(/completed/i));
    fireEvent.click(screen.getByText(/completed/i));

    expect(mockSetValue).toHaveBeenCalledWith('completed');
  });
});
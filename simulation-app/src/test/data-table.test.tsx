import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable } from '../components/data-table';
import { SimulationData } from '../types';

const sample: SimulationData[] = [
  {
    id: 'sim1',
    timestamp: '2025-05-01T10:00:00Z',
    value: 10,
    parameter_set: 'Alpha',
    status: 'completed',
    performance_index: 100,
  },
  {
    id: 'sim2',
    timestamp: '2025-05-02T11:00:00Z',
    value: 20,
    parameter_set: 'Beta',
    status: 'running',
    performance_index: 10,
  },
];

describe('DataTable', () => {
  beforeEach(() => {
    render(<DataTable data={sample} />);
  });

  it('renders all rows initially', () => {
    expect(screen.getByText('sim1')).toBeInTheDocument();
    expect(screen.getByText('sim2')).toBeInTheDocument();
  });

  it('filters by status', async () => {
    // MUI Select renders options in a popover
    const comboboxes = screen.getAllByRole('combobox');
    fireEvent.mouseDown(comboboxes[0]);
    // Wait for the option to appear in the DOM
    const completedOption = await screen.findByRole('option', { name: /completed/i });
    fireEvent.click(completedOption);
    // Verify filtered result
    expect(await screen.findByText('sim1')).toBeInTheDocument();
    expect(screen.queryByText('sim2')).toBeNull();
  });

  it('searches by ID', async () => {
    /** Filters rows by entering "sim2" in the search box */
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'sim2' } });

    /** Assert correct row visibility */
    expect(await screen.findByText('sim2')).toBeInTheDocument();
    expect(screen.queryByText('sim1')).not.toBeInTheDocument();
  });

  it('sorts by performance index descending', () => {
    /** Click sorting header twice to toggle descending order */
    const header = screen.getByText(/performance index/i);
    fireEvent.click(header);
    fireEvent.click(header);

    /** Capture all rows, then extract only ID column */
    const rows = screen.getAllByRole('row').slice(1); // Exclude header
    const extractedIds = rows.map(row => row.firstChild?.textContent);

    /** Ensure sorted order matches expected values */
    expect(extractedIds).toEqual(['sim1', 'sim2']);
  });
});
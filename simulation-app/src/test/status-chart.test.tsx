import { render, screen, waitFor } from '@testing-library/react';
import { StatusChart } from '../components/status-chart';
import { SimulationData } from '../types';

describe('StatusChart', () => {
  const sampleData: SimulationData[] = [
    { id: 'a', timestamp: '2025-05-01T00:00:00Z', value: 10, parameter_set: 'Alpha', status: 'completed', performance_index: 0 },
    { id: 'b', timestamp: '2025-05-02T00:00:00Z', value: 20, parameter_set: 'Beta', status: 'running', performance_index: 0 },
    { id: 'c', timestamp: '2025-05-03T00:00:00Z', value: 30, parameter_set: 'GammaSet', status: 'completed', performance_index: 0 },
    { id: 'd', timestamp: '2025-05-04T00:00:00Z', value: 40, parameter_set: 'Delta', status: 'failed', performance_index: 0 },
  ];

  beforeEach(() => {
    render(<StatusChart data={sampleData} />);
  });

  it('renders the SVG container', async () => {
    await waitFor(() => {
      const svgElement = document.querySelector('svg');
      expect(svgElement).toBeInTheDocument();
    });
  });

  it('renders bars for each unique status', async () => {
    /** Ensure bars exist using querySelectorAll */
    await waitFor(() => {
      const bars = document.querySelectorAll('rect.bar'); // Instead of getByRole
      expect(bars.length).toBeGreaterThan(0);
    });
  });

  it('displays correct X-axis labels', async () => {
    /** Check if X-axis contains correct status labels */
    const expectedLabels = ['completed', 'running', 'failed'];
    await waitFor(() => {
      expectedLabels.forEach((label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });
  });
});
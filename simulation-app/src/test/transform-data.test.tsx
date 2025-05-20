import { transformData } from '../utils/transform-data';
import { SimulationData } from '../types';

describe('transformData', () => {
  const base: Array<Partial<SimulationData>> = [
    // completed, day=1, len=5 => (100/(1*5))*100 = 2000
    { id: 'a', timestamp: '2025-05-01T00:00:00Z', value: 100, parameter_set: 'Alpha', status: 'completed' },
    // running => value/2
    { id: 'b', timestamp: '2025-05-02T00:00:00Z', value: 50, parameter_set: 'Beta', status: 'running' },
    // failed => 0
    { id: 'c', timestamp: '2025-05-03T00:00:00Z', value: 25, parameter_set: 'GammaSet', status: 'failed' },
    // invalid value => 0
    { id: 'd', timestamp: '2025-05-04T00:00:00Z', value: 'invalid', parameter_set: 'Delta', status: 'pending' },
  ];

  it('calculates performance_index correctly', () => {
    const result = transformData(base as SimulationData[]);
    expect(result[0].performance_index).toBeCloseTo((100 / (1 * 5)) * 100, 2);
    expect(result[1].performance_index).toBeCloseTo(50 / 2, 2);
    expect(result[2].performance_index).toBe(0);
    expect(result[3].performance_index).toBe(0);
  });
});

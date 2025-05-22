import { SimulationData } from "../../types/simu-data-types";
import { DataTransformer } from "../../utils/data-transformer";

describe('DataTransformer', () => {
  const mockData: SimulationData[] = [
    { id: 'a', timestamp: '2025-05-01T00:00:00Z', value: 10, parameter_set: 'Alpha', status: 'completed', performance_index: 0 },
    { id: 'b', timestamp: '2025-05-02T00:00:00Z', value: 20, parameter_set: 'Beta', status: 'running', performance_index: 0 },
    { id: 'c', timestamp: '2025-05-03T00:00:00Z', value: null, parameter_set: 'GammaSet', status: 'failed', performance_index: 0 },
    { id: 'd', timestamp: '2025-05-04T00:00:00Z', value: 40, parameter_set: 'Delta', status: 'pending', performance_index: 0 }
  ];

  it('should transform data correctly', () => {
    const transformedData = DataTransformer.transform(mockData);

    expect(transformedData).toHaveLength(mockData.length);

    transformedData.forEach((item) => {
      expect(item).toHaveProperty('performance_index');
      expect(typeof item.performance_index).toBe('number');
    });
  });

  it('should compute performance index for valid data', () => {
    const transformedData = DataTransformer.transform(mockData);

    expect(transformedData[0].performance_index).toBeGreaterThan(0);  // Completed simulation
    expect(transformedData[1].performance_index).toBeGreaterThan(0);  // Running simulation
  });

  it('should handle missing or invalid values gracefully', () => {
    const transformedData = DataTransformer.transform(mockData);

    expect(transformedData[2].performance_index).toBe(0); // Null value case
    expect(transformedData[3].performance_index).toBeGreaterThan(0); // Pending simulation
  });
});
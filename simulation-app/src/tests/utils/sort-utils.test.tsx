import { sortData } from "../../components/data-table/utils/sort-utils";
import { SimulationData } from "../../types/simu-data-types";


describe('sortData', () => {
  const mockData: SimulationData[] = [
    { id: '1', timestamp: '2025-05-21T12:00:00Z', value: 42.5, parameter_set: 'Alpha', status: 'completed', performance_index: 85.3 },
    { id: '2', timestamp: '2025-05-21T12:30:00Z', value: 30.2, parameter_set: 'Beta', status: 'running', performance_index: 70.8 },
    { id: '3', timestamp: '2025-05-21T13:00:00Z', value: 55.6, parameter_set: 'GammaSet', status: 'failed', performance_index: 60.1 },
  ];

  it('should sort data by value in ascending order', () => {
    const result = sortData(mockData, 'value', 'asc');
    expect(result).toEqual([
      mockData[1], // 30.2
      mockData[0], // 42.5
      mockData[2], // 55.6
    ]);
  });

  it('should sort data by value in descending order', () => {
    const result = sortData(mockData, 'value', 'desc');
    expect(result).toEqual([
      mockData[2], // 55.6
      mockData[0], // 42.5
      mockData[1], // 30.2
    ]);
  });

  it('should sort data by performance_index in ascending order', () => {
    const result = sortData(mockData, 'performance_index', 'asc');
    expect(result).toEqual([
      mockData[2], // 60.1
      mockData[1], // 70.8
      mockData[0], // 85.3
    ]);
  });

  it('should sort data by performance_index in descending order', () => {
    const result = sortData(mockData, 'performance_index', 'desc');
    expect(result).toEqual([
      mockData[0], // 85.3
      mockData[1], // 70.8
      mockData[2], // 60.1
    ]);
  });

  it('should return the original order when sorting by a non-existent key', () => {
    const result = sortData(mockData, 'nonExistentKey' as keyof SimulationData, 'asc');
    expect(result).toEqual(mockData);
  });

  it('should return the original order when values are null', () => {
    const dataWithNullValues: SimulationData[] = [
      { id: '1', timestamp: '2025-05-21T12:00:00Z', value: null, parameter_set: 'Alpha', status: 'completed', performance_index: 85.3 },
      { id: '2', timestamp: '2025-05-21T12:00:00Z', value: null, parameter_set: 'Beta', status: 'running', performance_index: 70.8 },
    ];
    const result = sortData(dataWithNullValues, 'value', 'asc');
    expect(result).toEqual(dataWithNullValues);
  });
});
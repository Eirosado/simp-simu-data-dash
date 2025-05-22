import { DataTableState } from "../../components/data-table/types/data-table-types";
import { filterData } from "../../components/data-table/utils/filter-utils";
import { SimulationData } from "../../types/simu-data-types";


describe('filterData', () => {
  const mockData: SimulationData[] = [
    { id: '1', timestamp: '2025-05-21T12:00:00Z', value: 42.5, parameter_set: 'Alpha', status: 'completed', performance_index: 85.3 },
    { id: '2', timestamp: '2025-05-21T12:30:00Z', value: 30.2, parameter_set: 'Beta', status: 'running', performance_index: 70.8 },
    { id: '3', timestamp: '2025-05-21T13:00:00Z', value: 55.6, parameter_set: 'GammaSet', status: 'failed', performance_index: 60.1 },
  ];

  it('should return all data when filters are empty', () => {
    const state: DataTableState = {
        search: '', filterStatus: '', filterParam: '',
        orderBy: "id",
        order: "asc"
    };
    const result = filterData(mockData, state);
    expect(result).toEqual(mockData);
  });

  it('should filter by status', () => {
    const state: DataTableState = {
        search: '', filterStatus: 'completed', filterParam: '',
        orderBy: "id",
        order: "asc"
    };
    const result = filterData(mockData, state);
    expect(result).toEqual([mockData[0]]);
  });

  it('should filter by parameter_set', () => {
    const state: DataTableState = {
        search: '', filterStatus: '', filterParam: 'Beta',
        orderBy: "id",
        order: "asc"
    };
    const result = filterData(mockData, state);
    expect(result).toEqual([mockData[1]]);
  });

  it('should filter by search term', () => {
    const state: DataTableState = {
        search: '42.5', filterStatus: '', filterParam: '',
        orderBy: "id",
        order: "asc"
    };
    const result = filterData(mockData, state);
    expect(result).toEqual([mockData[0]]);
  });

  it('should apply multiple filters correctly', () => {
    const state: DataTableState = {
        search: '30.2', filterStatus: 'running', filterParam: 'Beta',
        orderBy: "id",
        order: "asc"
    };
    const result = filterData(mockData, state);
    expect(result).toEqual([mockData[1]]);
  });

  it('should return an empty array when no matches', () => {
    const state: DataTableState = {
        search: 'notfound', filterStatus: 'completed', filterParam: 'GammaSet',
        orderBy: "id",
        order: "asc"
    };
    const result = filterData(mockData, state);
    expect(result).toEqual([]);
  });
});
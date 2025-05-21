import { SimulationData } from '../../../types/simu-data-types';
import { DataTableState } from '../types/data-table-types';

export function filterData(data: SimulationData[], state: DataTableState): SimulationData[] {
  return data.filter(({ status, parameter_set, ...item }) =>
    (!state.filterStatus || status === state.filterStatus) &&
    (!state.filterParam || parameter_set === state.filterParam) &&
    Object.values(item).join(' ').toLowerCase().includes(state.search.toLowerCase())
  );
}
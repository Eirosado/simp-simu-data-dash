import { SimulationData } from "../../../types/simu-data-types";

export function sortData(data: SimulationData[], orderBy: keyof SimulationData, order: 'asc' | 'desc'): SimulationData[] {
  return [...data].sort((a, b) => {
    const aVal = a[orderBy];
    const bVal = b[orderBy];
    if (aVal == null || bVal == null) return 0;
    return aVal < bVal ? (order === 'asc' ? -1 : 1) : aVal > bVal ? (order === 'asc' ? 1 : -1) : 0;
  });
}
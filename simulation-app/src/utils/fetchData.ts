import { SimulationData } from '../types';

export async function fetchSimulationData(): Promise<SimulationData[]> {
  const res = await fetch('/simulation_data.json');
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  const data = await res.json();
  // Validate top-level
  if (!Array.isArray(data)) {
    throw new Error('Data is not an array');
  }
  // Validate each item
  data.forEach((item, i) => {
    const keys = ['id','timestamp','value','parameter_set','status'];
    keys.forEach(key => {
      if (!(key in item)) {
        throw new Error(`Missing key '${key}' in entry ${i}`);
      }
    });
  });
  return data as SimulationData[];
}
import { SimulationData } from '../types';

export async function fetchSimulationData(): Promise<SimulationData[]> {
  const res = await fetch('http://localhost:4000/simulations');
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  
  const data = await res.json();
  validateDataStructure(data);
  validateDataEntries(data);

  return data as SimulationData[];
}

function validateDataStructure(data: any): void {
  if (!Array.isArray(data)) {
    throw new Error('Data is not an array');
  }
}

function validateDataEntries(data: any[]): void {
  const keys = ['id', 'timestamp', 'value', 'parameter_set', 'status'];

  data.forEach((item, i) => {
    keys.forEach(key => {
      if (!(key in item)) {
        throw new Error(`Missing key '${key}' in entry ${i}`);
      }
    });
  });
}
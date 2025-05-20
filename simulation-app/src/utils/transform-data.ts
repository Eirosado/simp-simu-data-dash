import { SimulationData } from '../types';

export function transformData(raw: SimulationData[]): SimulationData[] {
  return raw.map(item => {
    const { timestamp, parameter_set, status, value } = item;

    const date = new Date(timestamp);
    const day = date.getUTCDate();  // Extracts day of the month (1–31)
    const length = parameter_set.length; // Length of parameter_set string
    const numericValue = typeof value === 'number' ? value : NaN;

    // Calculate performance index using helper function
    let index = calculatePerformanceIndex(day, length, numericValue, status);

    // Ensure missing/invalid values are handled
    if (isNaN(index) || value == null) {
      index = 0;
    }

    return {
      ...item,
      performance_index: parseFloat(index.toFixed(2)), // Rounded to 2 decimals
    };
  });
}

function calculatePerformanceIndex(day: number, length: number, numericValue: number, status: string): number {
  if (status === 'completed' && day > 0 && length > 0 && !isNaN(numericValue)) {
    return (numericValue / (day * length)) * 100;
  }
  
  if (['running', 'pending'].includes(status)) {
    return !isNaN(numericValue) ? numericValue / 2 : 0;
  }
  
  return 0; // Default for 'failed' or unknown statuses
}

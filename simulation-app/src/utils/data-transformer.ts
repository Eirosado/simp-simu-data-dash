import { SimulationData } from '../types/simu-data-types';
import { PerformanceIndexCalculator } from './performance-index-calculator';

export class DataTransformer {
  static transform(raw: SimulationData[]): SimulationData[] {
    return raw.map(item => {
      const { timestamp, parameter_set, status, value } = item;
      const date = new Date(timestamp);
      const day = date.getUTCDate();
      const length = parameter_set.length;
      const numericValue = typeof value === 'number' ? value : NaN;

      let index = PerformanceIndexCalculator.calculate(day, length, numericValue, status);

      if (isNaN(index) || value == null) {
        index = 0;
      }

      return {
        ...item,
        performance_index: parseFloat(index.toFixed(2)), // Rounded to 2 decimals
      };
    });
  }
}
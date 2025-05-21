import { SimulationData } from '../types/simu-data-types';

const API_URL = 'http://localhost:4000/simulations';

export class SimulationDataService {
  static async fetchData(): Promise<SimulationData[]> {
    const data = await this.fetchJson(API_URL);
    this.validateDataStructure(data);
    this.validateDataEntries(data);

    return data as SimulationData[];
  }

  private static async fetchJson(url: string): Promise<any> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  private static validateDataStructure(data: any): void {
    if (!Array.isArray(data)) {
      throw new Error('Data is not an array');
    }
  }

  private static validateDataEntries(data: any[]): void {
    const requiredKeys = ['id', 'timestamp', 'value', 'parameter_set', 'status'];

    data.forEach((item, index) => {
      requiredKeys.forEach((key) => {
        if (!(key in item)) {
          throw new Error(`Missing key '${key}' in entry ${index}`);
        }
      });
    });
  }
}
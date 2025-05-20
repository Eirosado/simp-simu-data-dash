export interface SimulationData {
  id: string;
  timestamp: string;
  value: number | null | string;
  parameter_set: string;
  status: 'completed' | 'running' | 'failed' | 'pending';
  performance_index?: number;
}
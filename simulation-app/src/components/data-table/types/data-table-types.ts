import { SimulationData } from "../../../types/simu-data-types";

export interface DataTableState {
  search: string;
  filterStatus: string;
  filterParam: string;
  orderBy: keyof SimulationData;
  order: 'asc' | 'desc';
}

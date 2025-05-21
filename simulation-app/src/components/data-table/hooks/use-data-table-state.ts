import { useState } from 'react';
import { DataTableState } from '../types/data-table-types';

export function useDataTableState() {
  const [state, setState] = useState<DataTableState>({
    search: '',
    filterStatus: '',
    filterParam: '',
    orderBy: 'id',
    order: 'asc',
  });

  const updateState = (updates: Partial<DataTableState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return { state, setState: updateState };
}
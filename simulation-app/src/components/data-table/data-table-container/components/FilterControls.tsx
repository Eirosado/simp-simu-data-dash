import { TextField } from '@mui/material';
import { FilterControlsState } from '../../types/filter-controls-types';
import { FilterSelect } from './FilterSelect';



interface FilterControlsProps {
  state: FilterControlsState;
  setState: (updates: Partial<FilterControlsState>) => void;
}

export function FilterControls({ state, setState }: FilterControlsProps) {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>

      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={state.search}
        onChange={(e) => setState({ search: e.target.value  })}
        aria-label="Search simulation data"
      />

      <FilterSelect 
        label="Status" 
        value={state.filterStatus} 
        setValue={(v) => setState({ filterStatus: v })} 
        options={["completed", "running", "failed", "pending"]}
        aria-label="Filter data by status"
      />


      <FilterSelect 
        label="Parameter" 
        value={state.filterParam} 
        setValue={(v) => setState({ filterParam: v })} 
        options={["Alpha", "Beta", "GammaSet", "Delta"]}
        aria-label="Filter data by parameter"
      />
    </div>
  );
}
import { TextField } from '@mui/material';
import { FilterSelect } from './filter-select';
import { FilterControlsState } from './types/filter-controls-types';


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
        onChange={(e) => setState({ search: e.target.value })}
      />
      <FilterSelect label="Status" value={state.filterStatus} setValue={(v) => setState({ filterStatus: v })} options={["completed", "running", "failed", "pending"]} />
      <FilterSelect label="Parameter" value={state.filterParam} setValue={(v) => setState({ filterParam: v })} options={["Alpha", "Beta", "GammaSet", "Delta"]} />
    </div>
  );
}
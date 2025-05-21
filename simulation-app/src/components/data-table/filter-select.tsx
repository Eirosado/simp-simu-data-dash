import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';

interface FilterSelectProps {
  label: string;
  value: string;
  setValue: (v: string) => void;
  options: string[];
}

export function FilterSelect({ label, value, setValue, options }: FilterSelectProps) {
  return (
    <FormControl sx={{ minWidth: '10vw', maxWidth: '25vw', flexGrow: 1 }} size="small">
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={value} onChange={(e) => setValue(e.target.value)}>
        <MenuItem value="">All</MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
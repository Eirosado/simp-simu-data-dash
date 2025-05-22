import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';

interface FilterSelectProps {
  label: string;
  value: string;
  setValue: (v: string) => void;
  options: string[];
}

export function FilterSelect({ label, value, setValue, options }: FilterSelectProps) {
  return (
    <FormControl 
      sx={{ minWidth: '10vw', maxWidth: '25vw', flexGrow: 1 }} 
      size="small"
      aria-labelledby={`${label}-label`}
    >
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select 
        labelId={`${label}-label`} 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
        aria-label={`Filter data by ${label}`}
      >
        <MenuItem value="">All</MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option} aria-label={`${label} option: ${option}`}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
import React, { useMemo, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TableSortLabel,
  TextField, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { SimulationData } from '../types';

type Order = 'asc' | 'desc';

interface DataTableProps {
  data: SimulationData[];
}

export function DataTable({ data }: DataTableProps) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterParam, setFilterParam] = useState<string>('');
  const [orderBy, setOrderBy] = useState<keyof SimulationData>('id');
  const [order, setOrder] = useState<Order>('asc');

  /** Filter dataset based on status, parameter, and search query */
  const filteredData = useMemo(() => {
    return data.filter(({ status, parameter_set, ...item }) =>
      (!filterStatus || status === filterStatus) &&
      (!filterParam || parameter_set === filterParam) &&
      Object.values(item).join(' ').toLowerCase().includes(search.toLowerCase())
    );
  }, [data, filterStatus, filterParam, search]);

  /** Sort filtered dataset */
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aVal = a[orderBy];
      const bVal = b[orderBy];
      if (aVal == null || bVal == null) return 0;
      return aVal < bVal ? (order === 'asc' ? -1 : 1) : aVal > bVal ? (order === 'asc' ? 1 : -1) : 0;
    });
  }, [filteredData, orderBy, order]);

  /** Handle sorting change */
  const handleSort = (column: keyof SimulationData) => {
    setOrder(orderBy === column && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(column);
  };

  return (
    <Paper sx={{ p: 2 }}>
      {/* Filters & Search */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FilterControl label="Status" value={filterStatus} setValue={setFilterStatus} options={["completed", "running", "failed", "pending"]} />
        <FilterControl label="Parameter" value={filterParam} setValue={setFilterParam} options={["Alpha", "Beta", "GammaSet", "Delta"]} />
      </div>

      {/* Data Table */}
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {["id", "timestamp", "value", "parameter_set", "status", "performance_index"].map((col) => (
                <TableCell key={col}>
                  <TableSortLabel
                    active={orderBy === col}
                    direction={orderBy === col ? order : 'asc'}
                    onClick={() => handleSort(col as keyof SimulationData)}
                  >
                    {col.replace('_', ' ').toUpperCase()}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.id} hover sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                <TableCell>{typeof row.value === 'number' ? row.value : 'N/A'}</TableCell>
                <TableCell>{row.parameter_set}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.performance_index?.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

/** Reusable filter select component */
function FilterControl({ label, value, setValue, options }: { label: string; value: string; setValue: (v: string) => void; options: string[] }) {
  return (
    <FormControl sx={{ minWidth: 150 }}size="small">
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
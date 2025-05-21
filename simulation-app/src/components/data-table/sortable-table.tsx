import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, TableFooter, TablePagination
} from '@mui/material';
import { SimulationData } from '../../types/simu-data-types';
import { sortData } from './utils/sort-utils';
import { usePagination } from './hooks/use-pagination';

interface SortableTableProps {
  data: SimulationData[];
  orderBy: keyof SimulationData;
  setOrderBy: (col: keyof SimulationData) => void;
  order: 'asc' | 'desc';
  setOrder: (ord: 'asc' | 'desc') => void;
  statusColors: Record<SimulationData["status"], string>;
  statusIcons: Record<SimulationData["status"], React.FC>;
}

export function SortableTable({ data, orderBy, setOrderBy, order, setOrder, statusColors, statusIcons }: SortableTableProps) {
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination(data.length);
  const sortedData = sortData(data, orderBy, order);

  const handleSort = (column: keyof SimulationData) => {
    setOrder(orderBy === column && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(column);
  };

  return (
    <TableContainer sx={{ maxHeight: 500, overflowY: 'auto' }} role="region" aria-labelledby="simulation-data-table">
      <Table stickyHeader size="small" role="table">
        <TableHead>
          <TableRow role="row">
            {["id", "timestamp", "value", "parameter_set", "status", "performance_index"].map((col) => (
              <TableCell key={col} role="columnheader">
                <TableSortLabel
                  active={orderBy === col}
                  direction={orderBy === col ? order : 'asc'}
                  onClick={() => handleSort(col as keyof SimulationData)}
                  aria-label={`Sort by ${col.replace('_', ' ')}`}
                >
                  {col.replace('_', ' ').toUpperCase()}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
            return (
              <TableRow
                key={row.id}
                hover
                sx={{
                  backgroundColor: index % 2 === 0 ? '#FAFAFA' : 'white',
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
                role="row"
                aria-label={`Row for simulation ID ${row.id}`}
              >
                <TableCell role="cell">{row.id}</TableCell>
                <TableCell role="cell">{new Date(row.timestamp).toLocaleString()}</TableCell>
                <TableCell role="cell">{typeof row.value === 'number' ? row.value : 'N/A'}</TableCell>
                <TableCell role="cell">{row.parameter_set}</TableCell>
                <TableCell role="cell" sx={{ fontWeight: row.status === "failed" ? 'bold' : 'normal', color: statusColors[row.status] }}>
                  {React.createElement(statusIcons[row.status])} {row.status}
                </TableCell>
                <TableCell role="cell">{row.performance_index?.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow role="row">
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              aria-label="Pagination controls for simulation data table"
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
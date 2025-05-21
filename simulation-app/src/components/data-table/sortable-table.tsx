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
  statusIcons: Record<SimulationData["status"], React.ReactNode>;
}

export function SortableTable({ data, orderBy, setOrderBy, order, setOrder, statusColors, statusIcons }: SortableTableProps) {
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination(data.length);
  const sortedData = sortData(data, orderBy, order);

  const handleSort = (column: keyof SimulationData) => {
    setOrder(orderBy === column && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(column);
  };

  return (
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
          {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <TableRow
              key={row.id}
              hover
              sx={{
                backgroundColor: index % 2 === 0 ? '#FAFAFA' : 'white',
                '&:hover': { backgroundColor: '#f5f5f5' }
              }}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
              <TableCell>{typeof row.value === 'number' ? row.value : 'N/A'}</TableCell>
              <TableCell>{row.parameter_set}</TableCell>
              <TableCell sx={{ fontWeight: row.status === "failed" ? 'bold' : 'normal', color: statusColors[row.status] }}>
                {statusIcons[row.status]} {row.status}
              </TableCell>
              <TableCell>{row.performance_index?.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
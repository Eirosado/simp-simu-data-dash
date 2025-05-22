import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../../components/data-table/hooks/use-pagination';


describe('usePagination', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => usePagination(100));

    expect(result.current.page).toBe(0);
    expect(result.current.rowsPerPage).toBe(10);
  });

  it('should update page when changing page', () => {
    const { result } = renderHook(() => usePagination(100));

    act(() => {
      result.current.handleChangePage(null, 2);
    });

    expect(result.current.page).toBe(2);
  });

  it('should update rowsPerPage and reset page when changing rows per page', () => {
    const { result } = renderHook(() => usePagination(100));

    act(() => {
      result.current.handleChangeRowsPerPage({ target: { value: '20' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.rowsPerPage).toBe(20);
    expect(result.current.page).toBe(0); // Debe resetearse al cambiar `rowsPerPage`
  });
});
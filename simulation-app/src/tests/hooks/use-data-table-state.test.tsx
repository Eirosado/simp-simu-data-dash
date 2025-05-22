import { renderHook, act } from '@testing-library/react';
import { useDataTableState } from '../../components/data-table/hooks/use-data-table-state';


describe('useDataTableState', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useDataTableState());

    expect(result.current.state).toEqual({
      search: '',
      filterStatus: '',
      filterParam: '',
      orderBy: 'id',
      order: 'asc',
    });
  });

  it('should update search value', () => {
    const { result } = renderHook(() => useDataTableState());

    act(() => {
      result.current.setState({ search: 'test search' });
    });

    expect(result.current.state.search).toBe('test search');
  });

  it('should update filter status', () => {
    const { result } = renderHook(() => useDataTableState());

    act(() => {
      result.current.setState({ filterStatus: 'completed' });
    });

    expect(result.current.state.filterStatus).toBe('completed');
  });

  it('should update filter parameter', () => {
    const { result } = renderHook(() => useDataTableState());

    act(() => {
      result.current.setState({ filterParam: 'Alpha' });
    });

    expect(result.current.state.filterParam).toBe('Alpha');
  });

  it('should update orderBy', () => {
    const { result } = renderHook(() => useDataTableState());

    act(() => {
      result.current.setState({ orderBy: 'timestamp' });
    });

    expect(result.current.state.orderBy).toBe('timestamp');
  });

  it('should update order direction', () => {
    const { result } = renderHook(() => useDataTableState());

    act(() => {
      result.current.setState({ order: 'desc' });
    });

    expect(result.current.state.order).toBe('desc');
  });

  it('should update multiple state values at once', () => {
    const { result } = renderHook(() => useDataTableState());

    act(() => {
      result.current.setState({
        search: 'new search',
        filterStatus: 'failed',
        orderBy: 'performance_index',
        order: 'asc',
      });
    });

    expect(result.current.state).toEqual({
      search: 'new search',
      filterStatus: 'failed',
      filterParam: '',
      orderBy: 'performance_index',
      order: 'asc',
    });
  });
});
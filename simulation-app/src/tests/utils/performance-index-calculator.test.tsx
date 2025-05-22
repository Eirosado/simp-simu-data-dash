import { PerformanceIndexCalculator } from "../../utils/performance-index-calculator";

describe('PerformanceIndexCalculator', () => {
  it('should calculate correct performance index for completed status', () => {
    const result = PerformanceIndexCalculator.calculate(5, 10, 50, 'completed');
    expect(result).toBe((50 / (5 * 10)) * 100);
  });

  it('should return half of numeric value for running or pending status', () => {
    const runningResult = PerformanceIndexCalculator.calculate(0, 0, 40, 'running');
    const pendingResult = PerformanceIndexCalculator.calculate(0, 0, 60, 'pending');

    expect(runningResult).toBe(20);
    expect(pendingResult).toBe(30);
  });

  it('should return 0 for failed status', () => {
    const result = PerformanceIndexCalculator.calculate(5, 10, 50, 'failed');
    expect(result).toBe(0);
  });

  it('should return 0 if numericValue is NaN', () => {
    const result = PerformanceIndexCalculator.calculate(5, 10, NaN, 'completed');
    expect(result).toBe(0);
  });

  it('should return 0 if day or length are non-positive for completed status', () => {
    const result1 = PerformanceIndexCalculator.calculate(0, 10, 50, 'completed');
    const result2 = PerformanceIndexCalculator.calculate(5, 0, 50, 'completed');

    expect(result1).toBe(0);
    expect(result2).toBe(0);
  });
});
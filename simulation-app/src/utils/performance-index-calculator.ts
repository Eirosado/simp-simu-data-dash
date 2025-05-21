export class PerformanceIndexCalculator {
  static calculate(day: number, length: number, numericValue: number, status: string): number {
    if (status === 'completed' && day > 0 && length > 0 && !isNaN(numericValue)) {
      return (numericValue / (day * length)) * 100;
    }

    if (['running', 'pending'].includes(status)) {
      return !isNaN(numericValue) ? numericValue / 2 : 0;
    }

    return 0;
  }
}
import { SimulationData } from '../types/simu-data-types';

export class CsvExporter {
  static headers = ['id', 'timestamp', 'value', 'parameter_set', 'status', 'performance_index'];

  static export(data: SimulationData[], filename = 'export.csv'): void {
    if (data.length === 0) {
      console.warn('No data available for export.');
      return;
    }

    const csvContent = this.toCsv(data);
    this.downloadCsv(csvContent, filename);
  }

  static toCsv(data: SimulationData[]): string {
    const lines: string[] = [this.headers.join(',')];

    data.forEach((item) => {
      const row = [
        item.id,
        item.timestamp,
        typeof item.value === 'number' ? item.value.toString() : '',
        item.parameter_set,
        item.status,
        item.performance_index?.toFixed(2) ?? '',
      ];

      lines.push(this.escapeCsvRow(row).join(','));
    });

    return lines.join('\r\n');
  }

  private static escapeCsvRow(row: string[]): string[] {
    return row.map((field) =>
      field.includes(',') || field.includes('"')
        ? `"${field.replace(/"/g, '""')}"`
        : field
    );
  }

  static downloadCsv(csvContent: string, filename: string): void {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
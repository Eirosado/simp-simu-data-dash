import { SimulationData } from "../../types/simu-data-types";
import { CsvExporter } from "../../utils/csv-exporter";

describe('CsvExporter', () => {
    const mockData: SimulationData[] = [
        {
        id: '1',
        timestamp: '2025-05-21T12:00:00Z',
        value: 42.5,
        parameter_set: 'Alpha',
        status: 'completed',
        performance_index: 85.3,
        },
        {
        id: '2',
        timestamp: '2025-05-21T12:30:00Z',
        value: null,
        parameter_set: 'Beta',
        status: 'failed',
        performance_index: 70.8,
        },
    ];

    it('should generate correct CSV content', () => {
        const csvString = CsvExporter.toCsv(mockData);
        
        const expectedCsv = [
        'id,timestamp,value,parameter_set,status,performance_index',
        '1,2025-05-21T12:00:00Z,42.5,Alpha,completed,85.30',
        '2,2025-05-21T12:30:00Z,,Beta,failed,70.80'
        ].join('\r\n');

        expect(csvString).toBe(expectedCsv);
    });

    it('should escape fields properly', () => {
        const escapedRow = CsvExporter['escapeCsvRow'](['hello,world', '"quoted"']);
        expect(escapedRow).toEqual(['"hello,world"', '"""quoted"""']);
    });

    it('should warn if trying to export empty data', () => {
        console.warn = jest.fn(); // Mock console.warn
        CsvExporter.export([], 'empty.csv');
        expect(console.warn).toHaveBeenCalledWith('No data available for export.');
    });

    it('should trigger CSV download', () => {
        global.URL.createObjectURL = jest.fn(() => 'blob-url');
        global.URL.revokeObjectURL = jest.fn();

        document.body.appendChild = jest.fn();
        document.body.removeChild = jest.fn();

        CsvExporter.export(mockData, 'test.csv');

        expect(document.body.appendChild).toHaveBeenCalled();
        expect(document.body.removeChild).toHaveBeenCalled();
        expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob-url');
    });
});
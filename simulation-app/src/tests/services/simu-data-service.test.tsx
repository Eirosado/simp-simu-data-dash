import { SimulationDataService } from "../../services/simu-data-service";

describe('SimulationDataService', () => {
  const mockData = [
    { id: '1', timestamp: '2025-05-21T12:00:00Z', value: 42.5, parameter_set: 'Alpha', status: 'completed' },
    { id: '2', timestamp: '2025-05-21T12:30:00Z', value: null, parameter_set: 'Beta', status: 'failed' },
  ];

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('should fetch and return simulation data correctly', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await SimulationDataService.fetchData();
    expect(result).toEqual(mockData);
  });

  it('should throw an error for invalid response status', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(SimulationDataService.fetchData()).rejects.toThrow('HTTP 404: Not Found');
  });

  it('should throw an error if data is not an array', () => {
    expect(() => SimulationDataService['validateDataStructure']({ key: 'value' })).toThrow('Data is not an array');
  });

  it('should throw an error for missing required keys', () => {
    const invalidData = [{ id: '1', timestamp: '2025-05-21T12:00:00Z' }];
    expect(() => SimulationDataService['validateDataEntries'](invalidData)).toThrow("Missing key 'value' in entry 0");
  });
});
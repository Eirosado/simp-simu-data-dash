import { fetchSimulationData } from '../utils/fetch-data';

describe('fetchSimulationData', () => {
  const mockData = [
    { id: 'sim_001', timestamp: '2025-05-01T10:00:00Z', value: 42, parameter_set: 'Alpha', status: 'completed' }
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as any)
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('fetches and returns simulation data', async () => {
    const data = await fetchSimulationData();
    expect(fetch).toHaveBeenCalledWith('http://localhost:4000/simulations');
    expect(data).toEqual(mockData);
  });

  it('throws on HTTP error', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false, status: 500, statusText: 'Server Error' } as any)
    );
    await expect(fetchSimulationData()).rejects.toThrow('HTTP 500: Server Error');
  });

  it('throws if JSON isn’t an array', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) } as any)
    );
    await expect(fetchSimulationData()).rejects.toThrow('Data is not an array');
  });
});

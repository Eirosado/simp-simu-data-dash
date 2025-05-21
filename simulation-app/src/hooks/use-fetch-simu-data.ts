import { useEffect, useState } from 'react';
import { SimulationData } from '../types/simu-data-types';
import { SimulationDataService } from '../services/simu-data-service';

export function useFetchSimulationData() {
  const [data, setData] = useState<SimulationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    SimulationDataService.fetchData()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
import { useEffect, useState } from 'react';
import { SimulationData } from '../types/simu-data-types';
import { SimulationDataService } from '../services/simu-data-service';
import { DataTransformer } from '../utils/data-transformer';

export function useFetchSimulationData() {
  const [data, setData] = useState<SimulationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    SimulationDataService.fetchData()
      .then((rawData) => {
        const transformedData = DataTransformer.transform(rawData);
        setData(transformedData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
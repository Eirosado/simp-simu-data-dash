import React, { useEffect, useState } from 'react';
import { fetchSimulationData } from './utils/fetchData';
import { SimulationData } from './types';

function App() {
  const [data, setData] = useState<SimulationData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSimulationData()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading data…</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!data) return null;

  return (
    <div>
      {/* Pass data to table/chart components */}
    </div>
  );
}

export default App;
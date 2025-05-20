// src/App.tsx
import React, { useEffect, useState } from 'react';
import { fetchSimulationData } from './utils/fetch-data';
import { transformData }       from './utils/transform-data';
import { SimulationData }      from './types';
import { DataTable } from './components/data-table';

function App() {
  const [rawData, setRawData]             = useState<SimulationData[]>([]);
  const [transformedData, setTransData]   = useState<SimulationData[]>([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState<string | null>(null);

  useEffect(() => {
    fetchSimulationData()
      .then(raw => {
        setRawData(raw);
        setTransData(transformData(raw));
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error)   return <div className="error">Error: {error}</div>;

  return (
     <div style={{ padding: 16 }}>
      <DataTable data={transformedData} />
    </div>
  );
}

export default App;

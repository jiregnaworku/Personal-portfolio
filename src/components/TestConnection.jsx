import { useState, useEffect } from 'react';
import apiService from '../api';

const TestConnection = () => {
  const [backendStatus, setBackendStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await apiService.healthCheck();
        setBackendStatus('Connected! ✅');
      } catch (error) {
        console.error('Backend connection failed:', error);
        setBackendStatus('Connection failed ❌');
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  if (loading) return <div>Testing connection...</div>;

  return (
    <div>
      <h3>Backend Connection Test</h3>
      <p>Status: {backendStatus}</p>
      <p>API URL: {import.meta.env.VITE_API_URL}</p>
    </div>
  );
};

export default TestConnection;

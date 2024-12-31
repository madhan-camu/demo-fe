import { useState } from 'react';

function useApi(apiFunction) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const executeAPI = async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiFunction(...args);
            return result;
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { executeAPI, loading, error };
}

export default useApi;
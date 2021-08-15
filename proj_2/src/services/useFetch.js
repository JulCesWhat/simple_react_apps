import { useState, useEffect } from 'react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(baseUrl + url);
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                } else {
                    throw res;
                }
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        })()
    }, [url]);

    return { data, error, loading };
}
export default useFetch;
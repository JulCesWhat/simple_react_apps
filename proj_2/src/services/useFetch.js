import { useState, useEffect, useRef } from 'react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        (async () => {
            try {
                const res = await fetch(baseUrl + url);
                if (res.ok) {
                    const json = await res.json();
                    if (isMounted.current) setData(json);
                } else {
                    throw res;
                }
            } catch (e) {
                if (isMounted.current) setError(e);
            } finally {
                if (isMounted.current) setLoading(false);
            }
        })()
        return () => (isMounted.current = false);
    }, [url]);

    return { data, error, loading };
}
export default useFetch;

export function Fetch({ url, children }) {
    const { data, loading, error } = useFetch(url);
    return children(data, loading, error);
}
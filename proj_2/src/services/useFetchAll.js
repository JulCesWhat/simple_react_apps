import { useState, useEffect, useRef } from "react";

export default function useFetchAll(urls) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const prevUrls = useRef([]);

    useEffect(() => {
        if (areEqual(prevUrls.current, urls)) {
            setLoading(false);
            return
        }
        prevUrls.current = urls;
        const promises = urls.map((url) =>
            fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
                if (response.ok) return response.json();
                throw response;
            })
        );

        Promise.all(promises)
            .then((json) => setData(json))
            .catch((e) => {
                console.error(e);
                setError(e);
            })
            .finally(() => setLoading(false));
        // eslint-disable-next-line
    }, [urls]);

    return { data, loading, error };
}

function areEqual(prevUrl, urls) {
    return (
        prevUrl.length === urls.length && prevUrl.every((val, ind) => (val === urls[ind]))
    );
}
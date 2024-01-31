import { useEffect, useRef, useState } from "preact/hooks";


const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const cancelSource = useRef<AbortController | null>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (cancelSource.current) {
        cancelSource.current.abort();
      }

      cancelSource.current = new AbortController();

      setLoading(true);
      try {
        const response = await fetch(url, { signal: cancelSource.current.signal });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const responseData: T = await response.json();
        if (isMounted.current) {
          setData(responseData);
          setError(null);
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          // La solicitud fue cancelada, no necesitamos manejar errores aquí
          return;
        }
        if (isMounted.current) {
          setError(err as Error);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      if (cancelSource.current) {
        cancelSource.current.abort();
        cancelSource.current = null;
      }
    };
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
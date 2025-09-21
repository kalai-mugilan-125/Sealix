import { useState, useEffect, useRef, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

interface FetchOptions {
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
}

export function useFetch<T>(url: string, options?: FetchOptions) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    setState({ data: null, loading: true, error: null });

    try {
      const config: AxiosRequestConfig = {
        signal,
        method: options?.method || "GET",
        headers: options?.headers,
        data: options?.body,
      };

      const response: AxiosResponse<T> = await axios(url, config);
      setState({ data: response.data, loading: false, error: null });
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled:", err.message);
      } else {
        setState({ data: null, loading: false, error: err as AxiosError });
      }
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
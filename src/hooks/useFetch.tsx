import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Response } from "../types";

const useFetch = (endpoints: string[]) => {
  const [data, setData] = useState<Response[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string[] | null[]>([]);

  const effectRan = useRef(false);

  const fetching = async () => {
    setLoading(true);
    endpoints.map(async (endpoint) => {
      return await axios
        .get(endpoint)
        .then((res) => {
          setData((prev) => [...prev, res.data]);
        })
        .catch((err) => {
          setError((prev) => [...prev, err.message]);
        });
    });
    setLoading(false);
  };

  useEffect(() => {
    if (!effectRan.current) {
      fetching();
    }
    return () => {
      effectRan.current = true;
    };
  });

  useEffect(() => {
    setTimeout(async () => {
      setData([]);
      setError([]);
      window.location.reload();
    }, 15000);
  }, [data]);

  return { data, error, loading };
};

export default useFetch;

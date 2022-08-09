import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Response } from "../types";

type useFetchState = {
  data: Response[] | any[];
  error: null | string;
  loading: boolean;
};

const useFetch = (endpoints: string[]) => {
  const [fetchedData, setFetchedData] = useState<useFetchState>({
    data: [],
    error: null,
    loading: false,
  });

  const fetchData = useCallback(async () => {
    try {
      const response = endpoints.map(async (endpoint) => {
        const res = await axios.get(endpoint);
        const data = await res.data;
        return data;
      });
      if (data) {
        setFetchedData({
          data: [response],
          error: null,
          loading: false,
        });
      }
    } catch (e: any) {
      if (axios.isCancel(e)) {
        console.log("fetching aborted");
      } else {
        console.log("error occured", e);
        setFetchedData({
          data: [],
          error: e,
          loading: false,
        });
      }
      console.log(e);
    }
  }, [endpoints]);

  useEffect(() => {
    fetchData();
  }, [endpoints, fetchData]);

  const { data, error, loading } = fetchedData;
  return { data, error, loading };
};

export default useFetch;

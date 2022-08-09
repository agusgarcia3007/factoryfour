import React, { useEffect, useState, useRef } from "react";
import { endpoints } from "../consts/urls";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import Spinner from "./Spinner";
import Card from "./Card";

const List = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  const effectRan = useRef(false);

  const fetching = async () => {
    setLoading(true);
    endpoints.map(async (endpoint) => {
      return await axios
        .get(endpoint)
        .then((res) => {
          setData((data) => [...data, res.data]);
        })
        .catch((err) => {
          setError(err.message);
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
  }, []);

  setTimeout(() => {
    setData([]);
    // fetching();
    console.log("updated");
  }, 15000);

  if (loading) return <Spinner />;
  return (
    <div className="card-container">
      {data.length &&
        data.map((item) => {
          return (
            <Card
              key={item.hostname}
              hostname={item.hostname}
              message={item.message}
              success={item.success}
              time={item.time}
            />
          );
        })}
      {error && <Card key={error} message={error} />}
    </div>
  );
};

export default List;

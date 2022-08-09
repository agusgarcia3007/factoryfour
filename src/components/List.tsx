import React, { useEffect } from "react";
import { endpoints } from "../consts/urls";
import useFetch from "../hooks/useFetch";
import Spinner from "./Spinner";
import Card from "./Card";
import ErrorCard from "./ErrorCard";

const List = () => {
  const { data, error, loading } = useFetch(endpoints);

  const generateKey = () => {
    return Math.random().toString(36).slice(2);
  };

  if (loading) return <Spinner />;
  return (
    <div className="card-container">
      {data.length ? (
        data.map((item) => {
          return (
            <Card
              key={generateKey()}
              hostname={item.hostname}
              message={item.message}
              success={item.success}
              time={item.time}
            />
          );
        })
      ) : (
        <Spinner />
      )}
      {error.length
        ? error.map((err) => (
            <ErrorCard key={generateKey()} message={err as string} />
          ))
        : null}
    </div>
  );
};

export default List;

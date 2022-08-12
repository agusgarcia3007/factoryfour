import React from "react";
import { endpoints } from "../consts/urls";
import useFetch from "../hooks/useFetch";
import Spinner from "./Spinner";
import Card from "./Card";
import ErrorCard from "./ErrorCard";

const List = () => {
  const generateKey = () => {
    return Math.random().toString(36).slice(2);
  };

  const { data, loading, error } = useFetch(endpoints);

  if (loading) return <Spinner />;
  return (
    <div className="card-container">
      {Object.values(data).length ? (
        Object.values(data).map((item) => {
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
      {Object.values(error).length
        ? Object.values(error).map((err) => (
            <ErrorCard key={generateKey()} message={err as string} />
          ))
        : null}
    </div>
  );
};

export default List;

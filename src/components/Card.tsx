import React from "react";
import { Response } from "../types";
import check from "../assets/check.svg";
import cross from "../assets/cross.svg";

const Card = ({ success, hostname, time, message }: Response) => {
  return (
    <div className="card">
      <div className="card-details">
        <div className="title-container">
          <img src={success ? check : cross} alt={message} />
          <p className="text-title">{message}</p>
        </div>
        <p className="text-body">{time}</p>
        <p className="text-body">{hostname}</p>
      </div>
    </div>
  );
};

export default Card;

import React from "react";
import check from "../assets/check.svg";
import cross from "../assets/cross.svg";
import { Error } from "../types";

const ErrorCard = ({ success, message }: Error) => {
  return (
    <div className="card">
      <div className="card-details">
        <div className="error-container">
          <img src={success ? check : cross} alt={message} />
          <p className="text-title">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorCard;

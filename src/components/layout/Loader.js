import { Spin } from "antd";
import React from "react";
import "../../styles/Loader.css";

export const Loader = () => {
  return (
    <div className="loader">
      <Spin size="large" />
    </div>
  );
};

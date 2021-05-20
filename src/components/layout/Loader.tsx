import { Spin } from "antd";
import React from "react";
import { LayoutLoader } from "../../styledComponents/Layout";

export const Loader = () => {
  return (
    <LayoutLoader>
      <Spin size="large" />
    </LayoutLoader>
  );
};

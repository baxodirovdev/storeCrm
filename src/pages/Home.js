import Layout, { Content } from "antd/lib/layout/layout";
import React, { useState } from "react";

import { Navbar } from "../components/layout/Navbar";
import { Siderbar } from "../components/layout/Siderbar";
import { RouterConfig } from "../navigation/RouterConfig";

export const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Siderbar collapsed={collapsed} />
      <Layout className="site-layout">
        <Navbar collapsed={collapsed} toggle={toggle} />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <RouterConfig />
        </Content>
      </Layout>
    </Layout>
  );
};

import Layout, { Content } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { RouterConfig } from "../navigation/RouterConfig";

export const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = useSelector((state) => state.user.user);


  const toggle = () => {
    setCollapsed(!collapsed);
  };



  return (
    <Layout>
      <Sidebar collapsed={collapsed} />
      <Layout className="site-layout">
        <Navbar collapsed={collapsed} toggle={toggle} user={user} />
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

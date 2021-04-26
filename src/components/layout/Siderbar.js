import React from "react";
import Sider from "antd/lib/layout/Sider";
import { Menu } from "antd";
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const Siderbar = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          <Link to="/products">Products</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ContainerOutlined />}>
          <Link to="/clients">Clients</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

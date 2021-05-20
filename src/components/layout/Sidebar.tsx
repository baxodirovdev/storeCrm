import React from "react";
import Sider from "antd/lib/layout/Sider";
import { Menu } from "antd";
import {
  ContainerOutlined,
  DesktopOutlined,
  InfoCircleOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import { CLIENTS, PRODUCTS, ROOT, SALES } from "../../navigation/CONSTANTS";


type SidebarProps = {
  collapsed: boolean;
};

export const Sidebar = ({ collapsed }: SidebarProps) => {
  const location = useLocation();
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        defaultSelectedKeys={[ROOT]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        // selectedKeys={location.pathname}
        activeKey={location.pathname}
      >
        <Menu.Item key={ROOT} icon={<InfoCircleOutlined />}>
          <NavLink to={ROOT}>About</NavLink>
        </Menu.Item>
        <Menu.Item key={PRODUCTS} icon={<DesktopOutlined />}>
          <NavLink to={PRODUCTS}>Products</NavLink>
        </Menu.Item>
        <Menu.Item key={CLIENTS} icon={<ContainerOutlined />}>
          <NavLink to={CLIENTS}>Clients</NavLink>
        </Menu.Item>
        <Menu.Item key={SALES} icon={<PieChartOutlined />}>
          <NavLink to={SALES}>Sales</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

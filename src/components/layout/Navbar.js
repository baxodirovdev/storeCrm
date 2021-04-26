import {
  ExportOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { Header } from "antd/lib/layout/layout";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/actions/UserAction";
import { Link } from "react-router-dom";

import "../../styles/Header.css";

export const Navbar = ({ collapsed, toggle }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  function handleMenuClick(e) {
    if (e.key === "2") {
      dispatch(signOut());
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/editprofile"> Edit profile</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<ExportOutlined />}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background header" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: toggle,
      })}
      <Space wrap>
        <Dropdown.Button
          overlay={menu}
          placement="bottomCenter"
          icon={<UserOutlined />}
        >
          {user.displayName || user.email}
        </Dropdown.Button>
      </Space>
    </Header>
  );
};

import {
  ExportOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/actions/UserAction";
import { Link } from "react-router-dom";
import { LayoutHeader } from "../../styledComponents/Layout";
import { Header } from "antd/lib/layout/layout";

type NavbarProps = {
  collapsed: boolean;
  toggle: () => void;
  user: {
    displayName: string,
    email: string
  };
};

export const Navbar = ({ collapsed, toggle, user }: NavbarProps) => {
  const dispatch = useDispatch();

  function handleMenuClick(): void {
      dispatch(signOut());
  }

  const menu = (
    <Menu >
      <Menu.Item key="1" onClick={handleMenuClick} icon={<UserOutlined />}>
        <Link to="/editprofile"> Edit profile</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<ExportOutlined />}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <LayoutHeader>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: toggle,
          }
        )}
        <Space wrap>
          <Dropdown.Button
            overlay={menu}
            placement="bottomCenter"
            icon={<UserOutlined />}
          >
            {user.displayName || user.email}
          </Dropdown.Button>
        </Space>
      </LayoutHeader>
    </Header>
  );
};

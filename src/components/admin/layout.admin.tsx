import React, { useState } from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    ApiOutlined,
    UserOutlined,
    BankOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AliwangwangOutlined,
    LogoutOutlined,
    HeartTwoTone,
    BugOutlined,
    ScheduleOutlined,
    VideoCameraAddOutlined,
    VideoCameraOutlined,
    FileOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, message, Avatar, Button } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { callLogout } from 'config/api';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { isMobile } from 'react-device-detect';
import type { MenuProps } from 'antd';
import { setLogoutAction } from '@/redux/slice/accountSlide';

const { Content, Footer, Sider } = Layout;



const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const user = useAppSelector(state => state.account.user);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.data) {
            dispatch(setLogoutAction({}));
            message.success('Đăng xuất thành công');
            navigate('/')
        }
    }

    const items: MenuProps["items"] = [
      {
        label: <Link to="/admin">Dashboard</Link>,
        key: "dashboard",
        icon: <AppstoreOutlined />,
      },
      {
        label: <Link to="/admin/film">Film</Link>,
        key: "film",
        icon: <BankOutlined />,
      },
      {
        label: <Link to="/admin/user">User</Link>,
        key: "user",
        icon: <UserOutlined />,
      },
      {
        label: <Link to="/admin/cinema">Cinema</Link>,
        key: "cinema",
        icon: <ScheduleOutlined />,
      },
      {
        label: <Link to="/admin/room">Room</Link>,
        key: "room",
        icon: <VideoCameraOutlined />,
      },
      {
        label: <Link to="/admin/showtime">Showtime</Link>,
        key: "showtime",
        icon: <VideoCameraOutlined />,
      },
      {
        label: <Link to="/admin/ticket">Ticket</Link>,
        key: "ticket",
        icon: <FileOutlined />,
      },
      //   {
      //     label: <Link to="/admin/permission">Permission</Link>,
      //     key: "permission",
      //     icon: <ApiOutlined />,
      //   },
      {
        label: <Link to="/admin/role">Role</Link>,
        key: "role",
        icon: <ExceptionOutlined />,
      },
    ];

    if (isMobile) {
      items.push({
        label: (
          <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
            Đăng xuất
          </label>
        ),
        key: "logout",
        icon: <LogoutOutlined />,
      });
    }

    const itemsDropdown = [
      {
        label: <Link to={"/"}>Trang chủ</Link>,
        key: "home",
      },
      {
        label: (
          <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
            Đăng xuất
          </label>
        ),
        key: "logout",
      },
    ];

    return (
      <>
        <Layout style={{ minHeight: "100vh" }} className="layout-admin">
          {!isMobile ? (
            <Sider
              theme="light"
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <div style={{ height: 32, margin: 16, textAlign: "center" }}>
                <BugOutlined /> ADMIN
              </div>
              <Menu
                defaultSelectedKeys={[activeMenu]}
                mode="inline"
                items={items}
                onClick={(e) => setActiveMenu(e.key)}
              />
            </Sider>
          ) : (
            <Menu
              defaultSelectedKeys={[activeMenu]}
              items={items}
              onClick={(e) => setActiveMenu(e.key)}
              mode="horizontal"
            />
          )}

          <Layout>
            {!isMobile && (
              <div
                className="admin-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: 20,
                }}
              >
                <Button
                  type="text"
                  icon={
                    collapsed
                      ? React.createElement(MenuUnfoldOutlined)
                      : React.createElement(MenuFoldOutlined)
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />

                <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
                  <Space style={{ cursor: "pointer" }}>
                    Welcome {user?.name}
                    <Avatar>
                      {" "}
                      {user?.name?.substring(0, 2)?.toUpperCase()}{" "}
                    </Avatar>
                  </Space>
                </Dropdown>
              </div>
            )}
            <Content style={{ padding: "15px" }}>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </>
    );
};

export default LayoutAdmin;
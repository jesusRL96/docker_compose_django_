"use client";
import { Button, ConfigProvider, Flex } from "antd";
import React from "react";

import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  EditOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, FloatButton } from "antd";
import Link from "next/link";

const { Header, Content, Sider, Footer } = Layout;

const items1: MenuProps["items"] = [
  { title: "Forms orientation", link: "/forms/with-orientation" },
  { title: "Forms disable", link: "/forms/with-disable" },
  { title: "Forms required mark", link: "/forms/with-required_mark" },
  { title: "Forms formset", link: "/forms/with-formsets" },
  { title: "Forms from json", link: "/forms/from-json" },
  { title: "nav 3", link: "" },
].map((url, index) => {
  return {
    key: index,
    label: <Link href={url.link}>{url.title}</Link>,
  };
});

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

export default function ComponentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dTheme, setDtheme] = React.useState({
    algorithm: theme.defaultAlgorithm,
  });
  const algorithm =
    dTheme?.algorithm == theme.defaultAlgorithm
      ? theme.darkAlgorithm
      : theme.defaultAlgorithm;
  const handleDarkMode = () => {
    setDtheme({ ...dTheme, algorithm: algorithm });
  };

  return (
    <ConfigProvider theme={dTheme}>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Layout>
          <Sider width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={items2}
            />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: "100vh",
              }}
            >
              {children}
              <FloatButton.Group
                trigger="click"
                type="primary"
                style={{ right: 24 }}
                icon={<EditOutlined />}
              >
                <FloatButton />
                <FloatButton
                  type={
                    dTheme?.algorithm === theme.darkAlgorithm
                      ? "primary"
                      : "default"
                  }
                  icon={<MoonOutlined />}
                  onClick={handleDarkMode}
                />
              </FloatButton.Group>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

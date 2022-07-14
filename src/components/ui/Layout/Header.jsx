import React from 'react'
import { Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import pages from '../../pages'

function Header() {
  const { pathname } = useLocation()
  const { Header } = Layout

  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={pages
          .filter((el) => pathname === el.path)
          .map((el) => el.key)}
        items={pages.map((el) => ({
          key: el.key,
          label: <Link to={el.path}>{el.text}</Link>,
        }))}
      ></Menu>
    </Header>
  )
}

export default Header

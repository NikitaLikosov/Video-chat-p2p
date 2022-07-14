import React from 'react'
import 'antd/dist/antd.min.css'
import { Layout } from 'antd'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import pages from './components/pages'

import { Header, Footer } from './components/ui/Layout'

function App() {
  const { Content } = Layout
  return (
    <Layout>
      <Header />
      <Content>
        <Routes>
          {pages.map((el) => (
            <Route exact key={el.key} path={el.path} element={<el.page />} />
          ))}
        </Routes>
      </Content>
      <Footer />
    </Layout>
  )
}

export default App

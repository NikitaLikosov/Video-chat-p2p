import React from 'react'
import { Layout } from 'antd'

const Footer = () => {
  const { Footer: FooterAnt } = Layout
  return (
    <FooterAnt
      style={{
        textAlign: 'center',
      }}
    >
      created by Nikitalikosov -_-
    </FooterAnt>
  )
}

export default Footer

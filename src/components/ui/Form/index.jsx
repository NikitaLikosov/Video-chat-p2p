import React from 'react'
import { Button, Form as FormAnt, Input, Space, Typography } from 'antd'
import './style.css'

const Form = ({ onFinish, onFinishFailed, title }) => {
  const [form] = FormAnt.useForm()
  const { TextArea } = Input
  const { Title } = Typography
  return (
    <>
      <Title>{title}</Title>
      <FormAnt
        className="main-form"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <FormAnt.Item name="token" rules={[{ type: 'string', min: 6 }]}>
          <TextArea placeholder={title} />
        </FormAnt.Item>
        <FormAnt.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Space>
        </FormAnt.Item>
      </FormAnt>
    </>
  )
}

export default Form

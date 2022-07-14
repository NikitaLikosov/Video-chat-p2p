import React from 'react'
import { message, Typography, Button } from 'antd'

const TextCopy = ({ mainText, title }) => {
  const { Paragraph, Title } = Typography
  return (
    <>
      <Title level={2}>{title}</Title>
      <div style={{ position: 'relative', paddingTop: '10px' }}>
        <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'далее' }}>
          {mainText}
        </Paragraph>
        <Button
          style={{
            position: 'absolute',
            top: 0,
            right: 10,
          }}
          type="default"
          onClick={() => {
            navigator.clipboard.writeText(mainText)
            message.success('Текст скопирован в буфер обмена')
          }}
        >
          Копировать
        </Button>
      </div>
    </>
  )
}

export default TextCopy

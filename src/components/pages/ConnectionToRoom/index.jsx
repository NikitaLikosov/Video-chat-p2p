import React from 'react'
import { message } from 'antd'
import useConnect from '../../../hooks/useConnect'
import Form from '../../ui/Form'
import TextCopy from '../../ui/TextCopy'
import './style.css'

function ConnectionToRoom() {
  const { connectState, addOffer, answer, videoPlayerRef } = useConnect()
  const onFinish = (el) => {
    addOffer(el.token)
  }
  const onFinishFailed = () => {
    message.error('Введённые данные не корректны')
  }

  return (
    <div className="main-wrapper">
      {connectState.showAnswer && answer ? (
        <TextCopy title={'webrts answer'} mainText={JSON.stringify(answer)} />
      ) : (
        ''
      )}
      {connectState.showOffer ? (
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          title="Введите offer"
        />
      ) : (
        ''
      )}
      {connectState.showVideoPlayer ? (
        <video ref={videoPlayerRef} controls className="video" />
      ) : (
        ''
      )}
    </div>
  )
}

export default ConnectionToRoom

import React from 'react'
import { Button, message } from 'antd'
import useRoom from './../../../hooks/useRoom'
import Form from '../../ui/Form'
import TextCopy from '../../ui/TextCopy'
import './style.css'

const Room = () => {
  const {
    createRoom,
    RoomState,
    addAnswer,
    offer,
    videoPlayerRef,
    deleteRoom,
  } = useRoom()

  return (
    <>
      {RoomState.showAnswer ? (
        <Form
          onFinish={(el) => {
            addAnswer(el.token)
          }}
          onFinishFailed={() => message.error('Введённые данные не корректны')}
          title="Введите answer"
        />
      ) : (
        ''
      )}
      {RoomState.showOffer ? (
        <TextCopy
          title={'Отправте второму пользователю offer ниже'}
          mainText={offer}
        />
      ) : (
        ''
      )}
      {RoomState.showVideoPlayer ? (
        <video className="video" controls ref={videoPlayerRef} muted />
      ) : (
        ''
      )}

      <Button
        className="close-button"
        onClick={RoomState.showVideoPlayer ? deleteRoom : createRoom}
      >
        {RoomState.showVideoPlayer ? 'Покинуть комнату' : 'Создать комнату'}
      </Button>
    </>
  )
}

export default Room

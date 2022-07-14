import { useState, useRef, useReducer } from 'react'
import freeice from 'freeice'
import { message } from 'antd'

let useRoom = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'createRoom':
        return { showOffer: true, showVideoPlayer: true, showAnswer: true }
      case 'addAnswer':
        return { showOffer: false, showVideoPlayer: true, showAnswer: false }
      case 'deleteRoom':
        return { showOffer: false, showVideoPlayer: false, showAnswer: false }
      default:
        throw new Error()
    }
  }
  const [RoomState, dispatch] = useReducer(reducer, {
    showOffer: false,
    showVideoPlayer: false,
    showAnswer: false,
  })
  const [offer, setOffer] = useState()

  let video = useRef()

  const localConnection = useRef()

  const createConnect = async () => {
    try {
      const videoStrem = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      video.current.srcObject = videoStrem
      video.current.play()

      localConnection.current = new RTCPeerConnection({
        iceServers: freeice(),
      })

      videoStrem
        .getTracks()
        .forEach((track) => localConnection.current.addTrack(track, videoStrem))

      localConnection.current.onicecandidate = (event) => {
        setOffer(JSON.stringify(localConnection.current.localDescription))
      }
      let localOffer = await localConnection.current.createOffer()
      localConnection.current.setLocalDescription(localOffer)
    } catch (error) {
      dispatch({ type: 'deleteRoom' })
      message.error(error.message)
    }
  }

  const addAnswer = (answer) => {
    localConnection.current.setRemoteDescription(JSON.parse(answer))
    dispatch({ type: 'addAnswer' })
  }
  const createRoom = () => {
    dispatch({ type: 'createRoom' })
    createConnect()
  }
  const deleteRoom = () => {
    dispatch({ type: 'deleteRoom' })
  }

  return {
    createRoom,
    deleteRoom,
    RoomState,
    addAnswer,
    offer,
    videoPlayerRef: video,
  }
}

export default useRoom

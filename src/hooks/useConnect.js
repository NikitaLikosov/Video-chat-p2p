import { useState, useRef, useReducer } from 'react'
import freeice from 'freeice'
import { message } from 'antd'

let useConnect = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'addOffer':
        return {
          showOffer: false,
          showVideoPlayer: true,
          showAnswer: true,
        }
      case 'play':
        return {
          showOffer: false,
          showVideoPlayer: true,
          showAnswer: false,
        }
      case 'deleteConnect':
        return {
          showOffer: true,
          showVideoPlayer: false,
          showAnswer: false,
        }
      default:
        throw new Error()
    }
  }

  const [connectState, dispatch] = useReducer(reducer, {
    showOffer: true,
    showVideoPlayer: false,
    showAnswer: false,
  })

  const [answer, setAnswer] = useState()

  let video = useRef()

  const createConnect = async (offer) => {
    try {
      const localConnection = new RTCPeerConnection({
        iceServers: freeice(),
      })

      localConnection.onicecandidate = (event) => {}

      localConnection.setRemoteDescription(offer)
      localConnection.ontrack = (e) => {
        video.current.srcObject = e.streams[0]
        video.current.addEventListener('loadedmetadata', () => {
          video.current.play()
          dispatch({ type: 'play' })
        })
      }

      let localAnswer = await localConnection.createAnswer()
      localConnection.setLocalDescription(localAnswer)
      setAnswer(localAnswer)
    } catch (error) {
      dispatch({ type: 'deleteConnect' })
      message.error(error.message)
    }
  }

  const addOffer = (offer) => {
    dispatch({ type: 'addOffer' })
    createConnect(JSON.parse(offer))
  }

  return {
    connectState,
    addOffer,
    answer: answer,
    videoPlayerRef: video,
  }
}

export default useConnect

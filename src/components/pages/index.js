import ConnectionToRoom from './ConnectionToRoom'
import Room from './Room'

const pages = [
  { path: '/', text: 'Подключение', key: '0', page: ConnectionToRoom },
  { path: '/room', text: 'Комната', key: '1', page: Room },
]

export default pages

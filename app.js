const socket = io('http://localhost:3001')
socket.on('connection')

socket.on('message', (data) => {
  document.getElementById('message').innerText = data
})

const sendMessage = () => {
  const value = document.getElementById('input').value
  socket.emit('message', value)
}

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

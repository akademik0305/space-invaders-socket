const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: '* '}})

app.set('view engine', 'ejs')
app.use(express.json())

app.get('/home', (req, res) => {
  res.render('home')
})


server.listen(3001, () =>{
  console.log('Server is running...')
})

io.on('connection', (socket) => {
  console.log('User connected: '+ socket.id )
  socket.emit('new-user', socket.id)

  socket.on('message', (data) => {
    // console.log(data)
    socket.broadcast.emit('message', data)
  })

  socket.on('updatePlayer', (position) => {
    // console.log(position)
    socket.broadcast.emit('updatePosition', position)
  })

  socket.on('shoot', (projectile) => {
    console.log(projectile)
    socket.broadcast.emit('shootEnemy', (projectile))
  })
})


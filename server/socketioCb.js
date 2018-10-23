module.exports = function (socket) {
  socket.on('disconnect', () => console.log('client disconnected...'))
  socket.on('driverPosition', (json) => { // fired when driver is moving
    const [lat, lng] = JSON.parse(json)
    console.log('Driver Position recvd on server >>', [lat, lng])
  })
}

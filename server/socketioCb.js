const DriverModel = require('./models/driver')
const sockets = {drivers: {}, users: {}}

module.exports = function (socket) {
  console.log(`[server] ${socket.id} connected`)
  let id, type // id is mongoID, not socketID
  // Listeners
  socket.on('userType', (userType, mongoID) => {
    id = mongoID
    type = userType
    if (userType === 'driver') sockets.drivers[mongoID] = socket
    if (userType === 'user') sockets.users[mongoID] = socket
  })
  socket.on('driverPosition', (json) => { // fired when driver is moving
    const data = JSON.parse(json)
    console.log(`[server] Driver ${socket.id} has moved to location ${data.position}`)
    DriverModel.updateDriver(data.id,
      {
        location: {
          type: 'Point',
          coordinates: [data.position[1], data.position[0]]
        }
      },
      (err, result) => {
        if (err) console.log('[server] Error while updating driver in DB')
        else console.log('[server] Driver position updated successfully in DB!')
      })
  })
  socket.on('rideDeclined', () => console.log('[server] driver has declined the ride'))
  socket.on('disconnect', () => {
    console.log(`[server] ${socket.id} has disconnected...`)
    if (type === 'user') delete sockets.users[id]
    if (type === 'driver') delete sockets.drivers[id]
  })

  // Emitters

  // Test Stuff.. Delete this whole block
  const rideDetails = {
    name: 'Maulick',
    origin: {lat: 12.9009362, lng: 77.705043, address: 'Survey 96/1, Sarjapur Road After Wipro Corporate Office – Railway Crossing, Carmelaram, Hadosiddapura, Chikkakannalli, Bengaluru, Karnataka 560035'},
    destination: {lat: 12.9217303, lng: 77.589696, address: '67-11, 8th B Main Rd, 4th T Block East, 4th Block, Jayanagar, Bengaluru, Karnataka 560011'}
  }
  socket.on('EmitRideAssigned', () => socket.emit('rideAssigned', rideDetails))
  // ------ Test Stuff END -------
}

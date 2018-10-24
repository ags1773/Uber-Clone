const DriverModel = require('./models/driver')

module.exports = function (socket) {
  socket.on('disconnect', () => console.log('client disconnected...'))
  socket.on('driverPosition', (json) => { // fired when driver is moving
    // update driver position in DB
    const data = JSON.parse(json)
    console.log(`Driver ${data.id} has moved to location ${data.position}`)
    DriverModel.updateDriver(data.id,
      {
        userLoc: [data.position[1], data.position[0]] // query takes position in [longitude, latitude] format
      },
      (err, result) => {
        if (err) console.log('Error while updating driver in DB')
        else console.log('Driver position updated successfully in DB!')
      })
  })
}

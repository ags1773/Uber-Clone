const DriverModel = require('./models/driver')
const config = require('./config')
const sockets = {drivers: {}, users: {}}
// const driverWaitTimeout = 10 // seconds

module.exports = function (socket) {
  console.log(`[server] ${socket.id} connected`)
  let id, type // id is mongoID, not socketID
  socket.on('userType', (userType, mongoID) => {
    console.log(`[server] ${socket.id} userType >>`, userType, mongoID)
    id = mongoID
    type = userType
    if (userType === 'driver') {
      sockets.drivers[mongoID] = socket
      setDiverIsOnline(true, id)
    }
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
        // else console.log('[server] Driver position updated successfully in DB!')
      })
  })
  socket.on('findRide', (details, userId) => {
    let userSocket = sockets.users[userId]
    DriverModel.findDriversWithin(
      [details.userPosition.lng, details.userPosition.lat],
      config.findDriverDistance
    )
      .then(drivers => {
        if (drivers.length === 0) {
          userSocket.emit('driversNotAvailable')
          return
        }
        const driversIds = drivers.map(e => e._id)
        const driverSockets = driversIds.map(e => {
          if (sockets.drivers.hasOwnProperty(e)) return sockets.drivers[e]
          else throw new Error(`[server] ERROR! socket not found for driver with mongoId ${e}`)
        })
        driverSockets.forEach((driverSocket, i) => {
          // driverSocket.emit('rideAssigned', details, userId)
          driverSocket.emit('rideAssigned', details)
          // timeoutId[1] = setTimeout(() => driverSocket.emit('rideCancelled'), driverWaitTimeout)
          driverSocket.on('rideAccepted', () => {
            // console.log(`RIDE >> User ${userId} Driver ${driversIds[i]}`)
            console.log('USER ID !!!!!!!', userId)
            if (sockets.users.hasOwnProperty(userId)) {
              gotUserSocket(sockets.users[userId], driverSocket, driversIds[i])
            } else throw new Error(`[server] ERROR! socket not found for user with mongoId ${userId}`)
            setDiverIsOnline(false, driversIds[i], () => {
              driversIds.splice(i, 1)
              const newDriverSockets = driversIds.map(e => {
                if (sockets.drivers.hasOwnProperty(e)) return sockets.drivers[e]
                else throw new Error(`[server] ERROR! socket not found for driver with mongoId ${e}`)
              })
              newDriverSockets.forEach(s => s.emit('rideCancelled'))
            })
          })
        })
      })
      .catch(e => console.error(e))
  })

  socket.on('disconnect', () => {
    console.log(`[server] ${socket.id} has disconnected...`)
    if (type === 'user') delete sockets.users[id]
    if (type === 'driver') {
      delete sockets.drivers[id]
      setDiverIsOnline(false, id)
    }
  })
}

function setDiverIsOnline (val, driverID, callback) {
  DriverModel.updateDriver(driverID,
    {
      isOnline: val
    },
    (err, result) => {
      if (err) console.log('[server] Error while updating driver isOnline in DB')
      else {
        console.log(`[server] ${driverID} Driver isOnline => ${val}`)
        if (callback) callback()
      }
    })
}
function gotUserSocket (userSocket, driverSocket, driverId) {
  driverSocket.on('relayDriverPosition', driverPos => {
    userSocket.emit('driverLocation', driverPos)
  })
  driverSocket.on('relayRideInfo', pos => {
    userSocket.emit('rideInfo', pos)
  })
  driverSocket.on('relayEndRide', price => {
    userSocket.emit('endRide', price)
  })
  driverSocket.on('relayPaymentSuccess', () => {
    setDiverIsOnline(true, driverId, () => {
      userSocket.emit('paymentSuccess')
    })
  })
}

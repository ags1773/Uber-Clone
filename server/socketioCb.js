const DriverModel = require('./models/driver')
const config = require('./config')
const sockets = {drivers: {}, users: {}}

module.exports = function (socket) {
  console.log(`[server] ${socket.id} connected`)
  let id, type // id is mongoID, not socketID
  socket.on('userType', (userType, mongoID) => {
    id = mongoID
    type = userType
    if (userType === 'driver') {
      sockets.drivers[mongoID] = socket
      setDriverIsOnline(true, id)
    }
    if (userType === 'user') sockets.users[mongoID] = socket
  })
  socket.on('driverPosition', (json) => {
    const data = JSON.parse(json)
    DriverModel.updateDriver(data.id,
      {
        location: {
          type: 'Point',
          coordinates: [data.position[1], data.position[0]]
        }
      },
      (err, result) => {
        if (err) console.log('[server] Error while updating driver in DB')
      })
  })
  socket.on('findRide', (details, userId) => {
    assignDriver(details, userId)
  })

  socket.on('disconnect', () => {
    console.log(`[server] ${socket.id} has disconnected...`)
    if (type === 'user') delete sockets.users[id]
    if (type === 'driver') {
      delete sockets.drivers[id]
      setDriverIsOnline(false, id)
    }
  })
}

function setDriverIsOnline (val, driverID, callback) {
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
function gotUserSocket (userSocket, driverSocket, driverId, userId) {
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
    setDriverIsOnline(true, driverId, () => {
      userSocket.emit('paymentSuccess')
    })
  })
}

function assignDriver (details, userId) {
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
      let totalDrivers = drivers.length
      const driversIds = drivers.map(e => e._id)
      const driverSockets = driversIds.map(e => {
        if (sockets.drivers.hasOwnProperty(e)) return sockets.drivers[e]
        else throw new Error(`[server] ERROR! socket not found for driver with mongoId ${e}`)
      })
      driverSockets.forEach((driverSocket, i) => {
        if (!SendRideDetailsIfFree(driverSocket, details)) {
          totalDrivers -= 1
          if (totalDrivers === 0) {
            userSocket.emit('driversNotAvailable')
          }
          return
        }
        driverSocket.on('rideAccepted', () => {
          gotUserSocket(userSocket, driverSocket, driversIds[i], userId)
          setDriverIsOnline(false, driversIds[i], () => {
            driversIds.splice(i, 1)
            const newDriverSockets = driversIds.map(e => {
              if (sockets.drivers.hasOwnProperty(e)) return sockets.drivers[e]
              else throw new Error(`[server] ERROR! socket not found for driver with mongoId ${e}`)
            })
            newDriverSockets.forEach(s => {
              s.emit('rideCancelled')
              s.removeAllListeners(['rideAccepted'])
            })
          })
        })
        driverSocket.on('rideDeclined', () => {
          totalDrivers -= 1
          if (totalDrivers === 0) {
            userSocket.emit('driversNotAvailable')
          }
        })
      })
    })
    .catch(e => console.error(e))
}

function SendRideDetailsIfFree (driverSocket, details) {
  console.log('!!!!!!!!!!!!', driverSocket.listenerCount('rideAccepted'))
  if (driverSocket.listenerCount('rideAccepted') === 0) {
    driverSocket.emit('rideAssigned', details)
    return 1
  }
  return 0
}

module.exports = {
  server: 'http://localhost:8000',
  driverCoordBroadcastTimeout: 30, // seconds after which to check if driver has moved
  driverMinDist: 10, // min dist in meters which the driver has to move in order to transmit his location
  driverGpsTimeout: 5,
  driverMinAccuracy: 35000 // min location accuracy (in meters) for driver. If greater than this value, reading is discarded
}

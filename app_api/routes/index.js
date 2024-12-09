const express = require('express')
const router = express.Router()
const tripsController = require('../controllers/trips')

// GET method for trips route
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(tripsController.tripsAddTrip)

// GET method for tripsFindByCode
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(tripsController.tripsUpdateTrip)

module.exports = router

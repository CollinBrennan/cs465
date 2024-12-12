const mongoose = require('mongoose')
const Trip = require('../models/travlr')
const Model = mongoose.model('trips')

// GET: /trips
// list of all trips
const tripsList = async (req, res) => {
  const q = await Model.find({}).exec()

  if (!q) return res.status(404).json(err)
  else return res.status(200).json(q)
}

// POST: /trips
// add a new trip
// response must include HTML status code and JSON message
const tripsAddTrip = async (req, res) => {
  const newtrip = new Trip({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description,
  })

  const q = await newtrip.save()

  if (!q) {
    return res.status(400).json(err) // no data
  } else {
    return res.status(201).json(q) // successfully add trip to database
  }
}

// GET: /trips/:tripCode
// list single trip
const tripsFindByCode = async (req, res) => {
  const q = await Model.find({ code: req.params.tripCode })

  if (!q) return res.status(404).json(err)
  else return res.status(200).json(q)
}

// PUT: /trips/:tripCode
// updates existing trip
// must include HTML status code and JSON message
const tripsUpdateTrip = async (req, res) => {
  try {
    const q = await Model.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      }
    ).exec()

    if (!q) {
      return res.status(404).json({ message: 'Trip not found' }) // no data
    } else {
      return res.status(200).json(q) // update document successfully
    }
  } catch (error) {
    console.error('Error updating trip:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
}

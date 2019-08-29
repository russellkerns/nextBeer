const router = require('express').Router()
module.exports = router
const getNextBeers = require('../db/neo4j/beers')

router.get('/', async (req, res, next) => {
  try {
    const beers = await getNextBeers(req.query)
    res.json(beers)
  } catch (err) {
    next(err)
  }
})

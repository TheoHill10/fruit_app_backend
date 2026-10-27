const express = require('express')
const router = express.Router()
const fruits = require('../controllers/fruitsControllers')

//telling express we have these two endpoints
router.get('/', fruits.index) //two functions from controllers
router.get('/:name', fruits.show)
router.post('/', fruits.create)
router.patch('/:name', fruits.update)
router.delete('/:name', fruits.destroy)

module.exports = router
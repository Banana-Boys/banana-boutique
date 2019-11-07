const router = require('express').Router()
const Address = require('../db/models/Address')

router.get('/', async (req, res, next) => {
  try {
    const addresses = await Address.findAll({where: {userId: req.user.id}})
    res.status(200).json(addresses)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const address = await Address.findByPk(req.params.id)
    res.status(200).json(address)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let address = {}
    for (let key in req.body) {
      if (req.body[key].length > 0) {
        address = {...address, [key]: req.body[key]}
      }
    }
    const newAddress = await Address.create(address)
    await newAddress.setUser(req.user.id)
    res.status(200).json(newAddress)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const address = await Address.findByPk(req.params.id)
    await address.destroy()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    console.log('----------', req.params.id)
    let address = await Address.findByPk(req.params.id)
    console.log('found address', address)
    await address.update(req.body)
    console.log('updated')
    address = await Address.findByPk(req.params.id)
    res.status(200).json(address)
  } catch (error) {
    next(error)
  }
})

module.exports = router

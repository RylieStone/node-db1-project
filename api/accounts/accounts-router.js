const router = require('express').Router()
const middleWare = require('./accounts-middleware')
const methods = require('./accounts-model')
router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  const accounts = await methods.getAll()
  res.status(200).json(accounts)
})

router.get('/:id', middleWare.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  res.status(200).json(req.body.account)
})

router.post('/', middleWare.checkAccountPayload, middleWare.checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  const {name, budget} = req.body
  const newAccount = await methods.create({name, budget})
  res.status(201).json(newAccount)
})

router.put('/:id', middleWare.checkAccountId, middleWare.checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  const {name, budget} = req.body
  const updatedAccount = await methods.updateById(req.params.id, {name, budget})
  res.status(200).json(updatedAccount)
});

router.delete('/:id', middleWare.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  const deleted = await methods.deleteById(req.params.id)
  res.status(200).json(deleted)
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.code || 500).json({message: err.message})
})

module.exports = router;

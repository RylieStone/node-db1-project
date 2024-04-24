const method = require('./accounts-model')
const db = require('../../data/db-config')
exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)/

  const {name, budget} = req.body
  console.log(!name, !budget)
if (name === undefined || budget === undefined) {
    next({code: 400, message: "name and budget are required" })
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({code: 400, message: "name of account must be between 3 and 100" })
  } else if(typeof budget !== 'number' || isNaN(budget)) {
    next({code: 400, message: "budget of account must be a number" })
  } else if (budget < 0 || budget > 1000000) {
    next({code: 400, message: "budget of account is too large or too small" })
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const account = await db('accounts').where('name', req.body.name)
  console.log(account.length === 1)
  if (account.length === 1) {
    next({code: 400, message: 'that name is taken'})
  } else {
    next()
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const account = await method.getById(req.params.id)
  if (!account) {
    next({code: 404, message: "account not found"})
  } else {
    req.body.account = account
    next()
  }
}

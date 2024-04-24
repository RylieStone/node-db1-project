const db = require('../../data/db-config')
const getAll = async () => {
  // DO YOUR MAGIC
  const accounts = await db('accounts')
  return accounts
}

const getById = async id => {
  // DO YOUR MAGIC
  const account = await db('accounts').where('id', id).first()
  return account
}

const create = async account => {
  // DO YOUR MAGIC
  const {name, budget} = account
  const req = await db('accounts').insert({name: name.trim(), budget})
  console.log(req)
  const newAccount = await getById(req)
  return newAccount
 }

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  const req = await db('accounts').where('id', id).update(account)
  const updatedAccount = await getById(req)
  return updatedAccount
}

const deleteById = async id => {
  // DO YOUR MAGIC
  const account = await getById(id)
  await db('accounts').where('id', id).delete()
  return account
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

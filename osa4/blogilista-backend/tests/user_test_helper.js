const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user')

const initialUsers = [
  {
    username: 'masteri',
    name: 'Mastercoder',
    passwordHash: '$2b$10$/JpUuO2qh9d/agRKkw.wUun4u/OTO4XVzU2G4v1d9ZkPXZyyvxjh2'
  },
  {
    username: 'hakkinl',
    name: 'Laura Häkkinen',
    passwordHash: '$2b$10$Uw60Sjakm488MJ4A6IfDP.6SG9XlgYGdlUXkQURh87LB7pIbZkR.e'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const singleUserInDb = async () => {
  return await User.findOne({ username: 'hakkinl' })
}

const getToken = async () => {
  const user = await singleUserInDb()
  return jwt.sign(
    {
      username: user.username,
      id: user.id
    },
    process.env.SECRET
  )
}

module.exports = {
  initialUsers,
  usersInDb,
  singleUserInDb,
  getToken
}
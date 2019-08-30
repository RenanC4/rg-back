const User = require('../models/UserModel')

module.exports = {
  async index(req, res) {
    const users =  await User.find()
    return res.json(users)
  },

  async user(req, res) {
    console.log(req.query)
    const {_id} = req.query
    const user =  await User.findOne({
      _id
    })
    return res.json(user)
  },

  async store(req, res) {
    console.log(req.body.data)
    const {name, email, address, city, state} = req.body.data
    const userExists = await User.findOne({email})

    if (userExists) {
      return res.json({status: 202, message: 'Ooops, Email ja cadastrado!'})
    }

    const createUser = await User.create({
      name,
      email, 
      address, 
      city, 
      state
    })
    return res.json(createUser)
  },

  async update(req, res) {
    console.log(req.body)
    const {_id} = req.body.data
    const userExists = await User.findOne({_id})
    const {name, email, address, city, state} = req.body.data

    if (userExists) {
      const updateUser = await User.updateOne({_id: userExists._id}, {
        $set: {
        name,
        email, 
        address, 
        city, 
        state
        }
      })
      return  res.json(updateUser)
    }
    return res.json({status: 404, message: 'Ooops, Usuario nao encontrado!'})
  },

  async delete(req, res) {
    const {_id} = req.body
    const userExists = await User.findOne({_id}) 
    try {
      const numsei = await User.deleteOne({_id: userExists._id})
      console.log(numsei)
      return res.json({status: 200, message: 'Usuario removido com sucesso'})
    } catch {
      return res.json({status: 404, message: 'Ooops, Usuario nao encontrado!'})
    }    
  }

}
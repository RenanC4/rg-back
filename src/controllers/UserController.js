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
    const {name, email, address, city, state} = req.body.data
    const userExists = await User.findOne({email})

    if (userExists) {
      return res.json({status: 404, message: 'Ooops, E-mail já cadastrado!'})
    }
    const createUser = await User.create({
      name,
      email, 
      address, 
      city, 
      state
    })
    console.log(createUser)
    return  res.json({status: 200, message: 'Usuário criado com sucesso  !'})
  },

  async update(req, res) {
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
      console.log(updateUser)
      return  res.json({status: 200, message: 'Usuário editado com sucesso  !'})
    }
    return res.json({status: 404, message: 'Ooops, Usuário não encontrado!'})
  },

  async delete(req, res) {
    const {_id} = req.body
    const userExists = await User.findOne({_id}) 
    try {
      const deleteUser = await User.deleteOne({_id: userExists._id})
      console.log(deleteUser)
      return res.json({status: 200, message: 'Usuário removido com sucesso'})
    } catch {
      return res.json({status: 404, message: 'Ooops, Usuário não encontrado!'})
    }    
  }

}
import UsersModel from '../models/UsersModel.js'

export default class UsersController
{
    static async register(req, res)
    {
        UsersModel.register(req.body)
            .then(user => res.status(201).send(user))
            .catch((err) => res.status(400).send(err.message))
    }
}
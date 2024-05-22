import UsersModel from '../models/UsersModel.js'
import Result from '../services/resultsPattern.js'

export default class UsersController
{
    static async register(req, res)
    {
        UsersModel.register(req.body)
            .then(user => res.status(201).json(Result.success(user)))
            .catch((err) => res.status(400).json(Result.failure(err.message)))
    }
}
import AuthModel from '../models/AuthModel.js'
import Result from '../services/resultsPattern.js'

export default class AuthController
{
    static async login(req, res)
    {
        AuthModel.login(req.body)
            .then(user => res.status(200).json(Result.success(user)))
            .catch(err => res.status(401).json(Result.failure(err.message)))
    }

    static async logout(req, res)
    {
        const token = req.header('Auth-Token')
        AuthModel.logout({token})
        .then(() => res.sendStatus(204))
        .catch(err => res.status(400).json(Result.failure(err.message)))
    }

}
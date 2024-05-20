import { APIerrors } from '../errors.js'
import AuthModel from '../models/AuthModel.js'

export default class AuthController
{
    static async login(req, res)
    {
        AuthModel.login(req.body)
            .then(user => res.status(200).send(user))
            .catch(err => res.status(401).send(err.message))
    }

    static async logout(req, res)
    {
        const token = req.header('Auth-Token')
        AuthModel.logout({token})
        .then(() => res.status(200).send(APIerrors.SUCCESS_LOGOUT.title))
        .catch(err => res.status(400).send(err.message))
    }

}
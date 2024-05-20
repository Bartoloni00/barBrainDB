import TokenModel from "../models/TokenModel.js"

export default class TokenMiddleware
{
    static async validate(req, res, next)
    {

        const token = req.header('Auth-Token')

        if (!token) res.status(400).send(APIerrors.LOGOUT_FAILED.title)

        TokenModel.validate({token})
        .then(()=>{
            next()
        })
        .catch(err=> {
            res.status(400).send(err.message)
        })
    }
}
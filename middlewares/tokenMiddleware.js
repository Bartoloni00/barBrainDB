import TokenModel from "../models/TokenModel.js"
import Result from "../services/resultsPattern.js"

export default class TokenMiddleware
{
    static async validate(req, res, next)
    {
        const token = req.header('Auth-Token')
        if (!token) res.status(400).json(Result.failure(APIerrors.LOGOUT_FAILED.title))

        TokenModel.validate({token})
        .then(()=>{
            next()
        })
        .catch(err=> {
            res.status(498).json(Result.failure(err.message))
        })
    }
}
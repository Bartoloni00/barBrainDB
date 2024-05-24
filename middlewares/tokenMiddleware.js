import TokenModel from "../models/TokenModel.js"
import Result from "../services/resultsPattern.js"
import { APIerrors } from "../errors.js"

export default class TokenMiddleware {
    static async validate(req, res, next) {
        try {
            const token = req.header('Auth-Token')
            if (!token) {
                return res.status(400).json(Result.failure(`${APIerrors.VALIDATION_ERROR.title}: ${APIerrors.INVALID_TOKEN.title}`))
            }

            await TokenModel.validate({ token })
            const isTokenExpired = await TokenModel.isTokenExpired({ token})
            if (isTokenExpired) {
                return res.status(401).json(Result.failure(APIerrors.EXPIRED_TOKEN.title))
            }
            await TokenModel.updateTokenDate({ token })

            next();
        } catch (err) {
            return res.status(498).json(Result.failure(err.message))
        }
    }
}

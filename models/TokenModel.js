import { MongoClient, ObjectId } from "mongodb"
import jwt from "jsonwebtoken"
import { APIerrors } from "../errors.js"
import { addTimeToUnixTimestamp, getDateTime } from "../services/date.js"

const client = new MongoClient(process.env.CONNECTION_DB)
const db = client.db(process.env.NAME_DB)
const tokenDB = db.collection(process.env.TOKEN_COLLECTION_DB)

export default class TokenModel
{
    static async getTokenData(filter)
    {
        try {
            return await tokenDB.findOne(filter)
        } catch (error) {
            throw new Error(APIerrors.NOT_FOUND,title + ': ' + error.message)
        }
    }

    static async create(user)
    {
        try {
            const token = jwt.sign(user, process.env.PRIVATE_KEY)
            await tokenDB.insertOne({
                token, 
                lastActivity: getDateTime(),
                user_id : new ObjectId(user._id)})
            return token
        } catch (error) {
            throw new Error(APIerrors.LOGIN_FAILED.title + ': ' + error.message)
        }
    }

    static async validate({token})
    {
        if (!token) throw new Error(APIerrors.INVALID_TOKEN.title)
        try {
            const payload = jwt.verify(token, process.env.PRIVATE_KEY)
            const isSessionActive = await TokenModel.getTokenData({token})
            if (!isSessionActive) throw new Error(APIerrors.EXPIRED_TOKEN.title)

            return payload
        } catch (error) {
            throw new Error(APIerrors.INVALID_TOKEN.title + ': ' + error.message)
        }
    }

    static async delete({token})
    {
        try {
            return await tokenDB.deleteOne({ token })
        } catch (error) {
            throw new Error(APIerrors.LOGOUT_FAILED.title + ': ' + error.message)
        }
    }

    static async checkUserHasActiveToken({user})
    {
        const check = await TokenModel.getTokenData({user_id: user._id})
        return check ? true : false
    }

    static async updateTokenDate({token})
    {
        try {
            await tokenDB.updateOne({ token },{$set: {lastActivity: getDateTime()}})
            return undefined
        } catch (error) {
            throw new Error(APIerrors.INVALID_TOKEN + ': ' + error.message)
        }
    }

    static async isTokenExpired({token})
    {
        try {
            const tokenData = await TokenModel.getTokenData({token})
            if (!tokenData) throw new Error(APIerrors.INVALID_TOKEN.title)

            const currentTime = getDateTime().unixTimestamp
            const expiredTokenTime = addTimeToUnixTimestamp({
                unixTimestamp: tokenData.lastActivity.unixTimestamp,
            })

            const isExpired = expiredTokenTime <= currentTime
            if(isExpired) await TokenModel.delete({token})
            return isExpired
        } catch (error) {
            return true // Consider the token expired if an error occurs
        }
    }
}
import { MongoClient, ObjectId } from "mongodb"
import jwt from "jsonwebtoken"
import { APIerrors } from "../errors.js"

const client = new MongoClient(process.env.CONNECTION_DB)
const db = client.db(process.env.NAME_DB)
const tokenDB = db.collection(process.env.TOKEN_COLLECTION_DB)

export default class TokenModel
{
    static async create(user)
    {
        const token = jwt.sign(user, process.env.PRIVATE_KEY)
        await tokenDB.insertOne({token, user_id : new ObjectId(user._id)})
        return token
    }

    static async validate({token})
    {
            if (!token) throw new Error(APIerrors.INVALID_TOKEN.title);
            const payload = jwt.verify(token, process.env.PRIVATE_KEY)
            const sessionActiva = await tokenDB.findOne({token, user_id: new ObjectId(payload._id)})
            if (!sessionActiva) throw new Error(APIerrors.INVALID_TOKEN.title);

            return payload
    }

    static async delete({token})
    {
        try {
            return await tokenDB.deleteOne({token : token})
        } catch (error) {
            throw new Error(APIerrors.LOGOUT_FAILED.title)
        }
    }

    static async checkUserHasActiveToken({user})
    {
        const check = await tokenDB.findOne({user_id: user._id})

        if(check) return check
        return false
    }
}
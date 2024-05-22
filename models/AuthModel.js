import { APIerrors } from "../errors.js"
import TokenModel from "./TokenModel.js"
import UsersModel from "./UsersModel.js"
import bcrypt from 'bcrypt'

export default class AuthModel
{
    static async login({email, password})
    {
        const user = await UsersModel.checkUserExists(email)
        if(!user) throw new Error(APIerrors.INVALID_USER_OR_PASSWORD.title)

        const isPasswordCorrect = await this.isPasswordCorrect(password, user.password)
        if(!isPasswordCorrect) throw new Error(APIerrors.INVALID_USER_OR_PASSWORD.title)
        user.password = undefined

        const hasSessionActive = await TokenModel.checkUserHasActiveToken({user})
        if (hasSessionActive) {
            return {
                id: user._id,
                email: user.email,
                token: hasSessionActive.token
            }
        }

        return {
            id: user._id,
            email: user.email,
            token: await TokenModel.create(user)
        }
    }
    
    static async logout({token})
    {
        return TokenModel.delete({token})
    }

    static async isPasswordCorrect(password, passwordInDB)
    {
      return await bcrypt.compare(password, passwordInDB)
    }
}
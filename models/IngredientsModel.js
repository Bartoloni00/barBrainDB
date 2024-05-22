import { MongoClient, ObjectId } from "mongodb"
import { APIerrors } from "../errors.js"

const client = new MongoClient(process.env.CONNECTION_DB)
const db = client.db(process.env.NAME_DB)
const ingredientDB = db.collection(process.env.INGREDIENTS_COLLECTION_DB)

export default class IngredientsModel
{
    static async getAll()
    {
        const ingredients = await ingredientDB.find().toArray()
        if(ingredients.length < 1) throw new Error(APIerrors.NOT_FOUND.title)

        return ingredients
    }
    
    static async getById({id})
    {
        const ingredient = await ingredientDB.findOne({_id: new ObjectId(id)})
        if(!ingredient)  throw new Error(APIerrors.NOT_FOUND.title)
    
        return ingredient
    }

    static async create({data})
    {
        const newIngredient = IngredientsModel.#prepareData({data})

        try {
            const ingredient = await ingredientDB.insertOne(newIngredient)
            newIngredient._id = ingredient.insertedId
            return newIngredient
        } catch (error) {
            throw new Error(APIerrors.CREATE_FAILED.title + ': ' + error.message)
        }
    }

    static async delete({id})
    {
        try {
            await this.getById({id})
            
            await ingredientDB.deleteOne({_id: new ObjectId(id)})
            return APIerrors.SUCCESS_DELETE
        } catch (error) {
            throw new Error(APIerrors.DELETE_FAILED.title + ': ' + error.message)
        }
    }

    static async update({id,data})
    {
        try {
            await ingredientDB.updateOne({_id: new ObjectId(id)}, {$set: data})
            return data
        } catch (error) {
            throw new Error(APIerrors.UPDATE_FAILED.title + ': ' + error.message)
        }
    }

    static #prepareData({data})
    {
        return {
            name: data.name,
            category: data.category
        }
    }
}
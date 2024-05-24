import { MongoClient, ObjectId } from "mongodb"
import { APIerrors } from "../errors.js"

const client = new MongoClient(process.env.CONNECTION_DB)
const db = client.db(process.env.NAME_DB)
const categoriesDB = db.collection(process.env.CATEGORIES_COLLECTION_DB)

export default class CategoriesModel
{
    static async getAll()
    {
        const categories = await categoriesDB.find().toArray()
        if(categories.length < 1) throw new Error(APIerrors.NOT_FOUND.title)
        
        return categories
    }

    static async getById({id})
    {
        try {
            const categories = await categoriesDB.findOne({_id: new ObjectId(id)})
            if(!categories) throw new Error()
            return categories
       } catch (error) {
            throw new Error(APIerrors.NOT_FOUND.title + ': ' + error.message)
       }
    }

    static async create({data})
    {
        const newCategory = CategoriesModel.#prepareData({data})

        try {
            const category =  await categoriesDB.insertOne(newCategory)
            newCategory._id = category.insertedId
            return newCategory
        } catch (error) {
            throw Error(APIerrors.CREATE_FAILED.title + ': ' + error.message)
        }
    }

    static async delete({id})
    {
        try {
            await this.getById({id})

            await categoriesDB.deleteOne({_id: new ObjectId(id)})
            // este return no se muestra porque el status es 204(no content)
            return APIerrors.SUCCESS_DELETE
        } catch (error) {
            throw new Error(APIerrors.DELETE_FAILED.title + ': ' + error.message)
        }
    }

    static async update({id, data})
    {
        try {
            await categoriesDB.updateOne({_id: new ObjectId(id)},{$set: data})
            return data
        } catch (error) {
            throw new Error(APIerrors.UPDATE_FAILED.title + ': ' + error.message)
        }
    }

    static #prepareData({data})
    {
        return {
            name: data.name,
            description: data.description
            }
    }
}
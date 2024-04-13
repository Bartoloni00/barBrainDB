import { MongoClient, ObjectId } from "mongodb"
import { APIerrors } from "../errors.js"

const client = new MongoClient(process.env.CONNECTION_DB)
const db = client.db(process.env.NAME_DB)
const categoriesDB = db.collection(process.env.CATEGORIES_COLLECTION_DB)

export default class CategoriesModel
{
    static async getAll()
    {
        return categoriesDB.find().toArray()
    }

    static async getById({id})
    {
        try {
            return categoriesDB.findOne({_id: new ObjectId(id)})
       } catch (error) {
            throw new Error(APIerrors.NOT_FOUND.title)
       }
    }

    static async create({data})
    {
        const newCategory = {
        name: data.name,
        description: data.description
        }

        try {
            const category =  await categoriesDB.insertOne(newCategory)
            newCategory._id = category.insertedId
            return newCategory
        } catch (error) {
            throw Error(APIerrors.CREATE_FAILED.title)
        }
    }

    static async delete({id})
    {
        try {
            await categoriesDB.deleteOne({_id: new ObjectId(id)})
            // este return no se muestra porque el status es 204(no content)
            return {'message': `La categoria con el id: ${id} fue eliminada exitosamente.`}
        } catch (error) {
            throw new Error(APIerrors.DELETE_FAILED.title)
        }
    }

    static async update({id, data})
    {
        try {
            await categoriesDB.updateOne({_id: new ObjectId(id)},{$set: data})
            return {"message": `La categoria con el id: ${id} fue actualizada correctamente.`, "newData": data}
        } catch (error) {
            throw new Error(APIerrors.UPDATE_FAILED.title)
        }
    }
}
import { MongoClient, ObjectId } from "mongodb"
import {deleteFile} from '../services/fs.js'
import { APIerrors } from "../errors.js"

const client = new MongoClient(process.env.CONNECTION_DB)
const db = client.db(process.env.NAME_DB)
const drinksDB = db.collection(process.env.DRINKS_COLLECTION_DB)

export default class DrinksModel
{
    static async getAll(filters)
    {
        let activeFilters = DrinksModel.#prepareFilters(filters)
        return drinksDB.find(activeFilters).toArray()
    }
    
    static async paginate(query)
    {
        let {page, perPage} = DrinksModel.#parsePaginationData(query)
        const filters = DrinksModel.#prepareFilters(query)

        try {
            const { totalCount, data } = await DrinksModel.#fetchPaginatedData(filters, page, perPage);
            return {
                metadata: DrinksModel.#generateMetadata(totalCount, page, perPage),
                drinks: data
            }
        } catch (error) {
            throw new Error(`${APIerrors.NOT_FOUND.title} | pagination`)
        }
    }

    static async getById({id})
    {
        try {
            return drinksDB.findOne({_id: new ObjectId(id)})
       } catch (error) {
            throw new Error(APIerrors.NOT_FOUND.title)
       }
    }
    
    static async getRandom()
    {
        const pipeline = [ { $sample: { size: 1 } } ]
        return await drinksDB.aggregate(pipeline).toArray()
    }

    static async create({data})
    {
        const newDrink = {...data}

        try {
            const drink = await drinksDB.insertOne(newDrink)
            newDrink._id = drink.insertedId
            return newDrink
        } catch (error) {
            throw Error(APIerrors.CREATE_FAILED.title)
        }
    }

    static async delete({id})
    {
        try {
            const drinkDeleted = await drinksDB.findOne({_id: new ObjectId(id)})

            await drinksDB.deleteOne({_id: new ObjectId(id)})

            if (drinkDeleted.cover) await deleteFile(drinkDeleted.cover)
            // este return no se muestra porque el status es 204(no content)
            return {'message': `El trago con el id: ${id} fue eliminado exitosamente.`}
        } catch (error) {
            throw new Error(APIerrors.DELETE_FAILED.title)
        }
    }

    static async update({id, data})
    {
        const drinkUpdated = await drinksDB.findOne({_id: new ObjectId(id)})

        try {
            if (drinkUpdated.cover && data.cover) await deleteFile(drinkUpdated.cover)

            await drinksDB.updateOne({_id: new ObjectId(id)},{$set: data})
            return {"message": `El trago con el id: ${id} fue actualizado correctamente.`, "newData": data}
        } catch (error) {
            throw new Error(APIerrors.UPDATE_FAILED.title)
        }
    }

    static #prepareFilters(filters)
    {
        let activeFilters = {}
        if (!filters) return {}
        if (filters.name) 
        {
            activeFilters.$text = { $search: filters.name }
        }
        if(filters.category)
        {
            activeFilters.category = filters.category
        }
        if(filters.ingredient)
        {
            activeFilters["ingredients.name"] = filters.ingredient
        }
        return activeFilters
    }

    static #parsePaginationData({page, perPage})
    {
        page = parseInt(page, 10) || 1
        perPage = parseInt(perPage, 10) || 50
        
        return {page, perPage}
    }

    static async #fetchPaginatedData(filters, page, perPage) 
    {
        const aggregationPipeline = [
            { $match: filters },
            {
                $facet: {
                    metadata: [{ $count: 'totalCount' }],
                    data: [{ $skip: (page - 1) * perPage }, { $limit: perPage }],
                },
            },
        ];
    
        const articles = await drinksDB.aggregate(aggregationPipeline).toArray();
    
        const totalCount = articles[0]?.metadata[0]?.totalCount || 0;
        const data = articles[0]?.data || [];
    
        return { totalCount, data };
    }

    static #generateMetadata(totalCount, page, perPage)
    {
        let totalPages = Math.round(totalCount/perPage * 100) / 100

        return {totalCount, page, perPage, totalPages}
    }
}
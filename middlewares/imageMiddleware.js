import { APIerrors } from "../errors.js"
import sharp from "sharp"
import DrinksModel from "../models/DrinksModel.js"
import Result from "../services/resultsPattern.js"

export default class ImageMiddleware
{
    /**
     * Agarra la imagen guardada en memoria la redimenciona, la pone en formato 
     * webp con el 80% de la calidad para bajarle el peso y la guarda el 
     * archivo en uploads.
     */
    static async #resizeGeneric({ route, filePath, width, heigh, name})
    {
        return sharp(filePath)
        .resize(width, heigh)
        .webp(80)
        .toFile(`uploads/${route}/` + name)
    }

    static async resizeDrinkImage(req, res, next) {
        if (!req.file) return next()

        let imageName = await ImageMiddleware.#generateImageName(req)
        
        try {
            await ImageMiddleware.#resizeGeneric({
                route: 'drinks',
                filePath: req.file.buffer,
                width: 512,
                height: 512,
                name: imageName
            })
            
            req.file.path =  `/uploads/drinks/${imageName}`
            next()
        } catch (error) {
            res.status(400).json(Result.failure(APIerrors.IMAGE_PROCESSING_ERROR.title + ': ' + error.message))
        }
    }

    static async #generateImageName(req)
    {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let imageName = ''
        if(req.body.name) 
        {
            imageName = `${req.body.name}-${uniqueSuffix}-drink.webp`;
        }
        else if(req.method == 'PATCH' || !req.body.name)
        {
            let patchDrink = await DrinksModel.getById({id: req.params.id})
            imageName = `${uniqueSuffix}-${patchDrink.name}-drink.webp`;
        }

        return imageName.replaceAll(' ', '-')
    }
}
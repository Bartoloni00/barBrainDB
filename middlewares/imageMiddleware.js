import sharp from "sharp"
import { deleteFile } from "../services/fs.js"

export default class ImageMiddleware
{
    static async #resizeGeneric({ route, filePath, width, heigh, fileName, name})
    {
        return sharp(filePath)
        .resize( width, heigh, {
            kernel: sharp.kernel.nearest,
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0.5 }
        })
        .webp(80)
        .toFile(`uploads/${route}/` + fileName + name)
    }

    static async resizeDrinkImage(req, res, next) {
        if (!req.file) return next()
        // console.log(req.body)
        const originalRoute = req.file.path
    
        try {
            await ImageMiddleware.#resizeGeneric({
                route: 'drinks',
                filePath: req.file.path,
                width: 512,
                height: 512,
                fileName: req.file.filename,
                name: 'drink.webp'
            })
            
            // await deleteFile(originalRoute) //Solucionar el porque no elimina esta imagen

            req.file.path += 'drink.webp'
            next()
        } catch (error) {
            res.status(500).json({ error: 'Error al procesar la imagen: ' + error.message })
        }
    }

}
import sharp from "sharp"

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
        .resize(width,heigh,{
            kernel: sharp.kernel.nearest,
            fit: 'cover',
            background: { r: 255, g: 255, b: 255, alpha: 0.5 }
        })
        .webp(80)
        .toFile(`uploads/${route}/` + name)
    }

    static async resizeDrinkImage(req, res, next) {
        if (!req.file) return next()

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const imageName = uniqueSuffix + '-drink.webp'
        
        try {
            const image = await ImageMiddleware.#resizeGeneric({
                route: 'drinks',
                filePath: req.file.buffer,
                width: 512,
                height: 512,
                name: imageName
            })
            
            req.file.path =  `/uploads/drinks/${imageName}`
            next()
        } catch (error) {
            res.status(500).json({ error: 'Error al procesar la imagen: ' + error.message })
        }
    }

}
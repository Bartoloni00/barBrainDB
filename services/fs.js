import fs from 'fs/promises'

export async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath)
  } catch (err) {
    throw new Error(`Error al eliminar la imagen: ${err.message}`)
  }
}
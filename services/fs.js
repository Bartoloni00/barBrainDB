import fs from 'fs'
import path from 'path';

export async function deleteFile(filePath)
{
  const route = getAbsolutePath(filePath)
  fs.unlink(route, err => {
      if (err) {
          throw new Error(`Error al eliminar la imagen: ${err.message}`);
      }
  });
}

function getAbsolutePath(Path)
{
  let __dirname = path.dirname(new URL(import.meta.url).pathname)
  __dirname = __dirname.substring(3)
  return __dirname + '/..' + Path
}
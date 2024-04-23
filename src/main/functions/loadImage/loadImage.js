import { join } from 'path'
const assetPath = join(__dirname, '../../resources/assets') 
import fs from 'fs'

function cargarImagen(ruta) {
  try {
    // Lee la imagen desde el archivo
    const imagenBuffer = fs.readFileSync(ruta);

    // Convierte la imagen en Base64
    const imagenBase64 = Buffer.from(imagenBuffer).toString('base64');

    // Crea una URL de datos para la imagen
    const imagenURL = `data:image/svg+xml;base64,${imagenBase64}`;

    return imagenURL;
  } catch (error) {
    console.error('Error al cargar la imagen:', error);
    return null;
  }
}

// Escucha el evento 'getFilesList' enviado desde el proceso de renderizado
export default function LoadImage(mainWindow){
    fs.readdir(assetPath, (err, fileList) => {
      if (err) {
        mainWindow.webContents.send('assetList', []); // Envía una lista vacía en caso de error
      } else {
        const list = fileList.map(name => {
          return {
            name,
            img: cargarImagen(assetPath + `/${name}`)
          }
        })
        mainWindow.webContents.send('assetList', list); // Envía la lista de archivos al proceso de renderizado
      }
    });
  
}


// Función para cargar una imagen desde una ruta de archivo
/*function cargarImagen(ruta) {
  try {
    // Lee la imagen desde el archivo
    const imagenBuffer = fs.readFileSync(ruta);

    // Convierte la imagen en Base64
    const imagenBase64 = Buffer.from(imagenBuffer).toString('base64');

    // Crea una URL de datos para la imagen
    const imagenURL = `data:image/svg+xml;base64,${imagenBase64}`;

    return imagenURL;
  } catch (error) {
    console.error('Error al cargar la imagen:', error);
    return null;
  }
}

  // Escucha el evento 'getFilesList' enviado desde el proceso de renderizado
  ipcMain.on('getAssetsList', () => {
    fs.readdir(assetPath, (err, fileList) => {
      if (err) {
        mainWindow.webContents.send('assetList', []); // Envía una lista vacía en caso de error
      } else {
        const list = fileList.map(name =>{
          return {
            name,
            img: cargarImagen(assetPath + `/${name}`)
          }
        }) 
        mainWindow.webContents.send('assetList', list); // Envía la lista de archivos al proceso de renderizado
      }
    });
  });*/
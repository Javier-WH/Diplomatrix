import fs from 'fs'

export default function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data;
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    return null;
  }
}
import fs from 'fs';
import axios from 'axios';
import { Readable } from 'stream';
import FormData from "form-data";

export async function sendImage(imagePath: string, apiUrl: string, fileName: string, authBase64: string) {
  // Leer el archivo de imagen
  const imageBuffer = fs.readFileSync(imagePath);

  // Crear un stream a partir del buffer de imagen
  const imageStream = new Readable();
  imageStream.push(imageBuffer);
  imageStream.push(null);

  // Crear un formulario y agregar la imagen al mismo
  const formData = new FormData();
  formData.append('image', imageStream, fileName);

  // Enviar la imagen a la API usando Axios
  const { status, statusText } = await axios.post(apiUrl, formData, {
    headers: {
        'Authorization': `Basic ${authBase64}`,
        'Content-Type': 'multipart/form-data',
    },
  });

  if (status === 200 || status === 201 || status === 204) {
    console.log(`[API] Se subió con éxito la imagen: ${statusText}` + fileName);
  } else {
    console.warn(`[API] No se pudo conectar con la API: ${statusText}`)
  }
}
const pixelToMilimeter = (pixels) => {
  // Obtener la densidad de píxeles del dispositivo (por ejemplo, 96 PPI)
  const pixelDensity = window.devicePixelRatio * 96;

  // Calcular la distancia en milímetros
  const millimeters = (pixels / pixelDensity) * 25.4;

  return millimeters;
};

const milimeterToPixel = (millimeters) => {
  // Obtener la densidad de píxeles del dispositivo (por ejemplo, 96 PPI)
  const pixelDensity = window.devicePixelRatio * 96;

  // Calcular la distancia en píxeles
  const pixels = (millimeters / 25.4) * pixelDensity;

  return pixels;
};

function swapElements(array, index1, index2) {
  if (index2 < 0 || index2 > (array.length - 1)){
    throw new Error("Los indices son iconrectos")
  }

  const copy = [...array]; // Crear una copia del array original
  const temp = copy[index1]; // Guardar el elemento en el índice 1
  copy[index1] = copy[index2]; // Asignar el elemento en el índice 2 al índice 1
  copy[index2] = temp; // Asignar el elemento temporal (guardado del índice 1) al índice 2
  copy[index1].header.index = index1;
  copy[index2].header.index = index2;
  return copy; // Devolver el array con los elementos intercambiados
}

export { pixelToMilimeter, milimeterToPixel, swapElements}
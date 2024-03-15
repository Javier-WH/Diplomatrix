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

export { pixelToMilimeter, milimeterToPixel}
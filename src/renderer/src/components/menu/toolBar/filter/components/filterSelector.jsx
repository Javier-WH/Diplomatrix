import { useEffect, useState, useContext} from "react";
import { MainContext} from "../../../../../contexts/mainContext.jsx";
import RangeValue from "../../../../rangeValue/RangeValue.jsx"
export default function FilterSelector(){

  const { addStyle, getStyle } = useContext(MainContext)
  const [blur, setBlur] = useState(getCssFilters(getStyle('filter'))?.blurValue ?? 0);
  const [contrast, setContrast] = useState(getCssFilters(getStyle('filter'))?.contrastValue ?? 100);
  const [brightness, setBrightness] = useState(getCssFilters(getStyle('filter'))?.brightnessValue ?? 100);
  const [grayscale, setGrayscale] = useState(getCssFilters(getStyle('filter'))?.grayscaleValue ?? 0);
  const [hueRotate, setHueRotate] = useState(getCssFilters(getStyle('filter'))?.hueRotateValue ?? 0);
  const [invert, setInvert] = useState(getCssFilters(getStyle('filter'))?.hueRotateValue ?? 0);

  useEffect(()=>{

    addStyle({
      key: "filter",
      value: `blur(${blur}px) 
      brightness(${brightness}%) 
      contrast(${contrast}%) 
      drop-shadow(0px 0px 0px rgba(0, 0, 0, 0)) 
      grayscale(${grayscale}%) 
      hue-rotate(${hueRotate}deg) 
      invert(${invert}%) 
      opacity(1) 
      saturate(1) 
      sepia(0%)`
    })


  }, [blur, contrast, brightness, grayscale, hueRotate])




  return <div className="filter-values-container">
    <RangeValue value={blur} setValue={setBlur} title="Blur" max={60}/>
    <RangeValue value={contrast} setValue={setContrast} title="Contrast" max={100} />
    <RangeValue value={brightness} setValue={setBrightness} title="Brightness" max={300} />
    <RangeValue value={grayscale} setValue={setGrayscale} title="Grayscale" max={100} />
    <RangeValue value={hueRotate} setValue={setHueRotate} title="HueRotate" max={500} />
    <RangeValue value={invert} setValue={setInvert} title="Invert" max={100} />
  </div>


}


//.element {filter: blur(2px) brightness(80%) contrast(1.5) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5)) grayscale(50%) hue-rotate(180deg) invert(70%) opacity(80%) saturate(1.5) sepia(80%);}

function getCssFilters(filtersString) {
  if (!filtersString) return;

  const blurRegex = /blur\((-?\d+(\.\d+)?)px\)/;
  const blurMatch = filtersString.match(blurRegex);
  const blurValue = blurMatch ? blurMatch[1] : null;

  const brightnessRegex = /brightness\((-?\d+(\.\d+)?)%\)/;
  const brightnessMatch = filtersString.match(brightnessRegex);
  const brightnessValue = brightnessMatch ? brightnessMatch[1] : null;

  const contrastRegex = /contrast\((-?\d+(\.\d+)?)\)/;
  const contrastMatch = filtersString.match(contrastRegex);
  const contrastValue = contrastMatch ? contrastMatch[1] : null;

  const dropShadowRegex = /drop-shadow\((-?\d+(\.\d+)?)px (-?\d+(\.\d+)?)px (-?\d+(\.\d+)?)px rgba\((-?\d+), (-?\d+), (-?\d+), (0\.\d+)\)\)/;
  const dropShadowMatch = filtersString.match(dropShadowRegex);
  const dropShadowValue = dropShadowMatch ? {
    horizontalOffset: dropShadowMatch[1],
    verticalOffset: dropShadowMatch[3],
    blurRadius: dropShadowMatch[5],
    color: {
      red: dropShadowMatch[6],
      green: dropShadowMatch[7],
      blue: dropShadowMatch[8],
      alpha: dropShadowMatch[9]
    }
  } : null;

  const grayscaleRegex = /grayscale\((-?\d+(\.\d+)?)%\)/;
  const grayscaleMatch = filtersString.match(grayscaleRegex);
  const grayscaleValue = grayscaleMatch ? grayscaleMatch[1] : null;

  const hueRotateRegex = /hue-rotate\((-?\d+(\.\d+)?)deg\)/;
  const hueRotateMatch = filtersString.match(hueRotateRegex);
  const hueRotateValue = hueRotateMatch ? hueRotateMatch[1] : null;

  const invertRegex = /invert\((-?\d+(\.\d+)?)%\)/;
  const invertMatch = filtersString.match(invertRegex);
  const invertValue = invertMatch ? invertMatch[1] : null;

  const opacityRegex = /opacity\((-?\d+(\.\d+)?)\)/;
  const opacityMatch = filtersString.match(opacityRegex);
  const opacityValue = opacityMatch ? opacityMatch[1] : null;

  const saturateRegex = /saturate\((-?\d+(\.\d+)?)\)/;
  const saturateMatch = filtersString.match(saturateRegex);
  const saturateValue = saturateMatch ? saturateMatch[1] : null;

  const sepiaRegex = /sepia\((-?\d+(\.\d+)?)%\)/;
  const sepiaMatch = filtersString.match(sepiaRegex);
  const sepiaValue = sepiaMatch ? sepiaMatch[1] : null;

  return {
    blurValue,
    brightnessValue,
    contrastValue,
    dropShadowValue,
    grayscaleValue,
    hueRotateValue,
    invertValue,
    opacityValue,
    saturateValue,
    sepiaValue
  };
}


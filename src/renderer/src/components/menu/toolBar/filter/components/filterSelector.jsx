import { useEffect, useState, useContext } from "react";
import { MainContext } from "../../../../../contexts/mainContext.jsx";
import RangeValue from "../../../../rangeValue/RangeValue.jsx";
import OverlayColorPicker from "../../../../overlayColorPicker/overlayColorPicker.jsx";
import "./filterSelector.css"

export default function FilterSelector() {

  const { addStyle, getStyle } = useContext(MainContext)
  const [blur, setBlur] = useState(getCssFilters(getStyle('filter'))?.blurValue ?? 0);
  const [contrast, setContrast] = useState(getCssFilters(getStyle('filter'))?.contrastValue ?? 100);
  const [brightness, setBrightness] = useState(getCssFilters(getStyle('filter'))?.brightnessValue ?? 100);
  const [grayscale, setGrayscale] = useState(getCssFilters(getStyle('filter'))?.grayscaleValue ?? 0);
  const [hueRotate, setHueRotate] = useState(getCssFilters(getStyle('filter'))?.hueRotateValue ?? 0);
  const [invert, setInvert] = useState(getCssFilters(getStyle('filter'))?.invertValue ?? 0);
  const [opacity, setOpacity] = useState(getCssFilters(getStyle('filter'))?.opacityValue ?? 10000);
  const [saturate, setSaturate] = useState(getCssFilters(getStyle('filter'))?.saturateValue ?? 100);
  const [sepia, setSepia] = useState(getCssFilters(getStyle('filter'))?.sepiaValue ?? 0);

  const [horizontalOffset, setHorizontalOffset] = useState(getCssFilters(getStyle('filter'))?.dropShadowValue?.horizontalOffset ?? 0)
  const [verticalOffset, setVerticalOffset] = useState(getCssFilters(getStyle('filter'))?.dropShadowValue?.verticalOffset ?? 0)
  const [blurRadius, setBlurRadius] = useState(getCssFilters(getStyle('filter'))?.dropShadowValue?.blurRadius ?? 0)
  const [borderColor, setBorderColor] = useState(getCssFilters(getStyle('filter'))?.dropShadowValue?.color ?? "rgba(0, 0, 0, 255)");


  useEffect(() => {
    
    addStyle({
      key: "filter",
      value: `blur(${blur}px) 
      brightness(${brightness}%) 
      contrast(${contrast}%) 
      drop-shadow(${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${borderColor})
      grayscale(${grayscale}%) 
      hue-rotate(${hueRotate}deg) 
      invert(${invert}%) 
      opacity(${opacity / 100}) 
      saturate(${saturate / 100}) 
      sepia(${sepia}%)`
    })




  }, [blur, contrast, brightness, grayscale, hueRotate, invert, opacity, saturate, sepia, borderColor, horizontalOffset, verticalOffset, blurRadius])




  return <div className="filter-values-container">
    <RangeValue value={blur} setValue={setBlur} title="Blur" max={60} />
    <RangeValue value={contrast} setValue={setContrast} title="Contrast" max={100} />
    <RangeValue value={brightness} setValue={setBrightness} title="Brightness" max={300} />
    <RangeValue value={grayscale} setValue={setGrayscale} title="Grayscale" max={100} />
    <RangeValue value={hueRotate} setValue={setHueRotate} title="HueRotate" max={360} />
    <RangeValue value={invert} setValue={setInvert} title="Invert" max={100} />
    <RangeValue value={opacity} setValue={setOpacity} title="Opacity" max={100} />
    <RangeValue value={saturate} setValue={setSaturate} title="Saturate" max={1000} />
    <RangeValue value={sepia} setValue={setSepia} title="Sepia" max={100} />
    <div className="filter-values-color-picker-container">
      <div className="filter-values-color-picker">
        <span>Sombra Genrál</span>
        <OverlayColorPicker color={borderColor} setColor={setBorderColor} />
      </div>
      <br />
      <RangeValue value={horizontalOffset} setValue={setHorizontalOffset} title="horizontalOffset" min={-100} max={100} />
      <RangeValue value={verticalOffset} setValue={setVerticalOffset} title="verticalOffset" min={-100} max={100} />
      <RangeValue value={blurRadius} setValue={setBlurRadius} title="blurRadius" max={100} />
    </div>
  </div>


}


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



  const dropShadowStep1Regex = /drop-shadow\((.*?)\)/;
  const dropShadowStep1Match = filtersString.match(dropShadowStep1Regex);
  const dropShadowContent = dropShadowStep1Match ? dropShadowStep1Match[1] + ")" : null;
  const halfContent = dropShadowContent.split("rgb")
  const color = "rgb" + halfContent[1]
  const posValues = halfContent[0].split("px ")
  const horizontalOffset = posValues[0]
  const verticalOffset = posValues[1]
  const blurRadius = posValues[2]
  const dropShadowValue ={
    horizontalOffset,
    verticalOffset,
    blurRadius,
    color
  }


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
  const opacityValue = opacityMatch ? opacityMatch[1] * 100  : null;

  const saturateRegex = /saturate\((-?\d+(\.\d+)?)\)/;
  const saturateMatch = filtersString.match(saturateRegex);
  const saturateValue = saturateMatch ? saturateMatch[1] * 100 : null;

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


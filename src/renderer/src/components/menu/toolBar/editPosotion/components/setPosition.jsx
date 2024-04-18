import { useContext, useState, useEffect} from "react"
import { MainContext } from "../../../../../contexts/mainContext"
import { milimeterToPixel } from "../../../../../utils/fucntions"
import getSVGicons from '../../../.././../icons/iconList'
import RangeValue from "../../../../rangeValue/RangeValue"

import "./moveZindex.css"

export default function SetPosition() {
  
  const {sheetStyle, getStyle, addStyle } = useContext(MainContext);
  


  const [maxWidth, setMaxWidth] = useState(milimeterToPixel(sheetStyle.width.replace("cm", "")) * 10)
  const [maxHeight, setMaxHeight] = useState(milimeterToPixel(sheetStyle.height.replace("cm", "")) * 10)
  const [Xpost, setXpos] = useState(getStyle("left")?.replace("px", "") ?? 1);
  const [Ypost, setYpos] = useState(getStyle("top")?.replace("px", "") ?? 1);
  const [height, setHeight] = useState(getStyle("height")?.replace("px", "") ?? 1)
  const [width, setWidth] = useState(getStyle("width")?.replace("px", "") ?? 1)
  const [rotation, setRotation] = useState(getRotationSkew(getStyle("transform"))?.rotateValue ?? 0);
  const [skewValueX, setSkewValueX] = useState(getRotationSkew(getStyle("transform"))?.skewValueX ?? 0) 
  const [skewValueY, setSkewValueY] = useState(getRotationSkew(getStyle("transform"))?.skewValueY ?? 0) 



  useEffect(()=>{
    addStyle({key: "left", value: Xpost + 'px'})
  },[Xpost])


  useEffect(() => {
    addStyle({ key: "top", value: Ypost + 'px' })
  }, [Ypost])
  
  useEffect(()=>{
    addStyle({ key: "height", value: height + 'px' })
  }, [height])

  useEffect(() => {
    addStyle({ key: "width", value: width + 'px' })
  }, [width])

  useEffect(() => {

    addStyle({ key: "transform", value: `rotate(${rotation}deg) skew(${skewValueX}deg, ${skewValueY}deg)` })
  }, [rotation, skewValueX, skewValueY])

  return <div className="setPosition-rangeValue-container">
    <RangeValue value={Xpost} setValue={setXpos} max={maxWidth} title="Posición horizontal"/>
    <RangeValue value={Ypost} setValue={setYpos} max={maxHeight} title="Posición vertical" />
    <RangeValue value={height} setValue={setHeight} max={maxHeight} title="Alto" />
    <RangeValue value={width} setValue={setWidth} max={maxWidth} title="Ancho" />
    <RangeValue value={rotation} setValue={setRotation} min={-180} max={180} title="Roptacion" />
    <RangeValue value={skewValueX} setValue={setSkewValueX} min={-80}  max={80} title="Inclinación a horizontal" />
    <RangeValue value={skewValueY} setValue={setSkewValueY} min={-80}  max={80} title="Inclinación a vertical" />
  </div>
}

function getRotationSkew(transformString){
  if(!transformString) return

  const rotateRegex = /rotate\((-?\d+(\.\d+)?)deg\)/;
  const rotateMatch = transformString.match(rotateRegex);
  const rotateValue = rotateMatch ? rotateMatch[1] : null;

  const skewRegex = /skew\((-?\d+(\.\d+)?)deg, (-?\d+(\.\d+)?)deg\)/;
  const skewMatch = transformString.match(skewRegex);
  const skewValueX = skewMatch ? skewMatch[1] : null;
  const skewValueY = skewMatch ? skewMatch[3] : null;

  return {
    rotateValue,
    skewValueX,
    skewValueY
  }
}
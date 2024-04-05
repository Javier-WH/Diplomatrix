import getSVGIcon from "../../../../../icons/iconList"
import { useState, useEffect, useContext } from "react"
import { MainContext } from "../../../../../contexts/mainContext";
import { Button } from 'primereact/button';
import ColorPicker from 'react-best-gradient-color-picker'
import RangeValue from "../../../../rangeValue/RangeValue";
import "./backGroundSelector.css";

export default function TextBorderSelector() {

  const {getStyle, fullEditElemtnt } = useContext(MainContext)
  const [borderColor, setBorderColor] = useState('rgba(0,0,0,1');
  const [borderWidth, setBorderWidth] = useState(3)
  const [fisrtTime, setFisrtTime] = useState(false);




  useEffect(() => {
    if (fisrtTime) {
    
      const style = {
        WebkitTextStrokeColor: borderColor,
        WebkitTextStrokeWidth: borderWidth + "px"
      }
  
      fullEditElemtnt({style});
    } else {
      setFisrtTime(true);
    }
  }, [borderColor, borderWidth]);


  useEffect(()=>{
    const currentWidth = getStyle("WebkitTextStrokeWidth");
    const currentColor = getStyle("WebkitTextStrokeColor")?.replace("px", "");
    if (currentWidth === "0" || currentWidth === undefined) return
    setBorderWidth(Number.parseInt(currentWidth))
    setBorderColor(currentColor)
  },[])


  const handleReset = ()=>{
    const style = {
      WebkitTextStrokeColor: "#000000",
      WebkitTextStrokeWidth: "0px"
    }

    fullEditElemtnt({ style });
  }

  return <div id='text-format-main-container'>
    <div className='text-format-item-container'>
      <label htmlFor="text-colorPicker">
        <div className='text-format-icon-container'>{getSVGIcon("textBorder")}</div>
        <span>Borde del texto</span>
      </label>
        <Button icon="pi pi-refresh" rounded text aria-label="Filter" onClick={handleReset}/>
    </div>
    <div>
      <ColorPicker value={borderColor} onChange={setBorderColor} hidePresets={true} hideColorTypeBtns={true} />
      <RangeValue value={borderWidth} setValue={setBorderWidth} max={"10"}/>
    </div>

  </div>
}
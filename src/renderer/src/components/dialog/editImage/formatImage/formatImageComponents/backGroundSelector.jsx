/* eslint-disable no-case-declarations */
import getSVGIcon from "../../../../../icons/iconList"
import { ColorPicker } from 'primereact/colorpicker';
import { Checkbox } from "primereact/checkbox";
import { useState, useEffect, useContext } from "react"
import { MainContext } from "../../../../../contexts/mainContext";
import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider';
import "./backGroundSelector.css";


/*
  0 || undefined = no color,
  1 = solid color,
  2 = gradient
*/

export default function BackgroundSelector() {

  const { getStyle, getHeader, addHeader, fullEditElemtnt } = useContext(MainContext)
  const [checked, setChecked] = useState(false);
  const [backGroundColor, setBackGroundColor] = useState(null);
  const [backGroundType, setBackGroundType] = useState("0")
  const [transparentValue, setTrasparentValue] = useState(0)

  useEffect(()=>{

    if(!checked){
      const style = {
        backgroundColor: "transparent"
      }
      const header = {
        backgroundColor: "0"
      }
      fullEditElemtnt({ header, style })
    }

  },[checked])





  //cuando monta el elemento, verifica el tipo de elemto
  useEffect(()=>{
    const type = getHeader("backgroundColor");
    setBackGroundType(type)
    setChecked(!(type === "0" || type === undefined))

    if(type === "1"){
      let color = getStyle("backgroundColor")?.replace("#", "")
      if(color.length > 6){
        color = color.slice(0, -2);
      }
      setBackGroundColor(color)
      
      const Tvalue = getHeader("transparentValue")
      if(Tvalue != undefined){

        setTrasparentValue(Tvalue)
      }

    }else{
      const bgColor = "FFFFFF"
      setBackGroundColor(bgColor)
      setBackGroundType("1")
    }



  },[])



  //cambia el color y el header
  useEffect(() => {
    if (!backGroundColor || !checked || backGroundType !== "1") return
    const style = {
      backgroundColor: "#" + backGroundColor
    }
    const header = {
      backgroundColor: backGroundType
    }
    fullEditElemtnt({header, style})
  }, [backGroundColor, checked])

  
  //maneja el click en el boton de gradiant
  const handleOnClickGradiant =()=>{
    if (backGroundType === "1"){
      addHeader({ key: "backgroundColor", value: "2" })
      setBackGroundType("2")
    } else if (backGroundType === "2") {
      addHeader({ key: "backgroundColor", value: "1" })
      setBackGroundType("1")
    }
  }

  //maneja la trasparencia
  useEffect(()=>{
    if (backGroundType !== "1" || !checked) return

    const color = backGroundColor.length > 6 ? backGroundColor.slice(0, -2) : backGroundColor

    const value = Math.abs(transparentValue - 255)
    const hexValue = value.toString(16).toUpperCase();
    
    const cleanHexValue = hexValue.length === 1 ? `0${hexValue}` : hexValue


    const header = {
      backgroundColor: "1",
      transparentValue
    }
    const style  = {
      backgroundColor: `#${color}${cleanHexValue}`
    }
    fullEditElemtnt({header, style })
  }, [transparentValue, backGroundColor])

  return <div id='text-format-main-container'>
    <div className='text-format-item-container'>
      <label htmlFor="text-colorPicker">
        <div className='text-format-icon-container'>{getSVGIcon("backGroudColor")}</div>
        <span>Fondo</span>
      </label>
      <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
    </div>
    <div style={{ display: checked ? "block" : "none" }}>
      <div className="text-format-main-subiten-check-container">
        <Button icon={getSVGIcon("gradient")} severity={backGroundType === "2" ? "" : "secondary" } rounded aria-label="Filter" onClick={handleOnClickGradiant}/>
      </div>

      <div className="background-selector-subiten-container" style={{ display: backGroundType === "1" ? "block" : "none" }}>
        <span>Color del Fondo</span>
        <ColorPicker id="text-colorPicker" value={backGroundColor} onChange={(e) => setBackGroundColor(e.value)} />
      </div>
      <div className="background-selector-subiten-container" style={{ display: backGroundType === "1" ? "block" : "none" }}>
        <span>Trasparencia</span>
        <div >
          <Slider value={transparentValue} onChange={(e) => setTrasparentValue(e.value)} min="0" max="255"/>
        </div>
      </div>

    </div>
  </div>
}
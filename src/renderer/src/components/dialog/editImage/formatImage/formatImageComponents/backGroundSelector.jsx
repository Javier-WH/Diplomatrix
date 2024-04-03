/* eslint-disable no-case-declarations */
import getSVGIcon from "../../../../../icons/iconList"
import { ColorPicker } from 'primereact/colorpicker';
import { Checkbox } from "primereact/checkbox";
import { useState, useEffect, useContext } from "react"
import { MainContext } from "../../../../../contexts/mainContext";
import { Button } from 'primereact/button';


/*
  0 || undefined = no color,
  1 = solid color,
  2 = gradientColor
*/

export default function BackgroundSelector() {

  const { getStyle, getHeader, addHeader, fullEditElemtnt } = useContext(MainContext)
  const [checked, setChecked] = useState(false);
  const [backGroundColor, setBackGroundColor] = useState(null);
  const [backGroundType, setBackGroundType] = useState("0")


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

    switch (type) {
      case "1":
        const color = getStyle("backgroundColor")?.replace("#" , "")
        setBackGroundColor(color)
        break;
    
      default:
        const bgColor = "FFFFFF"
        setBackGroundColor(bgColor)
        setBackGroundType("1")
        break;
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

  
  const handleOnClickGradiant =()=>{
    if (backGroundType === "1"){
      addHeader({ key: "backgroundColor", value: "2" })
      setBackGroundType("2")
    } else if (backGroundType === "2") {
      addHeader({ key: "backgroundColor", value: "1" })
      setBackGroundType("1")
    }
  }

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

      <div className="text-format-main-subiten-border-container" style={{ display: backGroundType === "1" ? "block" : "none" }}>
        <span>Color del Fondo</span>
        <ColorPicker id="text-colorPicker" value={backGroundColor} onChange={(e) => setBackGroundColor(e.value)} />
      </div>

    </div>
  </div>
}
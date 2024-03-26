import getSVGIcon from "../../../../../icons/iconList"
import { ColorPicker } from 'primereact/colorpicker';
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";
import { useState, useEffect, useContext } from "react"
import { MainContext } from "../../../../../contexts/mainContext";

export default function TextBorderSelector() {

  const { selectedElement, addStyle, getStyle } = useContext(MainContext)
  const [checked, setChecked] = useState(false);
  const [borderColor, setBorderColor] = useState();
  const [thickness, setThickness] = useState();

  //vigila cuando se selecciona un elemento y revisa si tiene color o grosor de borde activo
  useEffect(()=>{
    if(selectedElement === null){
      return
    }

    const thickValue = getStyle("WebkitTextStrokeWidth")
    const thick = thickValue ? thickValue.replace("px", "") : 0
    const colorValue = getStyle("WebkitTextStrokeColor")
    const color = colorValue ? colorValue.replace("#", "") : "000000"
    setChecked(thick > 0)
    setThickness(thick)
    setBorderColor(color)
  },[selectedElement])


  //vigila cuando el valor del color del borde cambia y aplica el estilo
  useEffect(()=>{
    if (selectedElement === null || !borderColor){
      return
    }
    
    //const value = checked ? "#" + borderColor : "#000000"
    addStyle({ key: "WebkitTextStrokeColor", value: "#" + borderColor })
  }, [borderColor])


  //vigila cuando el grosor del borde cambia y aplica el estilo
  useEffect(() => {
    if (selectedElement === null) {
      return
    }
    const value = checked ? thickness + 'px' : "0px"
    addStyle({ key: "WebkitTextStrokeWidth", value })
  }, [thickness, checked])


  return <div id='text-format-main-container'>
      <div className='text-format-item-container'>
        <label htmlFor="text-colorPicker">
          <div className='text-format-icon-container'>{getSVGIcon("textBorder")}</div>
          <span>Borde de Letra</span>
        </label>
        <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
      </div>
      <div style={{display: checked ? "block" : "none"}}>

        <div className="text-format-main-subiten-border-container">
          <span>Color del borde</span>
          <ColorPicker id="text-colorPicker" value={borderColor} onChange={(e) => setBorderColor(e.value)} />
        </div>
      <div className="text-format-main-subiten-border-container">
          <span>Grosor del borde</span>
        <Slider style={{ width: "100%" }} value={thickness} onChange={(e) => setThickness(e.value)} className="w-14rem" min={0} max={20} />
        </div>
      </div>
    </div> 
}
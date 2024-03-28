import getSVGIcon from "../../../../../icons/iconList"
import { ColorPicker } from 'primereact/colorpicker';
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";
import { useState, useEffect, useContext } from "react"
import { MainContext } from "../../../../../contexts/mainContext";

export default function TextBorderSelector() {

  const { selectedElement, addStyle, getStyle } = useContext(MainContext)
  const [checked, setChecked] = useState(false);
  const [borderColor, setBorderColor] = useState(null);
  const [thickness, setThickness] = useState(null);
  const [fisrTime, setFirsTime] = useState(false)


  useEffect(()=>{

    if(!checked){
      setBorderColor(null)
      setThickness(null)
      addStyle({ key: "WebkitTextStrokeColor", value: "none" })
      addStyle({ key: "WebkitTextStrokeWidth", value: '0px' })
      setFirsTime(true)
    } else if (fisrTime){
      setBorderColor("000000")
      setThickness("1")
      setFirsTime(false)
    }
  },[checked])


  //vigila cuando se selecciona un elemento y revisa si tiene color o grosor de borde activo
  useEffect(()=>{
    if(selectedElement === null) return

    const thickValue = getStyle("WebkitTextStrokeWidth")
    const colorValue = getStyle("WebkitTextStrokeColor")

    if (thickValue === undefined || thickValue === "none" || colorValue === undefined ){
      setFirsTime(true)
      return
    }

    setFirsTime(false)
    const thick = thickValue.replace("px", "") 
    const color = colorValue.replace("#", "")
    setChecked(thick > 0)
    setThickness(thick)
    setBorderColor(color)
  },[])


  //vigila cuando el valor del color del borde cambia y aplica el estilo
  useEffect(()=>{
    if (borderColor === null ) return
    console.log(borderColor)
    addStyle({ key: "WebkitTextStrokeColor", value: "#" + borderColor })
  }, [borderColor])


  //vigila cuando el grosor del borde cambia y aplica el estilo
  useEffect(() => {
    if (thickness === null) return
    addStyle({ key: "WebkitTextStrokeWidth", value: thickness + 'px' })
  }, [thickness])


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
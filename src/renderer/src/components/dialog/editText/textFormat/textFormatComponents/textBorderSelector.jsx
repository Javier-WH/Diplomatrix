import getSVGIcon from "../../../../../icons/iconList"
import { ColorPicker } from 'primereact/colorpicker';
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";
import { useState, useEffect, useContext } from "react"
import { MainContext } from "../../../../../contexts/mainContext";

export default function TextBorderSelector() {

  const { elements, setElements, selectedElement } = useContext(MainContext)
  const [checked, setChecked] = useState(false);
  const [borderColor, setBorderColor] = useState("#000000");
  const [thickness, setThickness] = useState(1);

  //vigila cuando se selecciona un elemento y revisa si tiene color o grosor de borde activo
  useEffect(()=>{
    if(selectedElement === null){
      return
    }
    const thick = elements[selectedElement].style.WebkitTextStrokeWidth
    if(thick){
      setChecked(true)
    }else{
      setChecked(false)
    }
  
  },[selectedElement])


  //vigila cunado se hace check, agrega un borde por defecto
  useEffect(() => {
    const thick = elements[selectedElement].style.WebkitTextStrokeWidth
    const color = elements[selectedElement].style.WebkitTextStrokeColor
    let _elements = JSON.parse(JSON.stringify(elements));


    if(thick){
      setThickness(thick.replace("px", ""))
      setBorderColor(color.replace("#", ""))
    }else{
      _elements[selectedElement].style.WebkitTextStrokeWidth = '1px';
      _elements[selectedElement].style.WebkitTextStrokeColor = 'black'
    }
    if(!checked){
      _elements[selectedElement].style.WebkitTextStrokeWidth = undefined;

    }
    setElements(_elements)
  }, [checked])

  //vigila cuando el valor del color del borde cambia y aplica el estilo
  useEffect(()=>{
    if(selectedElement === null || !checked){
      return
    }
    let _elements = JSON.parse(JSON.stringify(elements));
    _elements[selectedElement].style.WebkitTextStrokeColor = "#" + borderColor
    setElements(_elements)
  }, [borderColor])

  //vigila cuando el grosor del borde cambia y aplica el estilo
  useEffect(() => {
    if (selectedElement === null || !checked) {
      return
    }
    let _elements = JSON.parse(JSON.stringify(elements));
    _elements[selectedElement].style.WebkitTextStrokeWidth = thickness + 'px';
    setElements(_elements)
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
        <Slider style={{ width: "100%" }} value={thickness} onChange={(e) => setThickness(e.value)} className="w-14rem" min={0} max={10} steps={10} />
        </div>
      </div>
    </div> 
}
import getSVGIcon from "../../../../../icons/iconList"
import { ColorPicker } from 'primereact/colorpicker';
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";
import { useState, useEffect, useContext } from "react"
import { MainContext } from "../../../../../contexts/mainContext";

export default function TextShadowSelector() {

  const { elements, setElements, selectedElement } = useContext(MainContext)
  const [checked, setChecked] = useState(false);
  const [shadowColor, setShadowColor] = useState("000000");
  const [xAxis, setXaxis] = useState(3);
  const [yAxis, setYaxis] = useState(3);
  const [distorcion, setDistorcion] = useState(2);

  
  useEffect(()=>{
    if(selectedElement === null) return
    let _elements = JSON.parse(JSON.stringify(elements));
    let value = checked ? `${xAxis}px ${yAxis}px ${distorcion}px #${shadowColor}` : "none"
    _elements[selectedElement].style["textShadow"] = value
    setElements(_elements)
  }, [checked, xAxis, yAxis, distorcion, shadowColor])

  useEffect(()=>{
    if (selectedElement === null) return
    const shadow = elements[selectedElement].style["textShadow"]
    if(shadow === "none" || shadow === undefined) return
   
    const shadowValues = shadow?.split("px ")
    const [_xAxis, _yAxis, _distorcion, _shadowColor] = shadowValues

    setChecked(true)
    setXaxis(_xAxis)
    setYaxis(_yAxis)
    setDistorcion(_distorcion)
    setShadowColor(_shadowColor.replace("#",""))
    
  },[selectedElement])



  return <div id='text-format-main-container'>
    <div className='text-format-item-container'>
      <label htmlFor="text-colorPicker">
        <div className='text-format-icon-container'>{getSVGIcon("textShadow")}</div>
        <span>Sombra de Letra</span>
      </label>
      <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
    </div>
    <div style={{ display: checked ? "block" : "none" }}>

      <div className="text-format-main-subiten-border-container">
        <span>Color del Sombra</span>
        <ColorPicker id="text-colorPicker" value={shadowColor} onChange={(e) => setShadowColor(e.value)} />

      </div>
      <div className="text-format-main-subiten-border-container">
        <span>Posición horizontal</span>
        <Slider style={{ width: "100%" }} value={xAxis} onChange={(e) => setXaxis(e.value)} className="w-14rem" min={-20} max={20}  />
      </div>

      <div className="text-format-main-subiten-border-container">
        <span>Posición vertical</span>
        <Slider style={{ width: "100%" }} value={yAxis} onChange={(e) => setYaxis(e.value)} className="w-14rem" min={-20} max={20} />
      </div>

      <div className="text-format-main-subiten-border-container">
        <span>Distorción</span>
        <Slider style={{ width: "100%" }} value={distorcion} onChange={(e) => setDistorcion(e.value)} className="w-14rem" min={0} max={20} />
      </div>

    </div>
  </div>
}
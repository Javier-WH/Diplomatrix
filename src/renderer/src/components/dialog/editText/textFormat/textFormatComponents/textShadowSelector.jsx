import getSVGIcon from "../../../../../icons/iconList"
import { ColorPicker } from 'primereact/colorpicker';
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";
import { useState, useEffect, useContext } from "react"
import { MainContext } from "../../../../../contexts/mainContext";

export default function TextShadowSelector() {

  const { elements, setElements, selectedElement } = useContext(MainContext)
  const [checked, setChecked] = useState(false);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [xAxis, setXaxis] = useState(0);
  const [yAxis, setYaxis] = useState(0);
  const [density, setDensity] = useState(0);







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
        <Slider style={{ width: "100%" }} value={xAxis} onChange={(e) => setXaxis(e.value)} className="w-14rem" min={0} max={10} steps={10} />
      </div>

      <div className="text-format-main-subiten-border-container">
        <span>Posición vertical</span>
        <Slider style={{ width: "100%" }} value={yAxis} onChange={(e) => setYaxis(e.value)} className="w-14rem" min={0} max={10} steps={10} />
      </div>

      <div className="text-format-main-subiten-border-container">
        <span>Densidad</span>
        <Slider style={{ width: "100%" }} value={density} onChange={(e) => setDensity(e.value)} className="w-14rem" min={0} max={10} steps={10} />
      </div>

    </div>
  </div>
}
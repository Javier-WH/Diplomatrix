import getSVGIcon from "../../../../../icons/iconList"
import { useState, useEffect, useContext } from "react"
import { MainContext } from "../../../../../contexts/mainContext";
import { Button } from 'primereact/button';
import ColorPicker from 'react-best-gradient-color-picker'
import RangeValue from "../../../../rangeValue/RangeValue";
import "./textShadowSelector.css";

export default function TextShadowSelector() {

  const { addStyle, getStyle } = useContext(MainContext)
  const [shadowColor, setShadowColor] = useState('rgba(255,255,255,1');
  const [fisrtTime, setFisrtTime] = useState(false);
  const [valueY, setValueY] = useState("1") 
  const [valueX, setValueX] = useState("1") 
  const [distorcion, setDistorcion] = useState("1") 

  useEffect(() => {
    if (fisrtTime) {
      addStyle({ key: "textShadow", value: `${valueX}px ${valueY}px ${distorcion}px ${shadowColor}` });
    } else {
      setFisrtTime(true);
    }
  }, [shadowColor, valueY, valueX, distorcion]);

  useEffect(()=>{
    const style = getStyle("textShadow");
    if (style === "none" || style === undefined) return
    const [x, y, d, color] = style.split("px ")
    setValueX(x)
    setValueY(y)
    setDistorcion(d)
    setShadowColor(color)
  },[])

  const handleReset = ()=>{
    addStyle({ key: "textShadow", value: "none" })
  }

  return <div id='text-format-main-container'>
    <div className='text-format-item-container'>
      <label htmlFor="text-colorPicker">
        <div className='text-format-icon-container'>{getSVGIcon("textShadow")}</div>
        <span>Sombra de Texto</span>
      </label>
        <Button icon="pi pi-refresh" rounded text aria-label="Filter" onClick={handleReset}/>
    </div>
    <div>
      <ColorPicker value={shadowColor} onChange={setShadowColor} hidePresets={true} hideColorTypeBtns={true} />
    </div>
    <div style={{paddingTop: "10px"}}>
      <RangeValue value={valueX} setValue={setValueX} min={-80} max={80} title="Posición en el eje X" />
      <RangeValue value={valueY} setValue={setValueY} min={-80} max={80} title="Posición en el eje Y" />
      <RangeValue value={distorcion} setValue={setDistorcion} min={0} max={20} title="Distorción" />
    </div>

  </div>
}
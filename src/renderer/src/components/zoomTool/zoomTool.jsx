import { Slider } from 'primereact/slider';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../contexts/mainContext';
import "./zoom.css"
import { InputNumber } from 'primereact/inputnumber';

export default function ZoomTool() {
  const max = 200;

  const { sheetStyle, setSheetStyle, setScaleAux } = useContext(MainContext)
  const [value, setValue] = useState(sheetStyle?.scale * 100)
  const [focus, setFocus] = useState(false)

  useEffect(() => {
    const scale = `${(value / 100)}`
    setScaleAux(scale)
    setSheetStyle({
      ...sheetStyle,
      scale
    })

  }, [value])



  const inputStyle = {
    width: "65px",
    textAlign: "center",
    border: "1px solid transparent",
    backgroundColor: "var(--surface-color)",
    fontSize: "16px",
    fontWeight: "600",
    color: "var(--primary-color)",
    cursor: "pointer"
  }

  const inputFocusStyle = {
    width: "65px",
    textAlign: "center",
    border: "1px solid var(--primary-color)",
    backgroundColor: "white",
    fontSize: "16px",
    fontWeight: "600",
    color: "var(--primary-color)"
  }

  return <div id='zoomTool-container'>
    <div style={{ height: "30px", width: "165px"}}>
      <InputNumber
        value={value}
        onValueChange={e => setValue(e.value)}
        onFocus={()=>setFocus(true)}
        onBlur={()=>setFocus(false)}
        suffix="%"
        showButtons = {focus}
        inputStyle={focus ? inputFocusStyle : inputStyle}
        style={{ height: "100%" }}
        min={1}
        max={max}
      />
    </div>
    <Slider style={{ width: "100%" }} value={value} onChange={(e) => setValue(e.value)} min={1} max={max} />
  </div>
}
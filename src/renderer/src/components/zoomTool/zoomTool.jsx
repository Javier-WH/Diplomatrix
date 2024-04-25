import { Slider } from 'primereact/slider';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../contexts/mainContext';
import "./zoom.css"

export default function ZoomTool(){

  const { sheetStyle, setSheetStyle, setScaleAux } = useContext(MainContext)
  const [value, setValue] = useState(sheetStyle?.scale * 100)

  useEffect(()=>{
    const scale = `${(value / 100)}`
    setScaleAux(scale)
    setSheetStyle({
      ...sheetStyle,
      scale
    })

  },[value])

  return <div id='zoomTool-container'>
    <span>{value}</span>
    <Slider style={{width: "100%"}} value={value} onChange={(e) => setValue(e.value)} min={1} max={200}/>
  </div> 
}
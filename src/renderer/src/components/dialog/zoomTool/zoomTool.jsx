import { Slider } from 'primereact/slider';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../../contexts/mainContext';
import "./zoom.css"

export default function ZoomTool(){

  const { sheetStyle, setSheetStyle } = useContext(MainContext)
  const [value, setValue] = useState(100)

  useEffect(()=>{
    setValue(sheetStyle.scale * 100)
  },[])

  useEffect(()=>{
    
    let style = JSON.parse(JSON.stringify(sheetStyle));
    style.scale = `${(value / 100)}`
    setSheetStyle(style)

  },[value])

  return <div id='zoomTool-container'>
    <span>{value}</span>
    <Slider style={{width: "100%"}} value={value} onChange={(e) => setValue(e.value)} min={1} max={200}/>
  </div> 
}
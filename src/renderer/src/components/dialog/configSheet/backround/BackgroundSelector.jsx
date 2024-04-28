import ColorPicker from 'react-best-gradient-color-picker'
import { Button } from 'primereact/button';
import { useState, useContext, useEffect } from 'react';
import { MainContext } from '../../../../contexts/mainContext';
import "./backgroundSelector.css"

export default function BackgroundSelector(){

  const { sheetStyle, setSheetStyle } = useContext(MainContext)
  const [backgroundColor, setBackgroundColor] = useState(sheetStyle?.background ?? "white");

  useEffect(()=>{

    setSheetStyle({
      ...sheetStyle,
      background: backgroundColor
    })

  },[backgroundColor])


  const handleReset = ()=>{
    setSheetStyle({
      ...sheetStyle,
      background: "white"
    })
  }

  const customLocales = {
    CONTROLS: {
      SOLID: 'Sólido',
      GRADIENT: 'Gradiente',
    }
  }
  return <div id='sheet-backgrond-color-selector-container'>
    <div>
      <span>Color de Fondo</span>
      <Button icon="pi pi-refresh" rounded text aria-label="Filter" onClick={handleReset} />
    </div>
    <ColorPicker value={backgroundColor} onChange={setBackgroundColor} hidePresets={true} locales={customLocales} hideOpacity = {true} />
  </div>
}
import getSVGIcon from "../../../../../icons/iconList"
import { useState, useEffect, useContext } from "react"
import { MainContext } from "../../../../../contexts/mainContext";
import { Button } from 'primereact/button';
import ColorPicker from 'react-best-gradient-color-picker'
import "./backGroundSelector.css";

export default function BackgroundSelector() {

  const { addStyle, getStyle } = useContext(MainContext)
  const [backgroundColor, setBackgroundColor] = useState('rgba(255,255,255,1');
  const [fisrtTime, setFisrtTime] = useState(false);

  const customLocales = {
    CONTROLS: {
      SOLID: 'Sólido',
      GRADIENT: 'Gradiente',
    }
  }


  useEffect(() => {
    if (fisrtTime) {
      addStyle({ key: "background", value: backgroundColor });
    } else {
      setFisrtTime(true);
    }
  }, [backgroundColor]);

  useEffect(()=>{
    const style = getStyle("background");
    if (style === "transparent") return
    setBackgroundColor(style)
  },[])

  const handleReset = ()=>{
    addStyle({ key: "background", value: "transparent" })
  }

  return <div id='text-format-main-container'>
    <div className='text-format-item-container'>
      <label htmlFor="text-colorPicker">
        <div className='text-format-icon-container'>{getSVGIcon("backGroudColor")}</div>
        <span>Fondo</span>
      </label>
        <Button icon="pi pi-refresh" rounded text aria-label="Filter" onClick={handleReset}/>
    </div>
    <div>
      <ColorPicker value={backgroundColor} onChange={setBackgroundColor} hidePresets={true} locales={customLocales} />
    </div>

  </div>
}

//width={120} height={100} hideInputs={true} hideColorTypeBtns={true} hideAdvancedSliders={true} hideColorGuide= {true}
import getSVGIcon from "../../../../../icons/iconList"
import { useState, useEffect, useContext } from "react"
import { MainContext } from "../../../../../contexts/mainContext";
import { Button } from 'primereact/button';
import ColorPicker from 'react-best-gradient-color-picker'
import "./backGroundSelector.css";

export default function TextColorSelector() {

  const { addStyle, getStyle } = useContext(MainContext)
  const [textColor, setTextColor] = useState('rgba(255,255,255,1');
  const [fisrtTime, setFisrtTime] = useState(false);

  const customLocales = {
    CONTROLS: {
      SOLID: 'Sólido',
      GRADIENT: 'Gradiente',
    }
  }


  useEffect(() => {
    if (fisrtTime) {
      addStyle({ key: "color", value: textColor });
    } else {
      setFisrtTime(true);
    }
  }, [textColor]);

  useEffect(()=>{
    const style = getStyle("color");
    if (style === "transparent") return
    setTextColor(style)
  },[])

  const handleReset = ()=>{
    addStyle({ key: "color", value: "#000" })
  }

  return <div id='text-format-main-container'>
    <div className='text-format-item-container'>
      <label htmlFor="text-colorPicker">
        <div className='text-format-icon-container'>{getSVGIcon("textColor")}</div>
        <span>Color del Texto</span>
      </label>
        <Button icon="pi pi-refresh" rounded text aria-label="Filter" onClick={handleReset}/>
    </div>
    <div>

      <ColorPicker value={textColor} onChange={setTextColor} hidePresets={true} hideColorTypeBtns={true} locales={customLocales} />
    </div>

  </div>
}
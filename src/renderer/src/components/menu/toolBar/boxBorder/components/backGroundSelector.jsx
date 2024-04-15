import getSVGIcon from "../../../../../icons/iconList"
import { useState, useEffect, useContext, useRef } from "react"
import { MainContext } from "../../../../../contexts/mainContext";
import { Button } from 'primereact/button';
import ColorPicker from 'react-best-gradient-color-picker'
import RangeValue from "../../../../rangeValue/RangeValue";
import { OverlayPanel } from 'primereact/overlaypanel';
//import OverlayColorPicker from "../../../../overlayColorPicker/overlayColorPicker";
import "./boxBorderSelector.css";

export default function BoxBorderSelector() {

  const op = useRef(null);
  const { addStyle, getStyle } = useContext(MainContext)
  const [BorderColor, setBorderColor] = useState('rgba(255,255,255,1');
  const [BrderWidth, setBorderWidth] = useState('1');
  const [BorderType, setBorderType] = useState("solid")
  const [fisrtTime, setFisrtTime] = useState(false);

  // const [color, setColor] = useState()


  const customLocales = {
    CONTROLS: {
      SOLID: 'Sólido',
      GRADIENT: 'Gradiente',
    }
  }

  useEffect(() => {
    if (fisrtTime) {
      addStyle({ key: "border", value: `${BrderWidth}px ${BorderType} ${BorderColor}` });
    } else {
      setFisrtTime(true);
    }
  }, [BorderColor, BrderWidth, BorderType]);

  useEffect(() => {
    const style = getStyle("border");
    if (style === "border") return

    const borderParts = style.split(' ');
    const borderWidth = borderParts[0].replace("px", "");
    const borderType = borderParts[1];
    const borderColor = borderParts.slice(2).join(' ');

    setBorderColor(borderColor);
    setBorderWidth(borderWidth);
    setBorderType(borderType);
    
  }, [])

  const handleReset = () => {
    addStyle({ key: "border", value: "none" })
  }

  const handleBorderStyle = (value)=>{
    setBorderType(value)
    op.current.hide();

  }

  return <div id='text-format-main-container'>
    <div className='text-format-item-container'>
      <label htmlFor="text-colorPicker">
        <div className='text-format-icon-container'>{getSVGIcon("border")}</div>
        <span>Borde</span>
      </label>
      <Button icon="pi pi-refresh" rounded text aria-label="Filter" onClick={handleReset} />
    </div>
    <div >
      <ColorPicker value={BorderColor} onChange={setBorderColor} hidePresets={true} locales={customLocales} />
      <br />
      <RangeValue value={BrderWidth} setValue={setBorderWidth} title="Grosor" />
       <br />
      <Button type="button" icon={getSVGIcon("borderStyle")} label="Estilo" onClick={(e) => op.current.toggle(e)} />
      <OverlayPanel ref={op}>
        <div value="none"  className="border-style-option" onClick={()=>handleBorderStyle("none")}>None</div>
        <div value="hidden" className="border-style-option" onClick={()=>handleBorderStyle("hidden")}>Hidden</div>
        <div value="dotted" className="border-style-option" onClick={()=>handleBorderStyle("dotted")}>Dotted</div>
        <div value="dashed" className="border-style-option" onClick={()=>handleBorderStyle("dashed")}>Dashed</div>
        <div value="solid" className="border-style-option" onClick={()=>handleBorderStyle("solid")}>Solid</div>
        <div value="double" className="border-style-option" onClick={()=>handleBorderStyle("double")}>Double</div>
        <div value="groove" className="border-style-option" onClick={()=>handleBorderStyle("groove")}>Groove</div>
        <div value="ridge" className="border-style-option" onClick={()=>handleBorderStyle("ridge")}>Ridge</div>
        <div value="inset" className="border-style-option" onClick={()=>handleBorderStyle("inset")}>Inset</div>
        <div value="outset" className="border-style-option" onClick={()=>handleBorderStyle("outset")}>Outset</div>
      </OverlayPanel>
    </div>

  </div>
}

//      <OverlayColorPicker color={color} setColor={setColor}/>
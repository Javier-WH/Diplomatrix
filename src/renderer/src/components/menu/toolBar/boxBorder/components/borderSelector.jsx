import getSVGIcon from "../../../../../icons/iconList"
import { useState, useEffect, useContext } from "react"
import { MainContext } from "../../../../../contexts/mainContext";
import { Button } from 'primereact/button';
import ColorPicker from 'react-best-gradient-color-picker'
import RangeValue from "../../../../rangeValue/RangeValue";
import BorderStyleSelector from "./borderStyleSelector/borderStyleSelector";

//import OverlayColorPicker from "../../../../overlayColorPicker/overlayColorPicker";
import "./boxBorderSelector.css";

export default function BoxBorderSelector() {


  const { addStyle, getStyle } = useContext(MainContext)
  const [BorderColor, setBorderColor] = useState('rgba(0,0,0,1');
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

    if (!style) return

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



  return <div id='text-format-main-container'>
    <div className='text-format-item-container'>
      <label htmlFor="text-colorPicker">
        <div className='text-format-icon-container'>{getSVGIcon("border")}</div>
        <span>Borde</span>
      </label>
      <Button icon="pi pi-refresh" rounded text aria-label="Filter" onClick={handleReset} />
    </div>
    <div >
      <ColorPicker value={BorderColor} onChange={setBorderColor} hidePresets={true} hideColorTypeBtns={true}  locales={customLocales} />
      <br />

      <RangeValue value={BrderWidth} setValue={setBorderWidth} title="Grosor" />
      <br />
      <BorderStyleSelector BorderType={BorderType} setBorderType={setBorderType} />

    </div>

  </div>
}

//      <OverlayColorPicker color={color} setColor={setColor}/>
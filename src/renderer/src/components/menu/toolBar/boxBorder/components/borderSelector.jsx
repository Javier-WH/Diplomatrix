import getSVGIcon from "../../../../../icons/iconList"
import { useState, useEffect, useContext } from "react"
import { MainContext } from "../../../../../contexts/mainContext";
import { Button } from 'primereact/button';
import ColorPicker from 'react-best-gradient-color-picker'
import RangeValue from "../../../../rangeValue/RangeValue";
import BorderStyleSelector from "./borderStyleSelector/borderStyleSelector";
import OverlayColorPicker from "../../../../overlayColorPicker/overlayColorPicker";
import "./boxBorderSelector.css";

export default function BoxBorderSelector() {


  const { addStyle, getStyle, deleteStyle, fullEditElemtnt } = useContext(MainContext);
  const [BorderColor, setBorderColor] = useState('rgba(0,0,0,1');
  const [BrderWidth, setBorderWidth] = useState('1');
  const [BorderType, setBorderType] = useState("solid");
  const [fisrtTime, setFisrtTime] = useState(false);
  const [globalBoder, setGlobalBorder] = useState(true);

  //individual border styles

  const [topBorderColor, setTopBorderColor] = useState('rgba(0,0,0,1');
  const [rightBorderColor, setRightBorderColor] = useState('rgba(0,0,0,1');
  const [leftBorderColor, setLeftBorderColor] = useState('rgba(0,0,0,1');
  const [bottonBorderColor, setBottonBorderColor] = useState('rgba(0,0,0,1');
  const [BrderTopWidth, setBorderTopWidth] = useState('1');
  const [BrderRightWidth, setBorderRightWidth] = useState('1');
  const [BrderLeftWidth, setBorderLeftWidth] = useState('1');
  const [BrderBottonWidth, setBorderBottonWidth] = useState('1');
  const [BorderTopType, setBorderTopType] = useState("solid");
  const [BorderRightType, setBorderRightType] = useState("solid");
  const [BorderLeftType, setBorderLeftType] = useState("solid");
  const [BorderBottonType, setBorderBottonType] = useState("solid");



  const customLocales = {
    CONTROLS: {
      SOLID: 'Sólido',
      GRADIENT: 'Gradiente',
    }
  }

  useEffect(() => {
    if(!globalBoder) return
    if (fisrtTime) {
      addStyle({ key: "border", value: `${BrderWidth}px ${BorderType} ${BorderColor}` });
    } else {
      setFisrtTime(true);
    }
  }, [BorderColor, BrderWidth, BorderType, globalBoder]);

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
    deleteStyle(["borderTop", "borderLeft", "borderRight", "borderBottom", "border"]);
  }

  useEffect(()=>{
    if(fisrtTime) return

    if(globalBoder){
      deleteStyle(["borderTop", "borderLeft", "borderRight", "borderBottom"]);
    }else{
      deleteStyle(['border'])
    }

  },[globalBoder]);


  useEffect(() => { 
    if (globalBoder) return

    if (fisrtTime) {
      const style = {
        borderTop: `${BrderTopWidth}px ${BorderTopType} ${topBorderColor}`,
        borderLeft: `${BrderLeftWidth}px ${BorderLeftType} ${leftBorderColor}`,
        borderRight: `${BrderRightWidth}px ${BorderRightType} ${rightBorderColor}`,
        borderBottom: `${BrderBottonWidth}px ${BorderBottonType} ${bottonBorderColor}`,
      }
      fullEditElemtnt({style})
    } else {
      setFisrtTime(true);
    }



  }, [topBorderColor, BrderTopWidth, BorderTopType,
    rightBorderColor, BrderRightWidth, BorderRightType,
    leftBorderColor, BrderLeftWidth, BorderLeftType,
    bottonBorderColor, BrderBottonWidth, BorderBottonType])


  return <div id='text-format-main-container'>
    <div className='text-format-item-container'>
      <label htmlFor="text-colorPicker">
        <div className='text-format-icon-container'>{getSVGIcon("border")}</div>
        <span>Borde</span>
      </label>
      <Button icon={globalBoder ? "pi pi-star-fill" : "pi pi-star"} rounded text aria-label="Filter" onClick={() => setGlobalBorder(!globalBoder)} />
      <Button icon="pi pi-refresh" rounded text aria-label="Filter" onClick={handleReset} />
    </div>
    {
      globalBoder
        ? <div>
          <ColorPicker value={BorderColor} onChange={setBorderColor} hidePresets={true} hideColorTypeBtns={true} locales={customLocales} />
          <br />
          <RangeValue value={BrderWidth} setValue={setBorderWidth} title="Grosor" />
          <br />
          <BorderStyleSelector BorderType={BorderType} setBorderType={setBorderType} />
        </div>
        : <div>
          <div className="border-item-container">
            <span>Borde Superior</span>
            <div>
              <BorderStyleSelector BorderType={BorderTopType} setBorderType={setBorderTopType} />
              <OverlayColorPicker color={topBorderColor} setColor={setTopBorderColor} />
            </div>
            <RangeValue value={BrderTopWidth} setValue={setBorderTopWidth} title="Grosor" />
          </div>
          
          <div className="border-item-container">
            <span>Borde Izquierdo</span>
            <div>
              <BorderStyleSelector BorderType={BorderLeftType} setBorderType={setBorderLeftType} />
              <OverlayColorPicker color={leftBorderColor} setColor={setLeftBorderColor} />
            </div>
            <RangeValue value={BrderLeftWidth} setValue={setBorderLeftWidth} title="Grosor" />
          </div>

          <div className="border-item-container">
            <span>Borde Derecho</span>
            <div>
              <BorderStyleSelector BorderType={BorderRightType} setBorderType={setBorderRightType} />
              <OverlayColorPicker color={rightBorderColor} setColor={setRightBorderColor} />
            </div>
            <RangeValue value={BrderRightWidth} setValue={setBorderRightWidth} title="Grosor" />
          </div>

          <div className="border-item-container"> 
            <span>Borde Inferior</span>
            <div>
              <BorderStyleSelector BorderType={BorderBottonType} setBorderType={setBorderBottonType} />
              <OverlayColorPicker color={bottonBorderColor} setColor={setBottonBorderColor} />
            </div>
            <RangeValue value={BrderBottonWidth} setValue={setBorderBottonWidth} title="Grosor" />
          </div>

        </div>

        
    }


  </div>
}


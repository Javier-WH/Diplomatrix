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


  const { addStyle, getStyle, deleteStyle, fullEditElemtnt, getHeader, addHeader} = useContext(MainContext);
  const [BorderColor, setBorderColor] = useState('rgba(0,0,0,1');
  const [BrderWidth, setBorderWidth] = useState(1);
  const [BorderType, setBorderType] = useState("solid");
  const [fisrtTime, setFisrtTime] = useState(false);
  const [globalBoder, setGlobalBorder] = useState(true);

  //individual border styles
  const [BorderTopColor, setBorderTopColor] = useState('rgba(0,0,0,1');
  const [BorderRightColor, setBorderRightColor] = useState('rgba(0,0,0,1');
  const [BorderLeftColor, setBorderLeftColor] = useState('rgba(0,0,0,1');
  const [BorderBottonColor, setBorderBottonColor] = useState('rgba(0,0,0,1');
  const [BrderTopWidth, setBorderTopWidth] = useState(1);
  const [BrderRightWidth, setBorderRightWidth] = useState(1);
  const [BrderLeftWidth, setBorderLeftWidth] = useState(1);
  const [BrderBottonWidth, setBorderBottonWidth] = useState(1);
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
      setBorderTopColor(BorderColor)
      setBorderLeftColor(BorderColor)
      setBorderRightColor(BorderColor)
      setBorderBottonColor(BorderColor)
      setBorderTopWidth(BrderWidth)
      setBorderLeftWidth(BrderWidth)
      setBorderRightWidth(BrderWidth)
      setBorderBottonWidth(BrderWidth)
      setBorderTopType(BorderType)
      setBorderLeftType(BorderType)
      setBorderRightType(BorderType)
      setBorderBottonType(BorderType)

      addStyle({ key: "border", value: `${BrderWidth}px ${BorderType} ${BorderColor}` });
    } else {
      setFisrtTime(true);
    }
  }, [BorderColor, BrderWidth, BorderType, globalBoder]);

  
  useEffect(() => {
    const type = getHeader("globalBoder");

    if(type === true || type === undefined){
      setGlobalBorder(true)
      const style = getStyle("border");
      if (!style) return
      
      const borderParts = style.split(' ');
      const borderWidth = borderParts[0].replace("px", "");
      const borderType = borderParts[1];
      const borderColor = borderParts.slice(2).join(' ');
      
      setBorderColor(borderColor);
      setBorderWidth(borderWidth);
      setBorderType(borderType);
    }else if(type === false){
      setGlobalBorder(false)

      const borderTopStyle = getStyle("borderTop");
      const borderLeftStyle = getStyle("borderLeft");
      const borderRightStyle = getStyle("borderRight");
      const borderBottonStyle = getStyle("borderBottom");

      if(borderTopStyle){
        const borderTopParts = borderTopStyle.split(' ');
        const borderTopWidth = borderTopParts[0].replace("px", "");
        const borderTopType = borderTopParts[1];
        const borderTopColor = borderTopParts.slice(2).join(' ');
        
        setBorderTopColor(borderTopColor);
        setBorderTopWidth(borderTopWidth);
        setBorderTopType(borderTopType);
      }

      if (borderLeftStyle){
        const borderLeftParts = borderLeftStyle.split(' ');
        const borderLeftWidth = borderLeftParts[0].replace("px", "");
        const borderLeftType = borderLeftParts[1];
        const borderLeftColor = borderLeftParts.slice(2).join(' ');
        
        setBorderLeftColor(borderLeftColor);
        setBorderLeftWidth(borderLeftWidth);
        setBorderLeftType(borderLeftType);
      }

      if (borderRightStyle){ 
        const borderRightParts = borderRightStyle.split(' ');
        const borderRightWidth = borderRightParts[0].replace("px", "");
        const borderRightType = borderRightParts[1];
        const borderRightColor = borderRightParts.slice(2).join(' ');
        
        setBorderRightColor(borderRightColor);
        setBorderRightWidth(borderRightWidth);
        setBorderRightType(borderRightType);
      }

      if (borderBottonStyle){
        const borderBottonParts = borderBottonStyle.split(' ');
        const borderBottonWidth = borderBottonParts[0].replace("px", "");
        const borderBottonType = borderBottonParts[1];
        const borderBottonColor = borderBottonParts.slice(2).join(' ');
        
        setBorderBottonColor(borderBottonColor);
        setBorderBottonWidth(borderBottonWidth);
        setBorderBottonType(borderBottonType);
      }
    }

  }, [])

  const handleReset = () => {
    const stylesToDelete = !globalBoder ? 
      ["borderTop", "borderLeft", "borderRight", "borderBottom"] : 
      ['border'];

    setGlobalBorder(true)
    deleteStyle(stylesToDelete.filter(style => getStyle(style) !== null));
    
  }

  useEffect(()=>{
    if(!fisrtTime) return
    addHeader({ key: "globalBoder", value: globalBoder})
  },[globalBoder]);


  useEffect(() => { 
    if (globalBoder) return

    if (fisrtTime) {
      const style = {
        borderTop: `${BrderTopWidth}px ${BorderTopType} ${BorderTopColor}`,
        borderLeft: `${BrderLeftWidth}px ${BorderLeftType} ${BorderLeftColor}`,
        borderRight: `${BrderRightWidth}px ${BorderRightType} ${BorderRightColor}`,
        borderBottom: `${BrderBottonWidth}px ${BorderBottonType} ${BorderBottonColor}`,
      }
      fullEditElemtnt({style})
    } else {
      setFisrtTime(true);
    }



  }, [BorderTopColor, BrderTopWidth, BorderTopType,
    BorderRightColor, BrderRightWidth, BorderRightType,
    BorderLeftColor, BrderLeftWidth, BorderLeftType,
    BorderBottonColor, BrderBottonWidth, BorderBottonType])


  return <div id='text-format-main-container'>
    <div className='text-format-item-container'>
      <label htmlFor="text-colorPicker">
        <div className='text-format-icon-container'>{getSVGIcon("border")}</div>
        <span>Borde</span>
      </label>
      <Button icon={!globalBoder ? "pi pi-star-fill" : "pi pi-star"} rounded text aria-label="Filter" onClick={() => setGlobalBorder(!globalBoder)} />
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
              <OverlayColorPicker color={BorderTopColor} setColor={setBorderTopColor} />
            </div>
            <RangeValue value={BrderTopWidth} setValue={setBorderTopWidth} title="Grosor" />
          </div>
          
          <div className="border-item-container">
            <span>Borde Izquierdo</span>
            <div>
              <BorderStyleSelector BorderType={BorderLeftType} setBorderType={setBorderLeftType} />
              <OverlayColorPicker color={BorderLeftColor} setColor={setBorderLeftColor} />
            </div>
            <RangeValue value={BrderLeftWidth} setValue={setBorderLeftWidth} title="Grosor" />
          </div>

          <div className="border-item-container">
            <span>Borde Derecho</span>
            <div>
              <BorderStyleSelector BorderType={BorderRightType} setBorderType={setBorderRightType} />
              <OverlayColorPicker color={BorderRightColor} setColor={setBorderRightColor} />
            </div>
            <RangeValue value={BrderRightWidth} setValue={setBorderRightWidth} title="Grosor" />
          </div>

          <div className="border-item-container"> 
            <span>Borde Inferior</span>
            <div>
              <BorderStyleSelector BorderType={BorderBottonType} setBorderType={setBorderBottonType} />
              <OverlayColorPicker color={BorderBottonColor} setColor={setBorderBottonColor} />
            </div>
            <RangeValue value={BrderBottonWidth} setValue={setBorderBottonWidth} title="Grosor" />
          </div>

        </div>

        
    }


  </div>
}


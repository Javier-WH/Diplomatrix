import getSVGIcon from "../../../../../icons/iconList"
import { ColorPicker } from 'primereact/colorpicker';
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";
import { Dropdown } from 'primereact/dropdown';
import { useState, useEffect, useContext } from "react"
import { MainContext } from "../../../../../contexts/mainContext";
import { Button } from 'primereact/button';


export default function BorderSelector() {
  
  const styles = [
    { name: 'Interrumpido', code: 'dashed' },
    { name: 'Puntos', code: 'dotted' },
    { name: 'Doble', code: 'double' },
    { name: 'Groove', code: 'groove' },
    { name: 'Solido', code: 'solid' },
    { name: 'Rigido', code: 'ridge' }
  ];

  const { selectedElement, addStyle, getStyle, addStyles } = useContext(MainContext)
  const [checked, setChecked] = useState(false);
  const [borderColor, setBorderColor] = useState(null);
  const [borderStyle, setBorderStyle] = useState(null);
  const [borderWidth, setBorderWidth] = useState(null);
  const [borderLeft, setBorderLeft] = useState(false);
  const [borderRight, setBorderRight] = useState(false);
  const [borderTop, setBorderTop] = useState(false);
  const [borderBottom, setBorderBottom] = useState(false);
  const [fisrTime, setFirsTime] = useState(true)

 

  useEffect(()=>{



    if (checked && borderWidth === null) {
      
      setBorderColor("000")
      setBorderStyle({ name: 'Solido', code: 'solid' })
      setBorderWidth("1")
      setBorderLeft(true)
      setBorderRight(true)
      setBorderBottom(true)
      setBorderTop(true)
      setFirsTime(false)
      //esto corrige un bug, que causa que solo se muestr el borde izquierdo en ciertas situaciones
      const value = '1px solid #000'
      addStyles([
        { key: "borderLeft", value},
        { key: "borderRight", value },
        { key: "borderTop", value },
        { key: "borderBottom", value}
      ])
      //
    } else if (!fisrTime) {
      if(!checked){
        setFirsTime(true)
        setBorderWidth(null)
        addStyles([
          { key: "borderLeft", value: "none" },
          { key: "borderRight", value: "none" },
          { key: "borderTop", value: "none" },
          { key: "borderBottom", value: "none" }
        ])
      }
    }else{
      
      setFirsTime(false)
    
    }

  }, [checked])

 

  useEffect(()=>{
    if(selectedElement === null) return

    const borderLeftData = getStyle("borderLeft")
    const borderRightData = getStyle("borderRight")
    const borderTopData = getStyle("borderTop")
    const borderBottomData = getStyle("borderBottom")

    //revisa el bode izquierdo
    if(borderLeftData !== undefined && borderLeftData !== "none"){
 
      setChecked(true)
      setBorderLeft(true)
      
      if (borderColor === null && borderWidth === null && borderStyle ===null){
        const [width, style, color] = borderLeftData.split(" ")
        setBorderColor(color.replace("#", ""))
        setBorderWidth(width.replace("px", ""))
        setBorderStyle(styles.find(_style => _style.code === style))
        
      }
    }else{
      setBorderLeft(false)
    }

    //revisa el bode derecho
    if (borderRightData !== undefined && borderRightData !== "none") {

      setChecked(true)
      setBorderRight(true)

      if (borderColor === null && borderWidth === null && borderStyle === null) {
        const [width, style, color] = borderRightData.split(" ")
        setBorderColor(color.replace("#", ""))
        setBorderWidth(width.replace("px", ""))
        setBorderStyle(styles.find(_style => _style.code === style))
      }
    }else{
      setBorderRight(false)
    }

    //revisa el bode arriba
    if (borderTopData !== undefined && borderTopData !== "none") {
    
      setChecked(true)
      setBorderTop(true)

      if (borderColor === null && borderWidth === null && borderStyle === null) {
        const [width, style, color] = borderTopData.split(" ")
        setBorderColor(color.replace("#", ""))
        setBorderWidth(width.replace("px", ""))
        setBorderStyle(styles.find(_style => _style.code === style))
      }
    } else {
      setBorderTop(false)
    }


    //revisa el bode abajo
    if (borderBottomData !== undefined && borderBottomData !== "none") {
 
      setChecked(true)
      setBorderBottom(true)

      if (borderColor === null && borderWidth === null && borderStyle === null) {
        const [width, style, color] = borderBottomData.split(" ")
        setBorderColor(color.replace("#", ""))
        setBorderWidth(width.replace("px", ""))
        setBorderStyle(styles.find(_style => _style.code === style))
      }
    } else {
      setBorderBottom(false)
    }
    

  
  },[])

  


  //aplica los estilos de borde
  useEffect(()=>{
    if (borderColor === null || borderWidth === null || borderStyle === null) return

    const value = `${borderWidth}px ${borderStyle.code} #${borderColor}`;
    let styleList = [];
  
    if(borderLeft){
      styleList.push({ key: "borderLeft", value })

    }
    
    if (borderRight) {
      styleList.push({ key: "borderRight", value })

    }
    
    if (borderTop) {
      styleList.push({ key: "borderTop", value })

    }

    if (borderBottom) {
      styleList.push({ key: "borderBottom", value })
    }

    addStyles(styleList) 
  }, [borderColor, borderWidth, borderStyle])


  //agrega o elimina el borde de abajo
  useEffect(()=>{
    if (borderColor === null || borderWidth === null || borderStyle === null) return

    let value = `${borderWidth}px ${borderStyle.code} #${borderColor}`;

    if(!borderBottom){
      value = "none"
    }
    
    addStyle({ key: "borderBottom", value})  
    
  },[borderBottom])

  //agrega o elimina el borde derecho
  useEffect(() => {
    if (borderColor === null || borderWidth === null || borderStyle === null) return

    let value = `${borderWidth}px ${borderStyle.code} #${borderColor}`;

    if (!borderRight) {
      value = "none"
    }

    addStyle({ key: "borderRight", value })

  }, [borderRight])

  //agrega o elimina el borde de arriba
  useEffect(() => {
    if (borderColor === null || borderWidth === null || borderStyle === null) return

    let value = `${borderWidth}px ${borderStyle.code} #${borderColor}`;

    if (!borderTop) {
      value = "none"
    }

    addStyle({ key: "borderTop", value })

  }, [borderTop])

  //agrega o elimina el borde izquierdo
  useEffect(() => {
    if (borderColor === null || borderWidth === null || borderStyle === null) return

    let value = `${borderWidth}px ${borderStyle.code} #${borderColor}`;

    if (!borderLeft) {
      value = "none"
    }

    addStyle({ key: "borderLeft", value })

  }, [borderLeft])


  return <div id='text-format-main-container'>
    <div className='text-format-item-container'>
      <label htmlFor="text-colorPicker">
        <div className='text-format-icon-container'>{getSVGIcon("border")}</div>
        <span>Borde</span>
      </label>
      <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
    </div>

    <div style={{ display: checked ? "block" : "none" }}>
      <div className="text-format-main-subiten-check-container">
        <div>
          <Button icon={getSVGIcon("borderLeft")} rounded aria-label="Filter" severity={!borderLeft ? "secondary" : ""} onClick={() => setBorderLeft(!borderLeft)} />
        </div>
        <div>
          <Button icon={getSVGIcon("borderRight")} rounded aria-label="Filter" severity={!borderRight ? "secondary" : ""} onClick={() => setBorderRight(!borderRight)} />
        </div>
        <div>
          <Button icon={getSVGIcon("borderTop")} rounded aria-label="Filter" severity={!borderTop ? "secondary" : ""} onClick={() => setBorderTop(!borderTop)} />

        </div>
        <div>
          <Button icon={getSVGIcon("borderBottom")} rounded aria-label="Filter" severity={!borderBottom ? "secondary" : ""} onClick={() => setBorderBottom(!borderBottom)} />
        </div>
      </div>
    </div>

  

    <div style={{ display: checked ? "block" : "none" }}>
      <div className="text-format-main-subiten-border-container">
        <span>Color del borde</span>
        <ColorPicker id="text-colorPicker" value={borderColor} onChange={(e) => setBorderColor(e.value)} />
      </div>
    </div>


    <div style={{ display: checked ? "block" : "none" }}>
      <div className="text-format-main-subiten-border-container">
        <span>Grosor del borde</span>
        <Slider style={{ width: "100%" }} value={borderWidth} onChange={(e) => setBorderWidth(e.value)} className="w-14rem" min={0} max={100} />
      </div>
    </div>
    <div style={{ display: checked ? "block" : "none" }}>
      <div className="text-format-main-subiten-border-container">
        <span>Estilo de borde</span>
        <Dropdown value={borderStyle} onChange={(e) => setBorderStyle(e.value)} options={styles} optionLabel="name"
          placeholder="Selecciona un estilo" className="w-full md:w-14rem" />
      </div>
    </div>
  </div>
}
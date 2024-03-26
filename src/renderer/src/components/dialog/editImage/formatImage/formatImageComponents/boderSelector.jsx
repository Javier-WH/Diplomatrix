import getSVGIcon from "../../../../../icons/iconList"
import { ColorPicker } from 'primereact/colorpicker';
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";
import { Dropdown } from 'primereact/dropdown';
import { useState, useEffect, useContext } from "react"
import { MainContext } from "../../../../../contexts/mainContext";


/* 
  border-width: 1px;
  border-style: solid;
  border-color: aqua;
 */
export default function BorderSelector() {
  
  const styles = [
    { name: 'Interrumpido', code: 'dashed' },
    { name: 'Puntos', code: 'dotted' },
    { name: 'Doble', code: 'double' },
    { name: 'Groove', code: 'groove' },
    { name: 'Solido', code: 'solid' },
    { name: 'Rigido', code: 'ridge' }
  ];

  const { selectedElement, addStyle, getStyle } = useContext(MainContext)
  const [checked, setChecked] = useState(false);
  const [borderColor, setBorderColor] = useState(null);
  const [borderStyle, setBorderStyle] = useState(null);
  const [borderWidth, setBorderWidth] = useState(null);
  const [fisrTime, setFirsTime] = useState(false)
  

  useEffect(()=>{
     if(!checked){
      setBorderColor(null)
      setBorderStyle(null)
      setBorderWidth(null)
      addStyle({ key: "border", value: "none" })
      setFirsTime(true)
    }else if(fisrTime){
      setBorderColor("000000")
      setBorderStyle({ name: 'Solido', code: 'solid' })
      setBorderWidth("1")
      setFirsTime(false)
    }
  },[checked])


 //si hay un elemento seleccionado, muestra cual estilo de borde tiene aplicado
  useEffect(()=>{
    if(selectedElement === null) return
    const currentBorder = getStyle("border")
    
    if(currentBorder === undefined || currentBorder === "none"){
      setFirsTime(true)
      return
    } 
      
    setFirsTime(false)
    setChecked(true)
    const borderValues = currentBorder?.split(" ")
    const [width, style, color] = borderValues
    const _style = styles.find(item => item.code === style)
    setBorderWidth(width.replace("px", ""))
    setBorderStyle(_style)
    setBorderColor(color.replace("#", ""))
  },[])



  //aplica los estilos de borde
  useEffect(()=>{
    if (!borderColor || !borderStyle || !borderWidth) return
    addStyle(
      {
        key:"border",
        value: `${borderWidth}px ${borderStyle.code} #${borderColor}`
      }
    )
  }, [borderColor, borderWidth, borderStyle])


  return <div id='text-format-main-container'>
    <div className='text-format-item-container'>
      <label htmlFor="text-colorPicker">
        <div className='text-format-icon-container'>{getSVGIcon("border")}</div>
        <span>Borde</span>
      </label>
      <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
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
import getSVGIcon from "../../../../../icons/iconList"
import { ColorPicker } from 'primereact/colorpicker';
import { Checkbox } from "primereact/checkbox";
import { useState, useEffect, useContext } from "react"
import { MainContext } from "../../../../../contexts/mainContext";


export default function BackgroundSelector() {

  const { selectedElement, addStyle, getStyle } = useContext(MainContext)
  const [checked, setChecked] = useState(false);
  const [backGroundColor, setBackGroundColor] = useState(null);
  const [fisrTime, setFirsTime] = useState(false)

  useEffect(() => {

    if (!checked) {
      setBackGroundColor(null)
      addStyle({ key: "backgroundColor", value: "transparent" })
      setFirsTime(true)
    } else if (fisrTime) {
      setBackGroundColor("FFFFFF")
      setFirsTime(false)
    }

  }, [checked])



  useEffect(()=>{
    if(selectedElement === null) return
    const currentBackgroundColor = getStyle("backgroundColor")

    if (currentBackgroundColor === undefined || currentBackgroundColor === "transparent"){
      setFirsTime(true)
      return
    }

    setFirsTime(false)
    setChecked(true)
    setBackGroundColor(currentBackgroundColor.replace("#", ""))

  },[])



  useEffect(() => {
    if (!backGroundColor) return
    addStyle({ key: "backgroundColor", value: "#" + backGroundColor })
  }, [backGroundColor])


  return <div id='text-format-main-container'>
    <div className='text-format-item-container'>
      <label htmlFor="text-colorPicker">
        <div className='text-format-icon-container'>{getSVGIcon("backGroudColor")}</div>
        <span>Fondo</span>
      </label>
      <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
    </div>
    <div style={{ display: checked ? "block" : "none" }}>
      <div className="text-format-main-subiten-border-container">
        <span>Color del Fondo</span>
        <ColorPicker id="text-colorPicker" value={backGroundColor} onChange={(e) => setBackGroundColor(e.value)} />
      </div>

    </div>
  </div>
}
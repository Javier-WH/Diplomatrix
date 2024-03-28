import getSVGIcon from "../../../../../icons/iconList"
import { ColorPicker } from 'primereact/colorpicker';
import { useState, useEffect, useContext } from "react"
import { MainContext } from "../../../../../contexts/mainContext";

export default function TextColorSelector(){

  const { elements, selectedElement, addStyle } = useContext(MainContext)
  const [textColor, setTextColor] = useState(null);

  useEffect(() => {
    if (selectedElement === null) {
      return
    }
    const color = elements[selectedElement].style.color
 
    if (color) {
      setTextColor(color.replace("#", ""))
    }else{
      setTextColor("000000")
    }

  }, [selectedElement])


  useEffect(() => {
    if (!textColor) {
      return
    }
    addStyle({ key: "color", value: "#" + textColor })

  }, [textColor])

  return <div id='text-format-main-container'>
    <div className='text-format-item-container'>
      <label htmlFor="text-colorPicker">
        <div className='text-format-icon-container'>{getSVGIcon("textColor")}</div>
        <span>Color del texto</span>
      </label>
      <ColorPicker id="text-colorPicker" value={textColor} onChange={(e) => setTextColor(e.value)} />
    </div>
  </div>
}
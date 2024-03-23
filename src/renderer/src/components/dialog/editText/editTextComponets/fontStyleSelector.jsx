import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../../contexts/mainContext";
import getSVGIcon from "../../../../icons/iconList";
import { Button } from 'primereact/button';
import './editTextStyles.css'


export default function FontStyleSelector() {
  const { elements, setElements, selectedElement } = useContext(MainContext)

  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [disabled, setDisabled] = useState(false)


  useEffect(() => {
    if (selectedElement === null) {
      setDisabled(true)
      return
    }

    if (elements[selectedElement]?.header?.type === 'txt') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }


  }, [selectedElement])



  useEffect(() => {
    if (selectedElement === null || disabled || elements[selectedElement]?.header?.type !== 'txt') {
      return
    }
    let _elements = JSON.parse(JSON.stringify(elements));
    _elements[selectedElement].style["fontWeight"] =  bold ? 900 : 400
    _elements[selectedElement].style["fontStyle"] = italic ? "italic" : "normal"
    _elements[selectedElement].style["textDecoration"] = underline ? "underline" : "none"
    setElements(_elements)

  }, [bold, italic, underline])

  const handleBold = () => {
    setBold(!bold)
  }
  const handleItalic = () => {
    setItalic(!italic)
  }
  const handleUnderline = () =>{
    setUnderline(!underline)
  }

  return <div id="font-size-button-container">
    <Button icon={getSVGIcon("bold")} aria-label="Filter" disabled={disabled} onClick={handleBold} />
    <Button icon={getSVGIcon("italic")} aria-label="Filter" disabled={disabled} onClick={handleItalic} />
    <Button icon={getSVGIcon("underline")} aria-label="Filter" disabled={disabled} onClick={handleUnderline} />
   
  </div>

}
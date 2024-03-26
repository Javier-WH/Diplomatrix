import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../../contexts/mainContext";
import getSVGIcon from "../../../../icons/iconList";
import { Button } from 'primereact/button';
import './editTextStyles.css'


export default function FontStyleSelector() {
  const { elements, selectedElement, addStyle } = useContext(MainContext)

  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [disabled, setDisabled] = useState(false)


  //maneja cuando se selecciona un texto
  useEffect(() => {
    if (selectedElement === null) {
      setBold(false)
      setItalic(false)
      setUnderline(false)
      setDisabled(true)
      return
    }

    if (elements[selectedElement]?.header?.type === 'txt') {
      let style =  elements[selectedElement].style
      setBold(style.fontWeight === 900)
      setItalic(style.fontStyle === "italic")
      setUnderline(style.textDecoration === "underline")
      setDisabled(false)
    } else {
      setDisabled(true)
    }


  }, [selectedElement])


  //agrega subrayado al texto
  useEffect(() => {
    if (selectedElement === null || disabled || elements[selectedElement]?.header?.type !== 'txt') {
      return
    }
    addStyle({ key: "textDecoration", value: underline ? "underline" : "none" })
  }, [underline])

  //agrega subrayado al negrita
  useEffect(() => {
    if (selectedElement === null || disabled || elements[selectedElement]?.header?.type !== 'txt') {
      return
    }
    addStyle({ key: "fontWeight", value: bold ? 900 : 400 })
  }, [bold])

  //agrega subrayado al cursiva
  useEffect(() => {
    if (selectedElement === null || disabled || elements[selectedElement]?.header?.type !== 'txt') {
      return
    }
    addStyle({ key: "fontStyle", value: italic ? "italic" : "normal" })
  }, [italic])



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
    <Button icon={getSVGIcon("bold")} aria-label="Filter" severity={bold ? "secondary" : "primary"} disabled={disabled} onClick={handleBold} />
    <Button icon={getSVGIcon("italic")} aria-label="Filter" severity={italic ? "secondary" : "primary"} disabled={disabled} onClick={handleItalic} />
    <Button icon={getSVGIcon("underline")} aria-label="Filter" severity={underline ? "secondary" : "primary"} disabled={disabled} onClick={handleUnderline} />
   
  </div>

}
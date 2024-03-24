import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../../contexts/mainContext";
import getSVGIcon from "../../../../icons/iconList";
import { Button } from 'primereact/button';
import './editTextStyles.css'


export default function FontAligmentSelector() {
  const { elements, setElements, selectedElement } = useContext(MainContext)

  const [alignLeft, setAlignLeft] = useState(false);
  const [alignCenter, setAlignCenter] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const [disabled, setDisabled] = useState(false)


  //maneja cuando se selecciona un texto
  useEffect(() => {
    if (selectedElement === null) {
      setAlignLeft(false)
      setAlignCenter(false)
      setAlignRight(false)
      setDisabled(true)
      return
    }

    if (elements[selectedElement]?.header?.type === 'txt') {
      let style = elements[selectedElement].style
      setAlignLeft(style.textAlign === "left")
      setAlignCenter(style.textAlign === "center")
      setAlignRight(style.textAlign === "right")
      setDisabled(false)
    } else {
      setDisabled(true)
    }


  }, [selectedElement])


  //agrega los efectos al texto
  useEffect(() => {
    if (selectedElement === null || disabled || elements[selectedElement]?.header?.type !== 'txt') {
      return
    }

    let aling = "left"
    if (alignCenter){
      aling = "center"
    }
    if (alignRight) {
      aling = "right"
    }

    let _elements = JSON.parse(JSON.stringify(elements));
    _elements[selectedElement].style["textAlign"] = aling
    setElements(_elements)

  }, [alignLeft, alignCenter, alignRight])



  const handleAlignLeft = () => {
    setAlignLeft(true)
    setAlignCenter(false)
    setAlignRight(false)
  }
  const handleAlignCenter = () => {
    setAlignLeft(false)
    setAlignCenter(true)
    setAlignRight(false)
  }
  const handleAlignRight = () => {
    setAlignLeft(false)
    setAlignCenter(false)
    setAlignRight(true)
  }

  return <div id="font-size-button-container">
    <Button icon={getSVGIcon("alignLeft")} aria-label="Filter" severity={alignLeft ? "secondary" : "primary"} disabled={disabled} onClick={handleAlignLeft} />
    <Button icon={getSVGIcon("alignCenter")} aria-label="Filter" severity={alignCenter ? "secondary" : "primary"} disabled={disabled} onClick={handleAlignCenter} />
    <Button icon={getSVGIcon("alignRight")} aria-label="Filter" severity={alignRight ? "secondary" : "primary"} disabled={disabled} onClick={handleAlignRight} />

  </div>

}
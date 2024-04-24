
import { useState, useEffect, useContext } from "react";
import { MainContext } from "../../../contexts/mainContext";
import useFontList from "../../../hooks/useFontList";
import { Button } from 'primereact/button';
import "./nativeFontlist.css"
import "./fontSelector.css"

export default function FontSelector() {

  const { selectedElement, addStyle, getStyle, getHeader } = useContext(MainContext)
  const list = useFontList()
  const [fontList, setFontList] = useState([])
  const [selectedFont, setSelectedFont] = useState(null);
  const [disabled, setDisabled] = useState(false)
  const [show, setShow] = useState(false)

  //agrega la lista de fuentes cuando son recibidas
  useEffect(() => {
    setFontList(list ?? [])
  }, [list]);


  //agrega el tipo de fuente al texto
  useEffect(() => {
    if (selectedElement === null || disabled || getHeader("type") !== "txt") {
      setShow(false)
      return
    }
    addStyle({ key: "fontFamily", value: selectedFont })
  }, [selectedFont])

  //
  useEffect(() => {
    if (selectedElement === null || getHeader("type") !== "txt") {
      setSelectedFont(null)
      setDisabled(true)
      return
    }
    setSelectedFont(getStyle("fontFamily") ?? "Arial")
    setDisabled(false)

  }, [selectedElement])


  const handleClick =(font)=>{
   setSelectedFont(font)
   setShow(false)
  }


  //evento para cerrar la ventana cuanso se presione escape
  useEffect(()=>{
    const cleanShow = (e) =>{
      if(e.key === "Escape"){
        setShow(false)
      }

    }
    const eventListener = (event) => cleanShow(event)

    if(show){
      window.addEventListener("keydown", eventListener)
    }

    return ()=>{
      window.removeEventListener("keydown", eventListener)
    }
  },[show])



  return <div id="font-list-main-container">
    <Button label={selectedFont?.replaceAll("\"", "") ?? "Selecciona un Texto"} id="font-list-button" onClick={()=> setShow(!show)} disabled = {disabled}/>
    <div id="font-list-container" className={show ? "" : "fontHidden"}>
      {
        fontList.map(font =>
          <div 
            key={font} 
            onClick={()=>handleClick(font)}
            className="font-list-fontOpion"
            style={{ fontFamily: font}}
          >
            {font.replaceAll("\"", "")}
          </div>
        )
      }

    </div>
  </div>
  
}




import { useState, useEffect, useContext } from "react";
import { Dropdown } from 'primereact/dropdown';
const { ipcRenderer } = window.require('electron');
import { MainContext } from "../../../../contexts/mainContext";

export default function FontSelector() {

  const { elements, selectedElement, addStyle } = useContext(MainContext)
  const [selectedFont, setSelectedFont] = useState(null);
  const [fontList, setFontList] = useState([])
  const [disabled, setDisabled] = useState(false)



  useEffect(() => {
    if(selectedElement === null || disabled){
      return
    }
    if (elements[selectedElement]?.header?.type !== 'txt') {
      return
    }
    addStyle({ key: "fontFamily", value: selectedFont?.name })
  }, [selectedFont])

  useEffect(() => { 
    if(selectedElement === null){
      setSelectedFont(null)
      setDisabled(true)
      return
    }
    if (elements[selectedElement]?.header?.type === 'txt'){
      const fontName = elements[selectedElement]?.style.fontFamily
   
        setSelectedFont({
          name: fontName,
          code: fontName
        })
      setDisabled(false)
    }else{
      setSelectedFont(null)
      setDisabled(true)
    }


  }, [selectedElement])



  useEffect(() => {
    ipcRenderer.send('getFontList');
  }, []);

  useEffect(() => {
    const handleFontList = (event, fonts) => {
      
      const list = fonts.map(font => {return { name: font, code: font }})
      setFontList(list)
    };

    ipcRenderer.on('fontsList', handleFontList);

    return () => {
      ipcRenderer.removeListener('fontsList', handleFontList);
    };
  }, []);

  return (
    <div className="card flex justify-content-start" >
      <Dropdown value={selectedFont} onChange={(e) => { setSelectedFont(e.value)} } options={fontList} optionLabel="name"
        placeholder="Selecciona una fuete" className="w-full md:w-14rem" style={{ width: '100%', maxWidth: "350px", minWidth: "350px" }} disabled={disabled}/>
    </div>
  )
}


import { useState, useEffect, useContext } from "react";
import { Dropdown } from 'primereact/dropdown';
const { ipcRenderer } = window.require('electron');
import { MainContext } from "../../../../contexts/mainContext";

export default function FontSelector() {

  const [selectedFont, setSelectedFont] = useState(null);
  const [fontList, setFontList] = useState([])
  const { elements, selectedElement } = useContext(MainContext)

  useEffect(() => {
    const selectedAsset = elements[selectedElement]
    if(!selectedAsset){
      return
    }
    if (selectedAsset?.header?.type !== 'txt') {
      return
    }
    const previusStyle = selectedAsset.style;
    const newStyle = {
      ...previusStyle,
      fontFamily: selectedFont.name
    }
    elements[selectedElement].style = newStyle

  }, [selectedFont])



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
    <div className="card flex justify-content-start">
      <Dropdown value={selectedFont} onChange={(e) => { setSelectedFont(e.value)} } options={fontList} optionLabel="name"
        placeholder="Selecciona una fuete" className="w-full md:w-14rem" style={{ width: '100%', maxWidth:"350px" }} />
    </div>
  )
}

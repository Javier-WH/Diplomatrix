
import { useState, useEffect, useContext } from "react";
const { ipcRenderer } = window.require('electron');
import { MainContext } from "../../../contexts/mainContext";
import NativeFontList from "./nativeFontList";
import "./nativeFontlist.css"

export default function FontSelector() {

  const { elements, selectedElement, addStyle } = useContext(MainContext)
  const [selectedFont, setSelectedFont] = useState(null);
  const [fontList, setFontList] = useState([])
  const [disabled, setDisabled] = useState(false)



  useEffect(() => {
    if (selectedElement === null || disabled) {
      return
    }
    if (elements[selectedElement]?.header?.type !== 'txt') {
      return
    }
    addStyle({ key: "fontFamily", value: selectedFont?.name })
  }, [selectedFont])

  useEffect(() => {
    if (selectedElement === null) {
      setSelectedFont(null)
      setDisabled(true)
      return
    }
    if (elements[selectedElement]?.header?.type === 'txt') {
      const fontName = elements[selectedElement]?.style.fontFamily

      setSelectedFont({
        name: fontName,
        code: fontName
      })
      setDisabled(false)
    } else {
      setSelectedFont(null)
      setDisabled(true)
    }


  }, [selectedElement])



  useEffect(() => {


  }, []);


  useEffect(() => {
    ipcRenderer.send('getFontList');
  }, []);

  useEffect(() => {
    const handleFontList = (event, fonts) => {

      const list = fonts.map(font => { return { name: font, code: font } })
      console.log(list)
      const nativeList = NativeFontList();
      const fullList = [
        ...nativeList,
        ...(list ?? null),
      ]
      setFontList(fullList)
    };

    ipcRenderer.on('fontsList', handleFontList);

    return () => {
      ipcRenderer.removeListener('fontsList', handleFontList);
    };
  }, []);

  return (
    <div >
      <select
        value={selectedFont?.name ?? ''}
        onChange={(e) => setSelectedFont(fontList.find(font => font.name === e.target.value))}
        style={{ width: '300px', height: "45px", fontSize: '1rem' }}
        disabled={disabled}
      >
        {fontList.map(font =>
          <option
            key={font.name}
            value={font.name}
            style={{ fontFamily: font.name, maxWidth: "300px", fontSize: '1rem', overflow: "hidden" }}

          >

            {font.name !== '"Angel wish"' && font.name !== "Amer" && font.name !== "AmericanTypewriter" ? font.name : null}


          </option>)
        }
      </select>
    </div>
  )
}

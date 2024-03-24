import { useRef, useState, useContext, useEffect } from 'react';
import { MainContext } from '../../../../contexts/mainContext';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import getSVGIcon from '../../../../icons/iconList';
import { ColorPicker } from 'primereact/colorpicker';
import "./textFormat.css"

export default function TextFormat() {
  const op = useRef(null);
  const { elements, setElements, selectedElement } = useContext(MainContext)
  const [disabled, setDisabled] = useState(false)

  const [textColor, setTextColor] = useState(null);

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

  useEffect(()=>{
    if(!textColor){
      return
    }
    let _elements = JSON.parse(JSON.stringify(elements));
    _elements[selectedElement].style.color = "#"+textColor
    setElements(_elements)

  },[textColor])

  return (
    <div className="card flex justify-content-center">
      <Button type="button" icon={getSVGIcon("textFormat")} onClick={(e) => op.current.toggle(e)}  disabled = {disabled}/>
      <OverlayPanel ref={op}>
        <div id='text-format-main-container'>
          <div className='text-format-item-container'>
            <label htmlFor="text-colorPicker">
              <div className='text-format-icon-container'>{getSVGIcon("textColor")}</div>
              <span>Color del texto</span>
            </label>
            <ColorPicker id="text-colorPicker" value={textColor} onChange={(e) => setTextColor(e.value)} />
          </div>

        </div>
      </OverlayPanel>
    </div>
  );
}
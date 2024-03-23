import { useRef, useState, useContext, useEffect } from 'react';
import { MainContext } from '../../../../contexts/mainContext';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import getSVGIcon from '../../../../icons/iconList';

export default function TextFormat() {
  const op = useRef(null);
  const { elements, selectedElement } = useContext(MainContext)
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


  return (
    <div className="card flex justify-content-center">
      <Button type="button" icon={getSVGIcon("textFormat")} onClick={(e) => op.current.toggle(e)}  disabled = {disabled}/>
      <OverlayPanel ref={op}>
        hola
      </OverlayPanel>
    </div>
  );
}
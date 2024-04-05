import { useRef, useState, useContext, useEffect } from 'react';
import { MainContext } from '../../../../contexts/mainContext.jsx';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import getSVGIcon from "../../../../icons/iconList.jsx"
import TextColorSelector from './components/textColorSelector.jsx'




export default function TextColorOverlay() {
  const op = useRef(null);
  const { selectedElement, elements } = useContext(MainContext)
  const [disabled, setDisabled] = useState(false)



  useEffect(() => {
    const type = elements[selectedElement]?.header.type
    if (selectedElement === null || type !== "txt") {
      op.current.hide()
      setDisabled(true)
      return
    }
    setDisabled(false)
  }, [selectedElement])




  return (
    <div className="card flex justify-content-center">
      <Button type="button" icon={getSVGIcon("textColor")} onClick={(e) => op.current.toggle(e)} disabled={disabled} />
      <OverlayPanel ref={op}>
        <TextColorSelector /> 
      </OverlayPanel>
    </div>
  );
}
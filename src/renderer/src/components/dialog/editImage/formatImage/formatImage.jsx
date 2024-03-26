import { useRef, useState, useContext, useEffect } from 'react';
import { MainContext } from '../../../../contexts/mainContext';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import getSVGIcon from "../../../../icons/iconList.jsx"
import BackGroundColorSelector from './formatImageComponents/backGroundSelector.jsx';
import BorderSelector from './formatImageComponents/boderSelector.jsx';



export default function FormatImage() {
  const op = useRef(null);
  const { selectedElement} = useContext(MainContext)
  const [disabled, setDisabled] = useState(false)



  useEffect(() => {
    if (selectedElement === null) {
      op.current.hide()
      setDisabled(true)
      return
    }
    setDisabled(false)
  }, [selectedElement])




  return (
    <div className="card flex justify-content-center">
      <Button type="button" icon={getSVGIcon("formatImage")} onClick={(e) => op.current.toggle(e)} disabled={disabled} />
      <OverlayPanel ref={op}>
        <BackGroundColorSelector />
        <BorderSelector/>
      </OverlayPanel>
    </div>
  );
}
import { useRef, useState, useContext, useEffect } from 'react';
import { MainContext } from '../../../../contexts/mainContext.jsx';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import getSVGIcon from "../../../../icons/iconList.jsx"
import MoveZindex from './components/moveZindex.jsx';
import SetPosition from './components/setPosition.jsx';

export default function EditPosition() {
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
      <Button type="button" icon={getSVGIcon("position")} onClick={(e) => op.current.toggle(e)} disabled={disabled} />
      <OverlayPanel ref={op}>
          <MoveZindex/>
          <br />
          <SetPosition/>
      </OverlayPanel>
    </div>
  );
}
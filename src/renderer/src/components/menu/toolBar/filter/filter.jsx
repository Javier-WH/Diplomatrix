import { useRef, useState, useContext, useEffect } from 'react';
import { MainContext } from '../../../../contexts/mainContext.jsx';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import getSVGIcon from "../../../../icons/iconList.jsx"
import FilterSelector from './components/filterSelector.jsx';


export default function Filter() {
  const op = useRef(null);
  const { selectedElement } = useContext(MainContext)
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
      <Button type="button" icon={getSVGIcon("filter")} onClick={(e) => op.current.toggle(e)} disabled={disabled} />
      <OverlayPanel ref={op}>
          <FilterSelector/>
      </OverlayPanel>
    </div>
  );
}
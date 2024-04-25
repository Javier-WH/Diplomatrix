import { Dialog } from 'primereact/dialog';
import { MenuContext } from '../../../../contexts/menuContext';
import { useContext } from 'react';
import SheetSize from '../sheetSize/SheetSize';
import OrientationSelector from '../orientation/Orientation';
import BackgroundSelector from '../backround/BackgroundSelector';

export default function SheetSizeDialog(){

  const { showConfigSheet, setShowConfigSheet } = useContext(MenuContext)

  return(

    <Dialog header="Configuración de la Hoja"
      visible={showConfigSheet}
      style={{ width: '70vw', height: "70vh" }}
      onHide={() => setShowConfigSheet(false)}
      maximizable
      maximized={true}
      baseZIndex="9999999999999999"
    >
      <div id="config-sheet-main-container">
        <div id="config-sheet-main-container-sub">
          <SheetSize />
          <OrientationSelector />
        </div>
        <BackgroundSelector />
      </div>
    </Dialog>
  )
}
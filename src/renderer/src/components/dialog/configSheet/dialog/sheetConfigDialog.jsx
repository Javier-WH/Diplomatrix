import { Dialog } from 'primereact/dialog';
import { MenuContext } from '../../../../contexts/menuContext';
import { useContext } from 'react';
import SheetSize from '../sheetSize/SheetSize';
import OrientationSelector from '../orientation/Orientation';
import BackgroundSelector from '../backround/BackgroundSelector';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';

export default function SheetSizeDialog() {

  const { showConfigSheet, setShowConfigSheet } = useContext(MenuContext)

  return (

    <Dialog header="Configuración de la Hoja"
      visible={showConfigSheet}
      closable={false}
      maximized={true}
      baseZIndex="9999999999999999"
  
      draggable = {false}

    >
      <div className="card" id='tabPanel'>
        <TabView>
          <TabPanel header="Configuración">
            <div id="config-sheet-main-container">
              <div id="config-sheet-main-container-sub">
                <SheetSize />
                <OrientationSelector />
              </div>
              <BackgroundSelector />
            </div>
          </TabPanel>

          <TabPanel header="Plantillas">
            <p className="m-0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
              eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
              enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
              ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
          </TabPanel>
 
        </TabView>
  
      </div>
      <div id='config-sheet-dialog-button-container'>
        <Button label="Aceptar" icon="pi pi-check" onClick={() => setShowConfigSheet(false)} />
      </div>
      
    </Dialog>
  )
}

/*
<div id="config-sheet-main-container">
        <div id='config-sheet-dialog-button-container'>
          <Button label="Aceptar" icon="pi pi-check" onClick={() => setShowConfigSheet(false)} />
        </div>
        <div id="config-sheet-main-container-sub">
          <SheetSize />
          <OrientationSelector />
        </div>
        <BackgroundSelector />
      </div>
*/

import { useContext } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { MenuContext } from "../../../contexts/menuContext";
import SheetSize from "./sheetSize/SheetSize";
import OrientationSelector from "./orientation/Orientation";
import BackgroundSelector from "./backround/BackgroundSelector";
import getSVGIcon from "../../../icons/iconList";
import "./configSheet.css"

export default function ConfigSheet() {
  const { showConfigSheet, setShowConfigSheet } = useContext(MenuContext)


  return (
    <div className="card flex justify-content-center" style={{ zIndex: "99999999999999999" }}>
      <Button icon={getSVGIcon("textFormat")} onClick={() => setShowConfigSheet(true)} />
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
    </div>
  )
}

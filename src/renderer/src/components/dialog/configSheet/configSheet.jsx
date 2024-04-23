
import {useContext} from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { MenuContext } from "../../../contexts/menuContext";
import SheetSize from "./sheetSize/SheetSize";
import getSVGIcon from "../../../icons/iconList";


export default function ConfigSheet() {
  const { showConfigSheet, setShowConfigSheet } = useContext(MenuContext)


  return (
    <div className="card flex justify-content-center">
      <Button icon={getSVGIcon("textFormat")} onClick={() => setShowConfigSheet(true)} />
      <Dialog header="Configuración de la Hoja" visible={showConfigSheet} style={{ width: '70vw', height: "70vh"}} onHide={() => setShowConfigSheet(false)} maximizable>
        <SheetSize/>
      </Dialog>
    </div>
  )
}

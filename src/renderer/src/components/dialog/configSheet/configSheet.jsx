
import { useContext } from "react";
import { Button } from 'primereact/button';
import { MenuContext } from "../../../contexts/menuContext";
import getSVGIcon from "../../../icons/iconList";
import "./configSheet.css"
export default function ConfigSheet() {
  const {setShowConfigSheet } = useContext(MenuContext)


  return (
    <div className="card flex justify-content-center" style={{ zIndex: "99999999999999999" }}>
      <Button icon={getSVGIcon("textFormat")} onClick={() => setShowConfigSheet(true)} />
    </div>
  )
}

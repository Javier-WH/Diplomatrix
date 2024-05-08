import { useContext } from "react";
import getSVGIcon from "../../../icons/iconList";
import { Button } from 'primereact/button';
import { MenuContext } from "../../../contexts/menuContext";

export default function InsertImageButton() {
  const { setShowInsertImage, showInsertImage, closeAllDialogs  } = useContext(MenuContext)


  const handleClick = () => {
    closeAllDialogs()
    setShowInsertImage(!showInsertImage)
  }

  return <Button icon={getSVGIcon("insertImage")} aria-label="Filter" onClick={handleClick} style={{ minWidth: "40px"}}/>

}
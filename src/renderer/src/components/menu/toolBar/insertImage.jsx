import { useContext } from "react";
import getSVGIcon from "../../../icons/iconList";
import { Button } from 'primereact/button';
import { MenuContext } from "../../../contexts/menuContext";

export default function InsertImageButton() {
  const { setShowInsertImage, showInsertImage } = useContext(MenuContext)


  const handleClick = () => {
    setShowInsertImage(!showInsertImage)
  }

  return <Button icon={getSVGIcon("insertImage")} aria-label="Filter" onClick={handleClick} />

}
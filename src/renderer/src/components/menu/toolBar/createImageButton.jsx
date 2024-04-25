import getSVGIcon from "../../../icons/iconList";
import { Button } from 'primereact/button';
import { MainContext } from "../../../contexts/mainContext";
import { MenuContext } from "../../../contexts/menuContext";
import { useContext} from "react";

export default function CreateImageButton(){

  const { sheetRef, setSelectedElement, sheetStyle, setSheetStyle } = useContext(MainContext)
  const { setShowGenerateImg } = useContext(MenuContext)


  
  const handleClick = ()=>{
    if (sheetRef === null) return
    setSelectedElement(null)
    setSheetStyle({
      ...sheetStyle,
      scale: "1"
    })
    setShowGenerateImg(true)
  }

  return <Button icon={getSVGIcon("addImg")} aria-label="Filter" onClick={handleClick} />
}
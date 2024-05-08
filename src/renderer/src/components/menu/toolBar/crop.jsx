import getSVGIcon from "../../../icons/iconList";
import { Button } from 'primereact/button';
import { MenuContext } from "../../../contexts/menuContext";
import { MainContext } from "../../../contexts/mainContext";
import { useContext, useEffect, useState } from "react";

export default function Crop() {
  const { showCrop, setShowCrop, closeAllDialogs } = useContext(MenuContext)
  const { elements, selectedElement } = useContext(MainContext)
  const [diabled, setDisabled] = useState(false)

  useEffect(() => {
    const isTxtType = selectedElement === null || elements[selectedElement]?.header?.type === "txt";
    setDisabled(isTxtType);
  }, [selectedElement]);

  const handleClick = () => {
    closeAllDialogs()
    setShowCrop(!showCrop)
  }

  return <Button icon={getSVGIcon("crop")} aria-label="Filter" onClick={handleClick} disabled={diabled} />
}
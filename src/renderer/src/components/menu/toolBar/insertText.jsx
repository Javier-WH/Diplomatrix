import { useContext } from "react";
import getSVGIcon from "../../../icons/iconList";
import { Button } from 'primereact/button';
import { MainContext } from "../../../contexts/mainContext";

export default function InsertTextButton(){

  const { setNewElemntData } = useContext(MainContext);

  const handleClick =()=>{
    setNewElemntData({
      content: "Dobleclick para modificar el texto",
      imageWidth: 280,
      imageHeight: 25,
      type: "txt",
    })
  }

  return <Button icon={getSVGIcon("insertText")} aria-label="Filter" onClick={handleClick} />

}
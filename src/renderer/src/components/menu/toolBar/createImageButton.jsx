import getSVGIcon from "../../../icons/iconList";
import { Button } from 'primereact/button';
import { MainContext } from "../../../contexts/mainContext";
import { MenuContext } from "../../../contexts/menuContext";
import { useContext} from "react";
//import html2canvas from "html2canvas";

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
    /*
    setRefreshScale(true)

    //el timeout sirve para que se pueda limpiar el selectedElement antes de crear la imagen
    const timer = setTimeout(() => {
      const options = {
        scale: 15
      };
      html2canvas(sheetRef.current, options).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "image.png";
        link.click();
      })
    }, 50);

    return () => clearTimeout(timer);*/
  }



  return <Button icon={getSVGIcon("addImg")} aria-label="Filter" onClick={handleClick} />
  //return <Button icon={getSVGIcon("addImg")} aria-label="Filter" onClick={() => setShowGenerateImg(true)} />

}
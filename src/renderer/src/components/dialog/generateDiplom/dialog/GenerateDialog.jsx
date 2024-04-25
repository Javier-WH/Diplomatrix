import { Dialog } from 'primereact/dialog';
import { MenuContext } from '../../../../contexts/menuContext';
import { MainContext } from '../../../../contexts/mainContext';
import { useContext, useState } from 'react';
import Quality from '../quality/Quality';
import Format from '../format/Format';
import { Button } from 'primereact/button';
import html2canvas from "html2canvas";
//import puppeteer from 'puppeteer-core';
import "../generate.css"


export default function GenerateImgDialog() {

  const { sheetRef } = useContext(MainContext)
  const { showGenerateImg, setShowGenerateImg } = useContext(MenuContext)
  const [quality, setQuality] = useState(1);
  const [format, setFormat] = useState("JPEG");

  const handleGenerate = async () => {
    try {
      const options = {
        scale: 15,
        allowTaint: true,
        logging: false,
        useCORS: true
      };
      const canvas = await html2canvas(sheetRef.current, options);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "image.png";
      link.click();
    } catch(err) {
      console.error("Error generating image:", err);
    }
  }



  return (
    <Dialog header="Generar Imagen"
      visible={showGenerateImg}
      style={{ width: '300px', height: "400px" }}
      onHide={() => setShowGenerateImg(false)}
      maximizable
      maximized={false}
      baseZIndex="9999999999999999"
    >
      <div id='generate-imaagen-selector-container'>
        <Quality quality={quality} setQuality={setQuality} />
        <Format format={format} setFormat={setFormat} />
        <Button label="Generar" icon="pi pi-image" onClick={handleGenerate}/>
      </div>
    </Dialog>
  )
}
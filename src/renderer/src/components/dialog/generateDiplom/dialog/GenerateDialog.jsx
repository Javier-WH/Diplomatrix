import { Dialog } from 'primereact/dialog';
import { MenuContext } from '../../../../contexts/menuContext';
import { MainContext } from '../../../../contexts/mainContext';
import { useContext, useState } from 'react';
import Quality from '../quality/Quality';
import Format from '../format/Format';
import { Button } from 'primereact/button';
import "../generate.css";
import domtoimage from 'dom-to-image-more';


export default function GenerateImgDialog() {

  const { sheetRef, scaleAux, sheetStyle, setSheetStyle } = useContext(MainContext)
  const { showGenerateImg, setShowGenerateImg } = useContext(MenuContext)
  const [quality, setQuality] = useState(1);
  const [format, setFormat] = useState("toJpeg");


  function handleGenerate() {
    const filter = (node) => node.tagName !== 'i';

    domtoimage
    [format](sheetRef.current, { quality, filter })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'Diploma';
        link.href = dataUrl;
        link.click();
      });

      closeDialog();
  };

 

  const closeDialog = () => {
    //corrije un bug que causa que la imagen generada no tenga el tama;o correcto
    setTimeout(() => {
      setSheetStyle({
        ...sheetStyle,
        scale: scaleAux
      })
      setShowGenerateImg(false)
    }, 200);
  }

  return (
    <Dialog header=""
      visible={showGenerateImg}
      closable={false}
      onHide={closeDialog}
      maximized={true}
      baseZIndex="9999999999999999"
    >
      <div id='generate-imaagen-selector-container'>
        <h2>Generar Imagen</h2>
        <Quality quality={quality} setQuality={setQuality} />
        <Format format={format} setFormat={setFormat} />
        <div style={{ display: "flex", gap: "20px" }}>
          <Button label="Cancelar" icon="pi pi-times-circle" severity='danger' onClick={closeDialog} style={{ width: "150px" }} />
          <Button label="Generar" icon="pi pi-image" onClick={handleGenerate} style={{ width: "150px" }} />
        </div>
      </div>
    </Dialog>
  )
}
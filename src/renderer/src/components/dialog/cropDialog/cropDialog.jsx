import { Dialog } from 'primereact/dialog';
import { MenuContext } from '../../../contexts/menuContext';
import { useContext, useEffect, useState } from 'react';
import CropTool from './cropTool/CropTool';
import { MainContext } from '../../../contexts/mainContext';

export default function ShowCropDialog() {

  const { showCrop, setShowCrop } = useContext(MenuContext)
  const {elements, selectedElement} = useContext(MainContext)
  const [src, setSrc] = useState(null)

  useEffect(()=>{
    if(selectedElement === null)return
    setSrc(elements[selectedElement].header.image)
  },[selectedElement])


  return (
    <Dialog header="Cortar Imagen"
      visible={showCrop}
      closable={false}
      maximized={true}
      baseZIndex="9999999999999999"
      draggable={false}

    >
     <div id='crop-dialog-container'>
      <div id='crop-dialog-croptool-container'>
        <CropTool src={src} setShowCrop={setShowCrop}/>
      </div>
      
     </div>
    </Dialog>
  )
}

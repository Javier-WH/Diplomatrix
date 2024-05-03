import { useContext, useEffect, useRef, useState } from 'react'
import ReactCrop from 'react-image-crop'
import PropTypes from "prop-types"
import 'react-image-crop/dist/ReactCrop.css'
import { Button } from 'primereact/button';
import canvasPreview from './canvasPreview';
import { MainContext } from '../../../../contexts/mainContext';
import "./cropTool.css"
import { Checkbox } from "primereact/checkbox";

export default function CropTool({ src, setShowCrop }) {

  const { elements, setElements, selectedElement, setSelectedElement } = useContext(MainContext)
  const [crop, setCrop] = useState()
  const [checked, setChecked] = useState(false);
  const [aspect, setAspect] = useState(0)
  const imageRef = useRef(null)

  const onCrop = () => {
    if (!crop) return
    setSelectedElement(null)
    const canvas = document.createElement('canvas');
    canvasPreview(imageRef.current, canvas, crop)
    const imageBase64 = canvas.toDataURL();
    const _elements = JSON.parse(JSON.stringify(elements))
    const element = _elements[selectedElement]
    element.header.image = imageBase64
    element.style.width = crop.width + "px"
    element.style.height = crop.height + "px"
    setElements(_elements)
    setShowCrop(false)
  }

  useEffect(()=>{
    setAspect(checked ? 1 : 0)
  },[checked])

  return <>
    <div id='crop-tool-buton-container'>
      <Button label="Cortar" onClick={onCrop} severity="success" />
      <Button label="Salir" onClick={() => setShowCrop(false)} severity="danger" />
      <div></div>
      <div className="crop-tool-buton-container">
        <Checkbox inputId='aspect' onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
        <label htmlFor="aspect" className="ml-2">Relación de aspecto</label>

      </div>
    </div>
    <ReactCrop crop={crop} aspect={aspect} onChange={(crop, percentCrop) => setCrop(crop)}>
      <img id='crop-tool-image-preview' ref={imageRef} src={src} />
    </ReactCrop>
  </>
}

CropTool.propTypes = {
  src: PropTypes.string,
  setShowCrop: PropTypes.func
};


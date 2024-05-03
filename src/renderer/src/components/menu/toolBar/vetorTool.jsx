import getSVGIcon from "../../../icons/iconList";
import { Button } from 'primereact/button';
import { MainContext } from "../../../contexts/mainContext";
import domtoimage from 'dom-to-image-more';
import { useContext, useEffect, useState} from "react";

export default function VectorTool() {

  const { elements, setElements, selectedElement  } = useContext(MainContext)
  const [enabled, setEnabled] = useState(false)


  const toSVG = (divRef)=>{
    const filter = (node) => node.tagName !== 'i';
    domtoimage
      .toPng(divRef, { quality: 1, filter})
      .then(function (dataUrl) {
        let _elements = JSON.parse(JSON.stringify(elements));
        _elements[selectedElement].header.type = "svg"
        _elements[selectedElement].header.image = dataUrl
        setElements(_elements)
      });
  }


  const handleClick = () => {
    if(selectedElement === null) return
    const type = elements[selectedElement].header.type;
    const content = elements[selectedElement].header.content

    if(type ==='txt'){
      const index = elements[selectedElement].header.index
      const div = document.getElementById(`element-${index}`)
      toSVG(div)
    }else if (content){
      let _elements = JSON.parse(JSON.stringify(elements));
      _elements[selectedElement].header.type = "txt"
      delete _elements[selectedElement].header.image
      setElements(_elements)
    }
  }


  useEffect(()=>{
    if(selectedElement === null){
      setEnabled(false)
      return
    }
    const type = elements[selectedElement].header.type;
    const content = elements[selectedElement].header.content

    if (type === 'txt' || content ){
      setEnabled(true)
      return
    } 
    
    setEnabled(false)
    
      
  },[selectedElement])
  

  return <Button icon={getSVGIcon("compas")} aria-label="Filter" onClick={handleClick} disabled = {!enabled} />
}
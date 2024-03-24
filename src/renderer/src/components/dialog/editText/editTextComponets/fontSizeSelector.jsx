import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../../contexts/mainContext";
import getSVGIcon from "../../../../icons/iconList";
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import './editTextStyles.css'


export default function FontSizeSelector(){
  const { elements, setElements, selectedElement } = useContext(MainContext)
  
  const [size, setSize] = useState(16);
  const [disabled, setDisabled] = useState(false)


  useEffect(()=>{
    if(selectedElement === null){
      setDisabled(true)
      setSize("")
      return
    }

    if (elements[selectedElement]?.header?.type === 'txt') {
      setDisabled(false)
      const currentSize = elements[selectedElement].style?.fontSize?.replace('px', "")
      setSize(currentSize ? currentSize : 16)
  
    } else {
      setSize("")
      setDisabled(true)
    }


  },[selectedElement])



  useEffect(()=>{
    if (selectedElement === null || disabled || elements[selectedElement]?.header?.type !== 'txt') {
      return
    }
    let _elements = JSON.parse(JSON.stringify(elements));
    _elements[selectedElement].style["fontSize"] = size + "px" ;
    setElements(_elements)
  }, [size])

  const handleIncreaseSize = ()=>{
    setSize(Number.parseInt(size) + 2)
  }
  const decreaseIncreaseSize = () => {
    setSize(Number.parseInt(size) - 2)
  }

  return <div id="font-size-button-container">
    <Button icon={getSVGIcon("textIncrease")} aria-label="Filter" disabled={disabled} onClick={handleIncreaseSize}/>
    <Button icon={getSVGIcon("textDecrease")} aria-label="Filter" disabled={disabled} onClick={decreaseIncreaseSize} />
    <InputNumber value={size} onValueChange={(e) => setSize(e.value)} min={0} max={200} inputStyle={{ width: "60px" }} disabled={disabled} />
  </div>

}
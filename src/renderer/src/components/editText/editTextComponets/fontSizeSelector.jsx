import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../contexts/mainContext";
import getSVGIcon from "../../../icons/iconList";
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import './editTextStyles.css'



export default function FontSizeSelector(){
  const { elements, selectedElement, addStyle } = useContext(MainContext)
  
  const [size, setSize] = useState(16);
  const [disabled, setDisabled] = useState(false)
  const [show, setShow] = useState(false)

  const sizes = Array.from({ length: 200 }, (value, index) => index + 1);



  useEffect(()=>{
    if(selectedElement === null){
      setDisabled(true)
      setSize("")
      setShow(false)
      return
    }

    if (elements[selectedElement]?.header?.type === 'txt') {
      setDisabled(false)
      const currentSize = elements[selectedElement].style?.fontSize?.replace('px', "")
      setSize(currentSize ? currentSize : 16)
  
    } else {
      setSize("")
      setDisabled(true)
      setShow(false)
    }


  },[selectedElement])



  useEffect(()=>{
    if (selectedElement === null || disabled || elements[selectedElement]?.header?.type !== 'txt') {
      setShow(false)
      return
    }
    addStyle({ key: "fontSize", value: size + "px" })
  }, [size])

  const handleIncreaseSize = ()=>{
    setSize(Number.parseInt(size) + 2)
  }
  const decreaseIncreaseSize = () => {
    setSize(Number.parseInt(size) - 2)
  }
  const onClickHandler =(size) =>{
    setSize(size)
    setShow(false)
  }

  useEffect(() => {
    const cleanShow = (e) => {
      if (e.key === "Escape") {
        setShow(false)
      }

    }
    const eventListener = (event) => cleanShow(event)

    if (show) {
      window.addEventListener("keydown", eventListener)
    }

    return () => {
      window.removeEventListener("keydown", eventListener)
    }
  }, [show])

  const onKeyPressHandler = e =>{

    if(e.key === "Enter"){
      setShow(false)
    }

  }

  return <div id="font-size-button-container">
    <Button icon={getSVGIcon("textIncrease")} aria-label="Filter" disabled={disabled} onClick={handleIncreaseSize}/>
    <Button icon={getSVGIcon("textDecrease")} aria-label="Filter" disabled={disabled} onClick={decreaseIncreaseSize} />


    <input 
    type="number" 
    step="0.5" 
    id="font-size-input" 
    onFocus={() => setShow(true)} 
    value={size}
    onChange={(e) => setSize(parseFloat(e.target.value))}
    onKeyDown={onKeyPressHandler}
    disabled={disabled} 
    />

    <div id="font-size-list" className={show ? "" : "hideSizeList"}>
      {sizes.map(size => <div key={"size-" + size} onClick={() => onClickHandler(size)}>{size}</div>)}
    </div>
 
  </div>

}

/*
    <InputNumber 
      value={size} 
      onValueChange={(e) => setSize(e.value)} 
      min={0} max={200} 
      inputStyle={{ width: "60px" }} 
      disabled={disabled} 
    
      />
*/
import { useContext, useEffect, useState, useRef } from "react"
import { MainContext } from "../../contexts/mainContext"
import { OverlayPanel } from 'primereact/overlaypanel';
import EditText from "./selectionToolUtils/editText";
import "./selectionTool.css"

export default function SelectionTool(){
  const { selectedElement, elements, setElements, setSelectedElement, sheetStyle } = useContext(MainContext);
  const [boxStyle, setBoxStyle] = useState();
  const [initialMousePosition, setInitialMousePosition] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [elementClicked, setElementClicked] = useState(null);
  const [type, setType] = useState('svg')
  const op = useRef(null);

  //la herramienta se coloca sobre el elemento
  useEffect(()=>{
    if(selectedElement == null){
      setBoxStyle({display: "none"})
      return
    }
    const styleProps = elements[selectedElement].style;
    const { height, width, left, top, position } = styleProps;
    const style = { height, width, left, top, position}
    setBoxStyle(style)
  },[selectedElement])

  // manejo del click, para cambiar tamaño y para mover
  //establece la posicion y tamaño inicial del la herramienta
  const handleMouseDown = e =>{
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const mousePosition = {
      left: mouseX,
      top: mouseY
    }
    setInitialMousePosition(mousePosition)
    setElementClicked(e.target.id)
    setMouseDown(true)
  }


  //maneja los eventos de cambiar de tamaño y mover de la herramienta
  useEffect(() => {
    const handleMousemove = (e) => {
      const mouseCurrentLeftPosition = e.clientX
      const mouseCurrentTopPosition = e.clientY
      const mousePreviusLeftPosition = initialMousePosition.left
      const mousePreviusTopPosition = initialMousePosition.top
      const diferenceX = mousePreviusLeftPosition - mouseCurrentLeftPosition
      const diferenceY = mousePreviusTopPosition - mouseCurrentTopPosition
      const boxHeight = boxStyle.height.replace("px", "")
      const boxWidth = boxStyle.width.replace("px", "")
      const boxLeft = boxStyle.left.replace("px", "")
      const boxTop = boxStyle.top.replace("px", "")
      const scale = sheetStyle.scale
  
      if (elementClicked === 'rigth-selectorBall'){
        const newWidth = Number.parseFloat(boxWidth) - (Number.parseFloat(diferenceX) /scale)
        setBoxStyle({
          ...boxStyle,
          width: newWidth + "px"
        })
      }
  
      if (elementClicked === 'button-rigth-selectorBall') {
        const newWidth = Number.parseFloat(boxWidth) - (Number.parseFloat(diferenceX) /scale)
        const newHeight = Number.parseFloat(boxHeight) - (Number.parseFloat(diferenceY)/scale)
        setBoxStyle({
          ...boxStyle,
          width: newWidth + "px",
          height: newHeight + "px"
        })
      }
  
      if (elementClicked === 'button-selectorBall') {
        const newHeight = Number.parseFloat(boxHeight) - (Number.parseFloat(diferenceY)/scale)
        setBoxStyle({
          ...boxStyle,
          height: newHeight + "px"
        })
      }
  
      if (elementClicked === 'left-selectorBall') {
        const newWidth = Number.parseFloat(boxWidth) + (Number.parseFloat(diferenceX)/scale)
        const newLeft = Number.parseFloat(boxLeft) - (diferenceX /scale)
        setBoxStyle({
          ...boxStyle,
          width: (newWidth ) + "px",
          left: newLeft + "px"
        })
      }
  
      if (elementClicked === 'button-left-selectorBall') {
        const newWidth = Number.parseFloat(boxWidth) + (Number.parseFloat(diferenceX)/scale)
        const newHeight = Number.parseFloat(boxHeight) - (Number.parseFloat(diferenceY)/scale)
        const newLeft = Number.parseFloat(boxLeft) - (diferenceX/scale)
        setBoxStyle({
          ...boxStyle,
          width: newWidth + "px",
          left: newLeft + "px",
          height: newHeight + "px"
        })
      }
  
      if (elementClicked === 'top-selectorBall') {
        const newHeight = Number.parseFloat(boxHeight) + (Number.parseFloat(diferenceY)/scale)
        const newTop = Number.parseFloat(boxTop) - (diferenceY /scale)
        setBoxStyle({
          ...boxStyle,
          height: newHeight + "px",
          top: newTop + "px"
        })
      }
  
      if (elementClicked === 'top-left-selectorBall') {
        const newWidth = Number.parseFloat(boxWidth) + (Number.parseFloat(diferenceX) /scale)
        const newHeight = Number.parseFloat(boxHeight) + (Number.parseFloat(diferenceY) /scale)
        const newTop = Number.parseFloat(boxTop) - (diferenceY /scale)
        const newLeft = Number.parseFloat(boxLeft) - (diferenceX /scale)
        setBoxStyle({
          ...boxStyle,
          height: newHeight + "px",
          width: (newWidth) + "px",
          top: newTop + "px",
          left: newLeft + "px",
        })
      }
  
      if (elementClicked === 'top-right-selectorBall') {
        const newWidth = Number.parseFloat(boxWidth) - (Number.parseFloat(diferenceX) /scale)
        const newHeight = Number.parseFloat(boxHeight) + (Number.parseFloat(diferenceY) /scale)
        const newTop = Number.parseFloat(boxTop) - (diferenceY /scale)
  
        setBoxStyle({
          ...boxStyle,
          height: newHeight + "px",
          width: (newWidth) + "px",
          top: newTop + "px",
        })
      }
  
      //mover la imagen
      if (elementClicked === 'selectionTool-box') {
        const left = boxLeft - (diferenceX / scale)
        const top = boxTop - (diferenceY / scale)
        setBoxStyle({
          ...boxStyle,
          left: left + 'px',
          top: top + 'px'
      
        })
      }
  


    };

   
    if (mouseDown) {
      window.addEventListener("mousemove", handleMousemove);
    } else {
      window.removeEventListener("mousemove", handleMousemove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMousemove);
    };
  }, [elementClicked, mouseDown]);


 //previene que al soltar el click no se siga cambiando el tamaño del elemento
  useEffect(()=>{

    const handleMouseUp = e =>{
      
      setMouseDown(false)
      if (e.target.id === 'Sheet' || e.target.id === 'sheet-container') {
        setSelectedElement(null)
      }
    }
   
      window.addEventListener("mouseup",handleMouseUp)

  }, [])


  //borra el elemento seleccionado
  useEffect(()=>{
    if(selectedElement == null){
      op.current.hide()
      return
    }

    const handleKeyUp = e => {
      if (e.key === "Delete") {
        let _elements = JSON.parse(JSON.stringify(elements));
        _elements.splice(selectedElement, 1)

        _elements.forEach((element, i) => {
            element.header.index = i
        });
        
        setElements(_elements)
        setSelectedElement(null)
      }
    }

    window.removeEventListener("keyup", handleKeyUp)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [selectedElement])


  //actuaaliza la imagen cuando la herraamienta cambie
  useEffect(()=>{
    if (!boxStyle || selectedElement === null){
      return
    }
    const { height, width, left, top, } = boxStyle
    
    let elementData = elements[selectedElement]
    let previusStyle = elementData.style
    const currentStyle = {
      ...previusStyle,
      height,
      width,
      left,
      top
    }
    elementData.style = currentStyle

  }, [boxStyle])


  const handleDoubleClick = (e)=>{
    const type = elements[selectedElement].header.type
    if(type === "txt"){
      setType("txt")
      op.current.show(e)
    }
  }

  


  return<>
    <div id="selectionTool-box" style={boxStyle} onMouseDown={handleMouseDown} onDoubleClick={handleDoubleClick}>
      <div id="top-left-selectorBall" className="selectorBall"></div>
      <div id="top-selectorBall" className="selectorBall"></div>
      <div id="top-right-selectorBall" className="selectorBall"></div>
      <div id="rigth-selectorBall" className="selectorBall" ></div>
      <div id="button-rigth-selectorBall" className="selectorBall"></div>
      <div id="button-selectorBall" className="selectorBall"></div>
      <div id="button-left-selectorBall" className="selectorBall"></div>
      <div id="left-selectorBall" className="selectorBall"></div>

      <OverlayPanel ref={op}>
       {
          type === 'txt' ?
            <EditText op={op}/>
          :
          null
        
       }
      </OverlayPanel>
    </div>
  </>

}
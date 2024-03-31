import { useContext, useEffect, useState} from "react"
import { MainContext } from "../../contexts/mainContext.jsx";
import Element from "../element/element.jsx"
import SelectionTool from "../selectionTool/selectionTool.jsx";
import Dialogs from "../dialog/dialogProvider.jsx";


export default function Sheet() {
  const { elements, setElements, sheetStyle, newElementData, setNewElemntData, sheetRef } = useContext(MainContext);
 
  const [ cursorImage, setCursorImage ] = useState({});





  //esto actualiza el cursor si newElementData es null
  useEffect(()=>{
    if(!newElementData){
      defaultMouseMoveImage();
    }
  }, [newElementData])

  //funcion que resetea la imagen que arrastra el cursor
  const defaultMouseMoveImage = ()=>{
    setCursorImage(
      {
        style: {
          width: "0px",
          height: "0px",
          top: "0px",
          left: "0px"
        },
        image: "none"
      }
    )
  }

  //esta funcion cambia la imagen que arrasta el cursor
  const onMouseMove = async (e)=>{
    if (!newElementData) {
      defaultMouseMoveImage()
      return
    }

    const { image, imageWidth, imageHeight, type } = newElementData

    const sheetMarginLeft = e.currentTarget.getBoundingClientRect().left;
    const sheetMarginTop = e.currentTarget.getBoundingClientRect().top
    const mouseX = e.clientX;
    const mouseY = e.clientY; 
    const scale = sheetStyle.scale
    const style = {
      style: {
        pointerEvents: "none",
        position: "absolute",
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        top: ((mouseY  - sheetMarginTop) /scale - (imageHeight / 2)) + "px",
        left: ((mouseX  - sheetMarginLeft) /scale - (imageWidth / 2)) + 'px',
        filter: type === 'txt' ? 'brightness(3)' : 'opacity(50%)',
        border: type === 'txt' ? '1px solid black': 'tansparent',
      },
      image: type === 'txt' ? trasparentImage : image 
    }

    setCursorImage(style)
  }


  //esta funcion coloca la imagen en la hoja cuando se hace click
  const onClick = async (e) => {
    if(!newElementData){
      return
    }
    try {
      const { image, imageWidth, imageHeight, type, content } = newElementData
      const sheetMarginLeft = e.currentTarget.getBoundingClientRect().left;
      const sheetMarginTop = e.currentTarget.getBoundingClientRect().top
      const mouseX = e.clientX;
      const mouseY = e.clientY; 
      const index = elements.length;
      const scale = sheetStyle.scale

      const style = {
        position: "absolute",
        width: imageWidth + "px",
        height: imageHeight + "px",
        left: ((mouseX - sheetMarginLeft)/scale - (imageWidth / 2)) + 'px',
        top: ((mouseY - sheetMarginTop)/scale - (imageHeight / 2)) + "px",
        userSelect: 'none',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...(type === 'txt' && { fontFamily: "Arial" }),
        ...(type === 'txt' && { fontSize: "16px" }),
        ...(type === 'txt' && { textAlign: "center" }),
      }


      const element = {
        header: {
          index,
          type,
          image,
          content
        },
        style
      }
      
      let _elements = JSON.parse(JSON.stringify(elements));
      _elements.push(element)
      setElements(_elements)
      setNewElemntData(null)

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div id="Sheet" ref={sheetRef} style={sheetStyle} onClick={onClick} onMouseMove={onMouseMove} onMouseLeave={defaultMouseMoveImage}>
      {elements.map((data, i) => <Element elemetData={data}  key={`e-${i}`}/>)}
      <img src={cursorImage.image} alt="" style={cursorImage.style}  /> 
      <SelectionTool />
      <Dialogs/>
    </div>
  );
}

const trasparentImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
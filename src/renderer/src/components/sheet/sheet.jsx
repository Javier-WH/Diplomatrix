import { useContext, useEffect, useState} from "react"
import { MainContext } from "../../contexts/mainContext.jsx";
import Element from "../element/element.jsx"




export default function Sheet() {
  const { elements, setElements, sheetStyle, newElementData, setNewElemntData} = useContext(MainContext);
 
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

    const { image, imageWidth, imageHeight } = newElementData

    const sheetMarginLeft = e.currentTarget.getBoundingClientRect().left;
    const sheetMarginTop = e.currentTarget.getBoundingClientRect().top
    const mouseX = e.clientX;
    const mouseY = e.clientY; 
    setCursorImage(
      {
        style: {
          pointerEvents: "none",
          position: "absolute",
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          top: (mouseY - sheetMarginTop - (imageHeight / 2)) + "px",
          left: (mouseX - sheetMarginLeft - (imageWidth / 2)) + 'px',
          filter: 'opacity(50%)'
        },
        image
      }
    )

  }


  //esta funcion coloca la imagen en la hoja cuando se hace click
  const onClick = async (e) => {
    if(!newElementData){
      return
    }
    try {
      const { image, imageWidth, imageHeight, type } = newElementData
      const sheetMarginLeft = e.currentTarget.getBoundingClientRect().left;
      const sheetMarginTop = e.currentTarget.getBoundingClientRect().top
      const mouseX = e.clientX;
      const mouseY = e.clientY; 
      const index = elements.length;

      const element = {
        header: {
          index,
          type,
          image
        },
        style: {
          position: "absolute",
          width: imageWidth + "px",
          height: imageHeight + "px",
          left: (mouseX - sheetMarginLeft - (imageWidth / 2)) + 'px',
          top: (mouseY - sheetMarginTop - (imageHeight / 2)) + "px",
        }
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
    <div id="Sheet" style={sheetStyle} onClick={onClick} onMouseMove={onMouseMove} onMouseLeave={defaultMouseMoveImage} onKeyDown={()=> alert("holsa")}>
      {elements.map((data, i) => <Element elemetData={data}  key={`e-${i}`}/>)}
      <img src={ cursorImage.image} alt="" style={cursorImage.style} />
    </div>
  );
}

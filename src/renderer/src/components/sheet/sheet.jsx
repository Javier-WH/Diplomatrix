import { useContext } from "react"
import { MainContext } from "../../contexts/mainContext.jsx";
import Element from "../element/element.jsx"


export default function Sheet() {
  const { elements, setElements, sheetStyle} = useContext(MainContext);


  const onClick = async(e) =>{

 try {
   const sheetMarginLeft = e.currentTarget.getBoundingClientRect().left;
   const sheetMarginTop = e.currentTarget.getBoundingClientRect().top
   const mouseX = e.clientX;
   const mouseY = e.clientY;
   const imageWidth = 100;
   const imageHeight = 100;

   const element = {
     header:{
       img: "../../appAssets/borders/java-4.svg"
       //img: "../../assets/electron.svg"
      },
      style:{
        position: "absolute",
        width: imageWidth +"px",
        height: imageHeight +"px",
        left: (mouseX - sheetMarginLeft - (imageWidth/2)) + 'px',
        top: (mouseY - sheetMarginTop - (imageHeight/2)) + "px",
      }
    }
    let _elements = JSON.parse(JSON.stringify(elements));
    _elements.push(element)
    setElements(_elements)

  } catch (error) {
    console.log(error)
   
  }
    
  }
  
  return (
    <div id="Sheet" style={sheetStyle}  onClick={onClick}>
      {elements.map((element, iden) => <Element style={element.style} iden={iden} key={"key-"+iden} imgAddress={element.header.img}/>)}
    </div>
  );
}

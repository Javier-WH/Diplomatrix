import { useContext, useEffect, useState } from "react"
import { MainContext } from "../../contexts/mainContext"
import "./selectionTool.css"
export default function SelectionTool(){



  const { selectedElement, elements } = useContext(MainContext)
  const [boxStyle, setBoxStyle] = useState()
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });
  const [mouseDown, setMouseDown] = useState(false)

  useEffect(()=>{
    window.addEventListener("mouseup",()=>{
      setMouseDown(false)
    })
  },[])

  useEffect(()=>{
    if(selectedElement == null){
      setBoxStyle({display: "none"})
      return
    }
    const styleProps = elements[selectedElement].style;
    const { height, width, left, top, position } = styleProps;
    const style = { height, width, left, top, position, border: '1px solid black'}
    setBoxStyle(style)
  },[selectedElement])





  return<>
    <div id="selectionTool-box" style={boxStyle}>
      <div id="top-left-selectorBall" className="selectorBall"></div>
      <div id="top-selectorBall" className="selectorBall"></div>
      <div id="top-right-selectorBall" className="selectorBall"></div>
      <div id="rigth-selectorBall" className="selectorBall" ></div>
      <div id="button-rigth-selectorBall" className="selectorBall"></div>
      <div id="button-selectorBall" className="selectorBall"></div>
      <div id="button-left-selectorBall" className="selectorBall"></div>
      <div id="left-selectorBall" className="selectorBall"></div>
    </div>
  </>

}
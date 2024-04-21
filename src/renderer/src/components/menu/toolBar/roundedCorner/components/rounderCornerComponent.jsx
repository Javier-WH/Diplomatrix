import { useState, useContext, useEffect } from "react"
import RangeValue from "../../../../rangeValue/RangeValue"
import { MainContext } from "../../../../../contexts/mainContext"
import "./rounderCornerComponent.css"


export default function RounderCorner(){

  const { getStyle, fullEditElemtnt } = useContext(MainContext);
  const [topLeft, setTopLeft] = useState(getStyle("borderTopLeftRadius")?.replace("px", "") ?? 0);
  const [topRight, setTopRight] = useState(getStyle("borderTopRightRadius")?.replace("px", "") ?? 0);
  const [bottonLeft, setBottonLeft] = useState(getStyle("borderBottomLeftRadius")?.replace("px", "") ?? 0);
  const [bottonRight, setBottonRight] = useState(getStyle("borderBottomRightRadius")?.replace("px", "") ?? 0);
  const [border, setBorder] = useState(null);


  useEffect(()=>{

    const style={
      borderTopLeftRadius: topLeft + "px",
      borderTopRightRadius: topRight + "px",
      borderBottomLeftRadius: bottonLeft + "px",
      borderBottomRightRadius: bottonRight + "px",
    }

    fullEditElemtnt({style})

  }, [topLeft, topRight, bottonLeft, bottonRight])

  useEffect(()=>{
    if(!border) return
    setTopLeft(border)
    setTopRight(border)
    setBottonLeft(border)
    setBottonRight(border)
  },[border])


  return <div id="CornerRadius-main-container">
    <RangeValue value={topLeft} setValue={setTopLeft} max={500} title="Esquina Superior Izquierda"/>
    <RangeValue value={topRight} setValue={setTopRight} max={500} title="Esquina Superior Derecha"/>
    <RangeValue value={bottonLeft} setValue={setBottonLeft} max={500} title="Esquina Iinferior Izquierda"/>
    <RangeValue value={bottonRight} setValue={setBottonRight} max={500} title="Esquina Iinferior Derecha"/>
    <RangeValue value={border} setValue={setBorder} max={500} title="Todos"/>
  </div>
}
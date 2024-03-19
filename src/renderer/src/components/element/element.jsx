import PropTypes from "prop-types"
import { MainContext } from "../../contexts/mainContext"
import './element.css'
import { useContext, useEffect } from "react"

export default function Element({ elemetData }) {

  const { newElementData, selectedElement, setSelectedElement } = useContext(MainContext);

  const { header, style } = elemetData
  const { image, index} = header


  useEffect(() => {
    if(newElementData){
      return
    }
   }, [newElementData, selectedElement])


   const handleClick = ()=>{
    setSelectedElement(index)
   }

  return <div id={`element-${index}`} style={style} onClick={handleClick}>
    <img src={image} alt="" className="element-img" />
  </div>

}

Element.propTypes = {
  elemetData: PropTypes.object
};

import { useContext } from "react"
import {MainContext} from "../../../../../contexts/mainContext"
import { Button } from 'primereact/button';
import getSVGicons from '../../../.././../icons/iconList'
import { swapElements } from "../../../../../utils/fucntions";
import "./moveZindex.css"

export default function MoveZindex(){

  const { elements, selectedElement, setElements, setSelectedElement } = useContext(MainContext);

  const handleZindex = (move = 0)=>{

    const index1 = selectedElement;
    const index2 = selectedElement + move;

    try {
      const Elements = swapElements(elements, index1, index2);
      setElements(Elements)
      setSelectedElement(index2)
    } catch (error) {
      /**/ 
    }


  }

  return<>
    <div id="moveZindex-button-container">
      <Button icon={getSVGicons("moveFront")} rounded text aria-label="Filter" className="moveZindex-button" onClick={()=>handleZindex(+1)}/>  
      <Button icon={getSVGicons("moveBack")} rounded text aria-label="Filter" className="moveZindex-button" onClick={() => handleZindex(-1)} />  
    </div>
  </>
}



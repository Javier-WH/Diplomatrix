import { Button } from 'primereact/button';
import getSVGIcon from '../../../../icons/iconList';
import { useContext, useEffect, useRef } from 'react';
import { MainContext } from '../../../../contexts/mainContext';
import "./history.css"


export default function History() {

  const { elements, setElements, selectedElement, setSelectedElement } = useContext(MainContext)
  const index = useRef(0)
  const history = useRef([])






  const getNewHistory = () => {
    const currentHistory = history.current[index.current] ?? [];
    if (sheetStateChanged([...elements], currentHistory)) {
      if (!history.current[0]) history.current[0] = [] // corrige un bug donde el indice 0 es undefined
      history.current[index.current + 1] = [...elements];
      index.current++;
      history.current = history.current.slice(0, index.current + 1);
    }
  };

  useEffect(() => {

    window.addEventListener("mouseup", getNewHistory);
    return () => {
      window.removeEventListener("mouseup", getNewHistory);
    };
  }, [elements, selectedElement, history.current, index.current]);





  const undo = () => {
    setSelectedElement(null)

    const previousIndex = Math.max(0, index.current - 1);
    const previousElements = history.current[previousIndex];

    if (previousElements) {
      setElements(previousElements);
      index.current = previousIndex

      /*const newSelectedElement = elements.length -1 >= selectedElement ? selectedElement : null;
      setTimeout(() => {
        setSelectedElement(newSelectedElement);
      }, 100);*/

    }
  };


  const redo = () => {
    setSelectedElement(null)
    const nextIndex = Math.min(index.current + 1, history.current.length - 1);
    const nextElements = history.current[nextIndex];
     if (nextElements) {
       setElements(nextElements);
       index.current =nextIndex;
       
     }
  };



  return <div id='history-button-container'>
    <Button type="button" icon={getSVGIcon("undo")} onClick={undo} />
    <Button type="button" icon={getSVGIcon("redo")} onClick={redo} />
  </div>

}




function sheetStateChanged(state1, state2){
  const sortedState1 = state1.sort();
  const sortedState2 = state2.sort();
  const flatState1 = sortedState1.flat(Infinity);
  const flatState2 = sortedState2.flat(Infinity);
  const stringState1 = JSON.stringify(flatState1);
  const stringState2 = JSON.stringify(flatState2);
  return stringState1 !== stringState2
}



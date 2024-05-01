import { Button } from 'primereact/button';
import getSVGIcon from '../../../../icons/iconList';
import { useContext, useEffect, useRef, useState } from 'react';
import { MainContext } from '../../../../contexts/mainContext';
import "./history.css"


export default function History() {

  const { elements, setElements, setSelectedElement } = useContext(MainContext)
  const index = useRef(0)
  const history = useRef([])
  /* eslint-disable-next-line no-unused-vars */
  const [update, forceUpdate] = useState(false);

  
  //funcion para agregar un nuevo estado / historia
  const getNewHistory = () => {
    const currentHistory = history.current[index.current] ?? [];
    if (sheetStateChanged([...elements], currentHistory)) {
      if (!history.current[0]) history.current[0] = [] // corrige un bug donde el indice 0 es undefined
      history.current[index.current + 1] = [...elements];
      index.current++;

      // Limitar la longitud del historial a 100
      if (index.current > 100) {
        history.current.shift(); // Elimina el historial más antiguo
        index.current--;
      }
      history.current = history.current.slice(0, index.current + 1);
    }
  };


  //refresca el evento
  useEffect(() => {
    forceUpdate(prev => !prev);
    window.addEventListener("click", getNewHistory);
    return () => {
      window.removeEventListener("click", getNewHistory);
    };
  }, [elements]);




  const undo = () => {
    setSelectedElement(null)
    const previousIndex = Math.max(0, index.current - 1);
    const previousElements = history.current[previousIndex];

    if (previousElements) {
      setElements(previousElements);
      index.current = previousIndex
    }
  };


  const redo = () => {
    setSelectedElement(null)
    const nextIndex = Math.min(index.current + 1, history.current.length - 1);
    const nextElements = history.current[nextIndex];
    if (nextElements) {
      setElements(nextElements);
      index.current = nextIndex;
    }
  };



  useEffect(() => {

    const undoShortCut = (event) => {
      if (event.ctrlKey && (event.key === 'z' || event.key === 'Z')) {
        undo();
      }
      if (event.ctrlKey && (event.key === 'y' || event.key === 'Y')) {
        redo();
      }
    };

    document.addEventListener('keydown', undoShortCut);

    return () => {
      document.removeEventListener('keydown', undoShortCut)
    }

  }, [])



  return <div id='history-button-container'>
    <Button type="button" icon={getSVGIcon("undo")} onClick={undo} disabled = {index.current === 0}/>
    <Button type="button" icon={getSVGIcon("redo")} onClick={redo} disabled = {index.current === history.current.length-1 || history.current.length === 0 }  />
  </div>

}




function sheetStateChanged(state1, state2) {
  const sortedState1 = state1.sort();
  const sortedState2 = state2.sort();
  const flatState1 = sortedState1.flat(Infinity);
  const flatState2 = sortedState2.flat(Infinity);
  const stringState1 = JSON.stringify(flatState1);
  const stringState2 = JSON.stringify(flatState2);
  return stringState1 !== stringState2
}



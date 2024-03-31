import { createContext, useState, useRef } from "react"
import PropTypes from "prop-types"
import defaultSheetStyle from "./defaultdata/defaultSheetStyle";



export const MainContext = createContext();

export function MainContextProvider(props) {
  const [elements, setElements, ] = useState([])
  const [sheetStyle, setSheetStyle] = useState(defaultSheetStyle());
  const [mouseCords, SetMouseCords] = useState({ x: 20, y: 0 });
  const [newElementData, setNewElemntData] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [refreshScale, setRefreshScale] = useState(false)
  const sheetRef = useRef(null);



  function addStyles(styleList) {
    if(!styleList) return
    let _elements = JSON.parse(JSON.stringify(elements));
    styleList.forEach(style=>{
      const {key, value} = style;
      _elements[selectedElement].style[key] = value
    })

    setElements(_elements)
  }

  function addStyle({ key, value }) {
    let _elements = JSON.parse(JSON.stringify(elements));
    _elements[selectedElement].style[key] = value
    setElements(_elements)
  }

  function getStyle(key){
    if(!key){
      return
    }

    return elements[selectedElement]?.style[key]
  }
  


  const values = {
    elements,
    setElements,
    newElementData,
    setNewElemntData,
    sheetStyle,
    setSheetStyle,
    mouseCords,
    SetMouseCords,
    selectedElement, 
    setSelectedElement,
    addStyle,
    addStyles,
    getStyle,
    refreshScale,
    setRefreshScale,
    sheetRef
  }

  return (
    <MainContext.Provider value={values}>
      {props.children}
    </MainContext.Provider>
  );
}

MainContextProvider.propTypes = {
  children: PropTypes.node
};


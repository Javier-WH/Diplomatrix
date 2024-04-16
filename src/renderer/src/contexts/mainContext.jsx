import { createContext, useState, useRef } from "react"
import PropTypes from "prop-types"
import defaultSheetStyle from "./defaultdata/defaultSheetStyle";



export const MainContext = createContext();

export function MainContextProvider(props) {
  const [elements, setElements,] = useState([])
  const [sheetStyle, setSheetStyle] = useState(defaultSheetStyle());
  const [mouseCords, SetMouseCords] = useState({ x: 20, y: 0 });
  const [newElementData, setNewElemntData] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [refreshScale, setRefreshScale] = useState(false)
  const sheetRef = useRef(null);



  function addStyles(styleList) {
    if (!styleList) return
    let _elements = JSON.parse(JSON.stringify(elements));
    styleList.forEach(style => {
      const { key, value } = style;
      _elements[selectedElement].style[key] = value
    })

    setElements(_elements)
  }

  function addStyle({ key, value }) {
    let _elements = JSON.parse(JSON.stringify(elements));
    _elements[selectedElement].style[key] = value
    setElements(_elements)
  }

  function getStyle(key) {
    if (!key) {
      return
    }

    return elements[selectedElement]?.style[key]
  }

  function getHeader(key) {
    if (!key) {
      return
    }

    return elements[selectedElement]?.header[key]
  }

  function addHeader({ key, value }) {
    let _elements = JSON.parse(JSON.stringify(elements));
    _elements[selectedElement].header[key] = value
    setElements(_elements)
  }

  function fullEditElemtnt({ header, style }) {

    let _elements = JSON.parse(JSON.stringify(elements));

    if (header) {
      const _header = _elements[selectedElement].header
      _elements[selectedElement].header = {
        ..._header,
        ...header
      }
    }

    if (style) {
      const _style = _elements[selectedElement].style
      _elements[selectedElement].style = {
        ..._style,
        ...style
      }
    }

    setElements(_elements)
  }

  function deleteStyle(keys) {
    if (!keys || !elements[selectedElement] || !elements[selectedElement].style) {
      return;
    }

    let _elements = JSON.parse(JSON.stringify(elements));

    for (let key of keys) {
      if (key in _elements[selectedElement].style) {
        delete _elements[selectedElement].style[key];
      }
    }

    setElements(_elements);

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
    sheetRef,
    getHeader,
    addHeader,
    fullEditElemtnt,
    deleteStyle
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


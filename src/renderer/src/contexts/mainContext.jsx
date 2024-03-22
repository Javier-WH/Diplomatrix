import { createContext, useState } from "react"
import PropTypes from "prop-types"
import defaultSheetStyle from "./defaultdata/defaultSheetStyle";
//
import InsertImage from "../components/dialog/insertImage/insertImage";



export const MainContext = createContext();

export function MainContextProvider(props) {
  const [elements, setElements] = useState([])
  const [sheetStyle, setSheetStyle] = useState(defaultSheetStyle());
  const [mouseCords, SetMouseCords] = useState({ x: 20, y: 0 });
  const [newElementData, setNewElemntData] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  //
  const [showInsertImage, setShowInsertImage] = useState(false);


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
    showInsertImage, 
    setShowInsertImage
  }

  return (
    <MainContext.Provider value={values}>
      {props.children}
      <InsertImage visible={showInsertImage} setVisible={setShowInsertImage} />
    </MainContext.Provider>
  );
}

MainContextProvider.propTypes = {
  children: PropTypes.node
};


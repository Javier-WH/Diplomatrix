import { createContext, useState } from "react"
import PropTypes from "prop-types"
import defaultSheetStyle from "./defaultdata/defaultSheetStyle";

export const MainContext = createContext();

export function MainContextProvider(props) {
  const [elements, setElements] = useState([])
  const [sheetStyle, setSheetStyle] = useState(defaultSheetStyle());
  const [mouseCords, SetMouseCords] = useState({ x: 20, y: 0 });
  const [newElementData, setNewElemntData] = useState(null)



  const values = {
    elements,
    setElements,
    newElementData,
    setNewElemntData,
    sheetStyle,
    setSheetStyle,
    mouseCords,
    SetMouseCords
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



/*
{
    image: "../../appAssets/borders/java-4.svg",
    imageWidth: 100,
    imageHeight: 100,
    type: "svg"
  }

*/
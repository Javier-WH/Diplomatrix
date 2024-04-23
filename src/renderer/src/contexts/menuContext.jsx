import { createContext, useState } from "react"
import PropTypes from "prop-types"
//



export const MenuContext = createContext();

export function MenuContextProvider(props) {

  const [showInsertImage, setShowInsertImage] = useState(false);
  const [showConfigSheet, setShowConfigSheet] = useState(false);


  const values = {
    showInsertImage,
    setShowInsertImage,
    showConfigSheet,
    setShowConfigSheet
  }

  return (
    <MenuContext.Provider value={values}>
      {props.children}
    </MenuContext.Provider>
  );
}

MenuContextProvider.propTypes = {
  children: PropTypes.node
};


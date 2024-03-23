import { createContext, useState } from "react"
import PropTypes from "prop-types"
//



export const MenuContext = createContext();

export function MenuContextProvider(props) {

  const [showInsertImage, setShowInsertImage] = useState(false);
  const [showEditText, setShowEditText] = useState(false);


  const values = {
    showInsertImage,
    setShowInsertImage,
    showEditText,
    setShowEditText
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


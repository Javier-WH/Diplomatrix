import { createContext, useState } from "react"
import PropTypes from "prop-types"
//



export const MenuContext = createContext();

export function MenuContextProvider(props) {

  const [showInsertImage, setShowInsertImage] = useState(false);
  const [showConfigSheet, setShowConfigSheet] = useState(false);
  const [showGenerateImg, setShowGenerateImg] = useState(false);
  const [showCrop, setShowCrop] = useState(false);


  const closeAllDialogs = ()=>{
    setShowInsertImage(false)
    setShowConfigSheet(false)
    setShowGenerateImg(false)
    setShowCrop(false)
  }

  const values = {
    closeAllDialogs,
    showInsertImage,
    setShowInsertImage,
    showConfigSheet,
    setShowConfigSheet,
    showGenerateImg, 
    setShowGenerateImg,
    showCrop,
    setShowCrop
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


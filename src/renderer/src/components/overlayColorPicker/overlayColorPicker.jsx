import { OverlayPanel } from 'primereact/overlaypanel';

import { RgbaStringColorPicker } from "react-colorful";
import { useRef } from 'react';
import PropTypes from "prop-types"

export default function OverlayColorPicker(
  {
    color,
    setColor,
    width = "30px",
    height = "30px",
    borderRadius = "50%"
  }
){

  const op = useRef(null);

  return <div>
    <div onClick={(e) => op.current.toggle(e)} 
    style={{ 
      width,
      height, 
      background: color, 
      border: "1px solid black", 
      borderRadius, 
      cursor: "pointer"
    }}>

    </div>
    <OverlayPanel ref={op}>
      <RgbaStringColorPicker color={color} onChange={setColor} />
    </OverlayPanel>
  </div>

}

OverlayColorPicker.propTypes = {
  color: PropTypes.string,
  setColor: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string
};


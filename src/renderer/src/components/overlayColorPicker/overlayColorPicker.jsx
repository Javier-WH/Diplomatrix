import ColorPicker from 'react-best-gradient-color-picker'
import { useEffect, useState } from 'react';
import PropTypes from "prop-types"
import "./overlayColorPicker.css"

export default function OverlayColorPicker({ color, setColor, width = "30px", height = "30px", borderRadius = "50%" }) {

  const [show, setShow] = useState(false);

  const handleOpenOverlayPanel = ()=>{
    setShow(!show)

  }

    useEffect(() => {
    const closeOnClick = e => {
      const elementId =  e.target.id;
      const container = document.getElementsByClassName("color-picker-overlay-picker")[0]
 
      if (elementId !== 'color-picker-overlay-button' && elementId !== 'color-picker-overlay-picker' && !container.contains(e.target)){
        setShow(false);
      }
    }

    if (show) {
      window.addEventListener("click", closeOnClick);

      return () => {
        window.removeEventListener("click", closeOnClick);
      };
    }
  }, [show]);

  return <div id='color-picker-overlay-container'>
    <div id='color-picker-overlay-button' onClick={handleOpenOverlayPanel}
      style={{
        width,
        height,
        background: color,
        border: "1px solid black",
        borderRadius,
        cursor: "pointer"
      }}></div>


    <div id='color-picker-overlay-picker' className={!show ? "hideColorPicker" : "color-picker-overlay-picker"}>
        <ColorPicker value={color} onChange={setColor} hidePresets={true} width={190} height={150} hideInputs={false} hideColorTypeBtns={true} hideAdvancedSliders={true} hideColorGuide={true} />
    </div>

  </div>
}

OverlayColorPicker.propTypes = {
  color: PropTypes.string,
  setColor: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string
};


import { useRef } from "react"
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import getSVGIcon from "../../../../../../icons/iconList";
import PropTypes from "prop-types"


/**
 * Component for selecting border style.
 * 
 * @component
 * @param {string} BorderType - Current border style.
 * @param {function} setBorderType - Function to set border style.
 * @return {JSX.Element} Component for selecting border style.
 */
export default function BorderStyleSelector({ BorderType, setBorderType }) {
  // List of available border styles
  const borderList = [
    "none", 
    "hidden", 
    "dotted", 
    "dashed", 
    "solid", 
    "double", 
    "groove", 
    "ridge", 
    "inset", 
    "outset"
  ];
  // Reference to overlay panel
  const overlayRef = useRef(null);

  /**
   * Handle border style selection.
   * 
   * @param {string} value - Selected border style.
   */
  const handleBorderStyle = (value) => {
    // Check if value is valid
    if (value === null || value === undefined) {
      console.error('Value is null or undefined');
      return;
    }

    // Set selected border style
    setBorderType(value);

    // Check if overlay panel is valid
    if (overlayRef.current === null) {
      console.error('Overlay ref is null');
      return;
    }

    // Hide overlay panel
    overlayRef.current.hide();
  };

  return (
    <>
      {/* Button for selecting border style */}
      <Button 
        type="button" 
        icon={getSVGIcon("borderStyle")} 
        label={BorderType}
        style={{width: "100%"}}
        onClick={(e) => overlayRef.current.toggle(e)} 

      />
      {/* Overlay panel with border style options */}
      <OverlayPanel ref={overlayRef}>
        {
          // Map over border list and create border style options
          borderList.map((border) => (
            <div 
              key={border} 
              value={border} 
              className="border-style-option" 
              onClick={() => handleBorderStyle(border)}
              
            >
              {border}
              <div style={{
                width: "100px",
                height: "1px",
                borderBottom: `5px ${border} var(--surface-200)`,
                position: "absolute",
                right: "5px",
                top: "50%"
              }}>

              </div>
            </div>
          ))
        }
      </OverlayPanel>
    </> 
  );
}

BorderStyleSelector.propTypes = {
  BorderType: PropTypes.string,
  setBorderType: PropTypes.func
};

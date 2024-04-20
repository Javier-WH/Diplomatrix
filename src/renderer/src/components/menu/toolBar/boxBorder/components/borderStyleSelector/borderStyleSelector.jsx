import { useEffect, useState } from "react"
import PropTypes from "prop-types"



export default function BorderStyleSelector({ BorderType, setBorderType }) {

  const [show, setShow] = useState(false)

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



  const handleBorderStyle = (value) => {
    // Check if value is valid
    if (value === null || value === undefined) {
      console.error('Value is null or undefined');
      return;
    }

    // Set selected border style
    setBorderType(value);

    setShow(false)
  };
  //p-button-label
  useEffect(()=>{
    const closeOnClick = e =>{
      const butttonId = e.target.id

      if (butttonId !== "border-style-main-button"){
        setShow(false)
      }
      
    }

    if (show) {
      window.addEventListener("click", closeOnClick);

      return () => {
        window.removeEventListener("click", closeOnClick);
      };
    }

  },[show])

  const buttonBorderStyle = {
    borderBottom: `5px ${BorderType} white`,
  }

  return (
    <div style={{position: "relative"}}>
      <button 
        id="border-style-main-button"
        style={{width: "100%", height:"50px"}}
        onClick={() => setShow(!show)} 
      >{BorderType} <div style={buttonBorderStyle}></div> </button>
    
    
      <div className= { !show ? "hideBorder" : "border-style-container"}>
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
      </div>
    </div> 
  );
}

BorderStyleSelector.propTypes = {
  BorderType: PropTypes.string,
  setBorderType: PropTypes.func
};


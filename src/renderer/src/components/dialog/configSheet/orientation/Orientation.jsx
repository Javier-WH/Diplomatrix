import "./orientation.css"
import { MainContext } from "../../../../contexts/mainContext"
import { useContext, useState } from "react"
export default function OrientationSelector() {

  const { setSheetStyle, sheetStyle } = useContext(MainContext)
  const [orientation, setOrientation] = useState(sheetStyle?.orientation ?? "landscape");




  return (
    
    <div id="orientation-selector-main-container">
      <span>Orientación</span>
      <div style={{width: "180px", height: "180px"}}>
        <div id="orientation-selector-sheet-container">
          <div id="topMesure">{sheetStyle?.width}</div>
          <div id="orientation-selector-sheet" title={orientation} style={{ background: sheetStyle?.background ?? "white"}}></div>
          <div id="leftMesure">{sheetStyle?.height}</div>
        </div>
      </div>

      <div id="orientation-radio-group">
        <div>

          <input
            type="radio"
            id="landscape-radio"
            name="orientation"
            value="landscape"
            checked={orientation === "landscape"}
            onChange={(e) => {
              setOrientation(e.target.value)
              setSheetStyle({ ...sheetStyle, orientation: e.target.value })
            }} />
          <label htmlFor="landscape-radio">Horizontal</label>
        </div>

        <div>
          <input
            type="radio"
            id="portrait-radio"
            name="orientation"
            value="portrait"
            checked={orientation === "portrait"}
            onChange={(e) => {
              setOrientation(e.target.value)
              setSheetStyle({ ...sheetStyle, orientation: e.target.value })
            }} />
          <label htmlFor="portrait-radio">Vertical</label>
        </div>
      </div>


    </div>



  )

}
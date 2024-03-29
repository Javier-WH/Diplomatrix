import "./toolBar.css"
import FileMenu from "./toolBar/fileMenu"
import InsertTextButton from "./toolBar/insertText"
import InsertImageButton from "./toolBar/insertImage"
import FontSizeSelector from "../dialog/editText/editTextComponets/fontSizeSelector"
import FontStyleSelector from "../dialog/editText/editTextComponets/fontStyleSelector"
import FormatBorder from "../dialog/editImage/BoxBorder/formatBorder"
import FontSelector from "../dialog/editText/editTextComponets/fontSelector"
import TextFormat from "../dialog/editText/textFormat/textFormat"
import FontAligmentSelector from "../dialog/editText/editTextComponets/fontAligtmentSelector"
import FormatImage from "../dialog/editImage/formatImage/formatImage"
import ZoomTool from "../dialog/zoomTool/zoomTool"


export default function ToolBar(){

  return <div id="toolbar">
    <div id="toolbar-filemenu-container">
      <FileMenu/>
    </div>
    <div id="toolbar-tools-container">

      <div className="toolbar-tools-seccion">
        <InsertTextButton />
        <TextFormat/>
        <FontStyleSelector />
        <FontAligmentSelector/>
        <FontSelector />
        <FontSizeSelector/>
      </div>

      <div className="toolbar-tools-seccion">
        <InsertImageButton />
        <div id="font-size-button-container">
          <FormatImage />
          <FormatBorder/>
        </div>
      </div>

    
    </div>
  </div>

}
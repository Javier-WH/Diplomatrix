import "./toolBar.css"
import FileMenu from "./toolBar/fileMenu"
import InsertTextButton from "./toolBar/insertText"
import InsertImageButton from "./toolBar/insertImage"
import FontSizeSelector from "../dialog/editText/editTextComponets/fontSizeSelector"
import FontStyleSelector from "../dialog/editText/editTextComponets/fontStyleSelector"
import FontSelector from "../dialog/editText/editTextComponets/fontSelector"
import TextFormat from "../dialog/editText/textFormat/textFormat"

export default function ToolBar(){

  return <div id="toolbar">
    <div id="toolbar-filemenu-container">
      <FileMenu/>
    </div>
    <div id="toolbar-tools-container">
      <div className="toolbar-tools-seccion">
        <InsertTextButton/>
        <FontSizeSelector/>
        <FontStyleSelector />
        <TextFormat/>
        <FontSelector />
      </div>

      <div className="toolbar-tools-seccion">
        <InsertImageButton />
      </div>
    </div>
  </div>

}
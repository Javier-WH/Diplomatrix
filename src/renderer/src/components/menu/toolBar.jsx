import "./toolBar.css"
import FileMenu from "./toolBar/fileMenu"
import InsertTextButton from "./toolBar/insertText"
import InsertImageButton from "./toolBar/insertImage"
import FontSizeSelector from "../dialog/editText/editTextComponets/fontSizeSelector"
import FontStyleSelector from "../dialog/editText/editTextComponets/fontStyleSelector"
import FontSelector from "../dialog/editText/editTextComponets/fontSelector"
import TextFormat from "../dialog/editText/textFormat/textFormat"
import FontAligmentSelector from "../dialog/editText/editTextComponets/fontAligtmentSelector"

export default function ToolBar(){

  return <div id="toolbar">
    <div id="toolbar-filemenu-container">
      <FileMenu/>
    </div>
    <div id="toolbar-tools-container">

      <div className="toolbar-tools-seccion">
        <InsertTextButton />
        <InsertImageButton />
      </div>

      <div className="toolbar-tools-seccion">
        <FontSelector />
        <FontSizeSelector/>
        <FontStyleSelector />
        <FontAligmentSelector/>
        <TextFormat/>
      </div>

    
    </div>
  </div>

}
import "./toolBar.css"
import FileMenu from "./toolBar/fileMenu"
import InsertTextButton from "./toolBar/insertText"
import InsertImageButton from "./toolBar/insertImage"
import FontSizeSelector from "../editText/editTextComponets/fontSizeSelector"
import FontStyleSelector from "../editText/editTextComponets/fontStyleSelector"
import FontSelector from "../editText/editTextComponets/fontSelector"
import FontAligmentSelector from "../editText/editTextComponets/fontAligtmentSelector"
import BackGroundColorOverlay from "./toolBar/backgroundColor/backgroudColorSelector"
import TextColorOverlay from "./toolBar/TextColorColor/textColorSelector"
import TextBorderOverlay from "./toolBar/textBorder/textBorderOverlay"
import TextShadowOverlay from "./toolBar/textShadow/textShadowSelector"
import BoxBorderOverlay from "./toolBar/boxBorder/boxBorderSelector"
import CreateImageButton from "./toolBar/createImageButton"
import EditPosition from "./toolBar/editPosotion/editPosition"
import Filter from "./toolBar/filter/filter"
import RoundedCornerOverlay from "./toolBar/roundedCorner/roundedCorner"
import ClipPathOverlay from "./toolBar/clipPath/clipPathOverlay"
import UploadImage from "./toolBar/uploadImage/upLoadImage"
import SaveButton from "./toolBar/save/save"
import LoadFile from "./toolBar/load/load"
import ConfigSheet from "../dialog/configSheet/configSheet"


export default function ToolBar(){

  return <div id="toolbar">
    <div id="toolbar-filemenu-container">
      <FileMenu/>
    </div>
    <div id="toolbar-tools-container">


      <div className="toolbar-tools-seccion">
        <InsertImageButton />

        <div id="font-size-button-container">
          <BackGroundColorOverlay/>
          <TextColorOverlay/>
          <TextBorderOverlay />
          <TextShadowOverlay />
          <BoxBorderOverlay />
          <EditPosition/>
          <Filter/>
          <RoundedCornerOverlay/>
          <ClipPathOverlay/>
          <UploadImage/>
        </div>
        <SaveButton/>
        <LoadFile/>
        <ConfigSheet/>
        <CreateImageButton />
      </div>

      <div className="toolbar-tools-seccion">
        <InsertTextButton />
        <FontStyleSelector />
        <FontAligmentSelector />
        <FontSelector />
        <FontSizeSelector />
      </div>
    
    </div>
  </div>

}
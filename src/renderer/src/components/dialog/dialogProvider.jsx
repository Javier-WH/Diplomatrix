import InsertImage from "./insertImage/insertImage";
import SheetSizeDialog from "./configSheet/dialog/sheetConfigDialog";
import GenerateImgDialog from "./generateDiplom/dialog/GenerateDialog";
import ShowCropDialog from "./cropDialog/cropDialog";

export default function Dialogs(){

  return<>
    <InsertImage/>
    <SheetSizeDialog />
    <GenerateImgDialog />
    <ShowCropDialog/>
  </>

}
import './UploadImage.css';
import getSVGIcon from '../../../../icons/iconList';
import { MainContext } from '../../../../contexts/mainContext';
import { useContext } from 'react';

export default function LoadFile() {

  const { setElements, setSheetStyle } = useContext(MainContext);


  const handleFileLoad = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const json = JSON.parse(reader.result);
      setSheetStyle(json.sheetStyle)
      setElements(json.elements);
      event.target.value = "";
    };

    reader.readAsText(file);
  };


  return (
   <>
      <input type="file" id="file-input-json" className="file-input" onChange={handleFileLoad} accept=".json" />
      <label htmlFor="file-input-json" className="file-label">
        {getSVGIcon("open")}
      </label>
   </>
   
  );
}

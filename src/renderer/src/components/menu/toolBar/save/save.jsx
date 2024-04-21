import { Button } from 'primereact/button';
import getSVGIcon from "../../../../icons/iconList.jsx"
import {MainContext} from "../../../../contexts/mainContext.jsx"
import { useContext } from 'react';

export default function SaveButton() {

  const { elements } = useContext(MainContext)

  const handleSave = () => {
    const jsonData = JSON.stringify(elements);
    const fileName = 'saveFile.json';
    
    const blob = new Blob([jsonData], { type: 'application/json' });

    if (window.navigator.msSaveOrOpenBlob) {
      // For IE browser
      window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();

      // For other browsers
      URL.revokeObjectURL(link.href);
    }
  };
  return (
    <div className="card flex justify-content-center">
      <Button type="button" icon={getSVGIcon("save")} onClick={handleSave} />
    </div>
  );
}
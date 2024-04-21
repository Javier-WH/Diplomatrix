import './UploadImage.css';
import getSVGIcon from '../../../../icons/iconList';
import { MainContext } from '../../../../contexts/mainContext';
import { useContext } from 'react';

export default function UploadImage() {

  const { setNewElemntData } = useContext(MainContext);
  
  const handleFileLoad = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      //const url = URL.createObjectURL(file);
      const base64Data = reader.result.split(",")[1];
      const imageData = "data:image/" + file.type.split("/")[1] + ";base64," + base64Data;
  
      setNewElemntData({
        image: imageData,
        name: file.name ,
        imageWidth: 100,
        imageHeight: 100,
        type: "svg",
      })
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="custom-file-input">
      <input type="file" id="file-input" className="file-input" onChange={handleFileLoad} accept="image/*" />
      <label htmlFor="file-input" className="file-label">
        {getSVGIcon("newImage")}
      </label>
    </div>
  );
}

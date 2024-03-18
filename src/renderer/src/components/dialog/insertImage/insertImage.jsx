import { useEffect, useState, useContext } from 'react';
import { Dialog } from 'primereact/dialog';
import PropTypes from "prop-types"
import { MainContext } from '../../../contexts/mainContext';
import "./insertImage.css"
const { ipcRenderer } = window.require('electron');


export default function InsertImage({ visible, setVisible }) {

  const [imgList, setImgList] = useState([]);
  const { setNewElemntData } = useContext(MainContext);

  useEffect(() => {
    ipcRenderer.send('getAssetsList');
  }, []);

  useEffect(() => {
    const handleFileList = (event, assetList) => {
      setImgList(assetList)
    };

    ipcRenderer.on('assetList', handleFileList);

    return () => {
      ipcRenderer.removeListener('assetList', handleFileList);
    };
  }, []);

  const onClick = ({image, name})=>{
    setNewElemntData({
      image,
      name,
      imageWidth: 100,
      imageHeight: 100,
      type: "svg"
    })
  }


  return (
    <div className="card flex justify-content-center">
      <Dialog header="Insertar Imagenes" modal={false} visible={visible} style={{ width: '350px', height:'600px' }} onHide={() => setVisible(false)}>
       <div id='insertImage-imageContainer'>
        {
          
          imgList.map((asset) =>{ 
            const {name, img} = asset
            return < img key={name} src={img} className='insertImage-img' onClick={() => onClick({image: img, name})} />
          })
        }
       </div>
        
      </Dialog>
    </div>
  )
}

InsertImage.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func
};
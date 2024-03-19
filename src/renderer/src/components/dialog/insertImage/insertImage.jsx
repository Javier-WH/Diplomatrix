import { useEffect, useState, useContext } from 'react';
import { Dialog } from 'primereact/dialog';
import PropTypes from "prop-types"
import { MainContext } from '../../../contexts/mainContext';
import "./insertImage.css"
import FilterButons from './filterImageButons';
const { ipcRenderer } = window.require('electron');


export default function InsertImage({ visible, setVisible }) {

  const [imgList, setImgList] = useState([]);
  const [category, setCategory] = useState();
  const { setNewElemntData, selectedElement, setSelectedElement } = useContext(MainContext);

  //con esto se solicita al entorno de electron que genere una lista de los assets
  useEffect(() => {
    ipcRenderer.send('getAssetsList');
  }, []);

  //aqui se captura la lista de los assets y se almacena en el estado
  useEffect(() => {
    const handleFileList = (event, assetList) => {
      setImgList(assetList)
    };

    ipcRenderer.on('assetList', handleFileList);

    return () => {
      ipcRenderer.removeListener('assetList', handleFileList);
    };
  }, []);

  //cuando se da click sobre el elemento, genera unaa nueva imagen a agregar
  const onClick = ({image, name})=>{
    setNewElemntData({
      image,
      name,
      imageWidth: 100,
      imageHeight: 100,
      type: "svg"
    })
  }

  //cuando se pisa escape, resetea el nuevo elemento a agregar
  const cancelSelection = () =>{
    setNewElemntData(null)
    setSelectedElement(null)
  }

  window.addEventListener('keydown', cancelSelection);

  return (
    <div className="card flex justify-content-center">
      <Dialog header="Insertar Imagenes" modal={false} closeOnEscape={false}  visible={visible} style={{ width: '400px', height:'600px' }} onHide={() => setVisible(false)}>
        <FilterButons category={category} setCategory={setCategory}/>
       <div id='insertImage-imageContainer'>
        {
    
          imgList.filter(asset=>{
            if(category === undefined){
              return asset
            }
            const { name} = asset
            const info = name.split("#")

            if(category.code === info[0]){
              return asset
            }
          })
          .map((asset) =>{ 
            const {name, img} = asset
            const info = name.split("#")
            const title = info[1]
            return < img key={name} src={img} title={title} className='insertImage-img' onClick={() => onClick({image: img, name}) } />
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
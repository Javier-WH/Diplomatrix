import { useContext, useEffect, useState} from 'react';
import { Dialog } from 'primereact/dialog';
import PropTypes from "prop-types"
import "./insertImage.css"
import FilterButons from './filterImageButons';
import { MainContext } from '../../../contexts/mainContext';
import { MenuContext } from '../../../contexts/menuContext';
import Filter from './filter';
const { ipcRenderer } = window.require('electron');


export default function InsertImage() {
 

  const { setNewElemntData } = useContext(MainContext)
  const { showInsertImage: visible, setShowInsertImage:setVisible } =useContext(MenuContext)
  const [imgList, setImgList] = useState([]);
  const [filterList, setFilterList] = useState([])

  /*
  //con esto se solicita al entorno de electron que genere una lista de los assets
  useEffect(() => {
    ipcRenderer.send('getAssetsList');
  }, []);*/

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
      type: "svg",

    })
  }

  //cuando se pisa escape, resetea el nuevo elemento a agregar
  useEffect(() => {
    const cancelSelection = (e) =>{
      if (e.key === 'Escape'){
        setNewElemntData(null)
      }
    }
    window.addEventListener('keydown', cancelSelection);

    return () => {
      window.removeEventListener('keydown', cancelSelection);
    };
  }, []);


  return (
    <div className="card flex justify-content-center">
      <Dialog header="Insertar Imagenes" modal={false} closeOnEscape={false} visible={visible} style={{ width: '25%', height: '70%' }} position='right' onHide={() => setVisible(false)}>
       
        <Filter filterList={filterList} setFilterList ={setFilterList} />

       <div id='insertImage-imageContainer'>
        {
          filterImagesByCategories(imgList, filterList)
          .map((asset) =>{ 
            const {name, img} = asset
            const info = name.split("#")
            const title = info[info.length -1]
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
  setVisible: PropTypes.func,
  setNewElemntData: PropTypes.func
};

/*function filterImagesByCategories(images, categories) {
  if(categories.length === 0) return images
  return images.filter(image => {
    const imageCategories = image.name.split('#');
    return imageCategories.some(category => categories.some(cat => cat.toLowerCase() === category.toLowerCase().replace(".svg", "")));
  });
}*/


function filterImagesByCategories(images, categories) {
  if (categories.length === 0) return images;
  return images.filter(image => {
    const imageCategories = image.name.split('#');
    return imageCategories.some(category => {
      const formattedCategory = category.toLowerCase().replace(".svg", "");
      return categories.some(cat => formattedCategory.includes(cat.toLowerCase()));
    });
  });
}


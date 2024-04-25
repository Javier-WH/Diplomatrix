import { useContext, useEffect, useState } from 'react'
import ToolBar from './components/menu/toolBar'
import Sheet from './components/sheet/sheet'
import StatusBar from './components/statusBar/statusBar'
import { MainContext } from './contexts/mainContext'
import { milimeterToPixel } from './utils/fucntions'
import SheetSizeDialog from './components/dialog/configSheet/dialog/sheetConfigDialog'
import GenerateImgDialog from './components/dialog/generateDiplom/dialog/GenerateDialog'
import './app.css'


function App() {

  const { sheetStyle } = useContext(MainContext)
  const [ marginStyle, setMarginStyle ] = useState()


  //este useefect se encarga de graduar cuando se hace zoom
  useEffect(()=>{
    if(!sheetStyle) return

    //se obtienen los parametros de la hoja 
    const scale = sheetStyle?.scale
    const _width = sheetStyle.width.replace("cm", "")
    const _height = sheetStyle.height.replace("cm", "")

    //se obtienen los parametros de la pantalla y se convierten a pixeles los parametros dados en cm
    const sheetWidth = milimeterToPixel(_width * 10 * scale)
    const screenWidh = window.innerWidth;

    const sheetHeight = milimeterToPixel(_height * 10 * scale)
    const screenHeight = window.innerHeight;

    //esta es la condición que se debe cumplir para aplicar los cambios
    const isIncreaseWidthNeeded = sheetWidth > screenWidh - 5 
    const isIncreaseHeigthNeeded = sheetHeight > screenHeight - 120

    //estos son los parametros que mejor sirvieron para ajustar el zoom
    setMarginStyle({
     
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      overflow: 'hidden',
      height: isIncreaseHeigthNeeded ? (scale * 100 + sheetHeight) + "px" : "100%",
      width: isIncreaseWidthNeeded ? (scale * 100 + sheetWidth) + "px" : "100%",
      //paddingLeft: isIncreaseWidthNeeded ? (scale * 80) + "px" : "0",
 
    })

    /*
    //con esto el scroll se queda en el centro cuando se hace zoom
    let scrollPanel = document.getElementById("scroll-container");
    if (isIncreaseHeigthNeeded){
      let scrollHeight = scrollPanel.scrollHeight;
      let clientHeight = scrollPanel.clientHeight;
      let scrollPosition = scrollHeight / 2 - clientHeight / 2;
      scrollPanel.scrollTop = scrollPosition;
    }
    if (isIncreaseWidthNeeded){
      let scrollWidth = scrollPanel.scrollWidth;
      let clientWidth = scrollPanel.clientWidth;
      let scrollPositionX = scrollWidth / 2 - clientWidth / 2;
      scrollPanel.scrollLeft = scrollPositionX;
    }*/
  },[sheetStyle])

  return <>
    <div id='app-main-containert'>
      <div id='toolbar-menu-main-container'>
        <ToolBar/>
      </div>
      <div id='scroll-container'>
        <div id='sheet-container' style={marginStyle}>
          <Sheet />
        </div>
      </div>
      <div id='statusBar-container'>
        <StatusBar />
      </div>

    </div>
    
    <SheetSizeDialog/>
    <GenerateImgDialog/>
  </>

}

export default App

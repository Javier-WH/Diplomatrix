import ToolBar from './components/menu/toolBar'
import Sheet from './components/sheet/sheet'
import './app.css'

function App() {

  return <>
    <div id='app-main-containert'>
      <div id='toolbar-menu-main-container'>
        <ToolBar/>
      </div>
      <div id='sheet-container'>
        <Sheet />
      </div>
    </div>
  </>

}

export default App

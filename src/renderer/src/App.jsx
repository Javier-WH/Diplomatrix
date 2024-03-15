import MenuBar from './components/menu/menuBar'
import Sheet from './components/sheet/sheet'
import './app.css'

function App() {

  return <>
    <MenuBar />
    <div id='sheet-container'>
      <Sheet />
    </div>
  </>

}

export default App

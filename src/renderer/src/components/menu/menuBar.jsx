import { Menubar } from 'primereact/menubar'
import File from './menu/File'
import Edit from './menu/Edit'
import Help from './menu/Help'
import SheetC from './menu/sheetC'

export default function MenuBar() {
  const items = [
    File(),
    Edit(),
    SheetC(),
    Help(),
  ]
  
  
  return (
    <div className="card" id='menu-bar'>
    <Menubar model={items} />
    </div>
    )
  }
  
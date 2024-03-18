import { useState } from 'react'
import { Menubar } from 'primereact/menubar'
import InsertImage from '../dialog/insertImage/insertImage'

import File from './menu/File'
import Edit from './menu/Edit'
import Help from './menu/Help'
import SheetC from './menu/sheetC'


export default function MenuBar() {

  const [ showInsertImage, setShowInsertImage ] = useState(false);



  const items = [
    File(),
    Edit({ setShowInsertImage }),
    SheetC(),
    Help(),
  ]
  
  
  return (
    <div className="card" id='menu-bar'>
    <Menubar model={items} />

      <InsertImage visible={showInsertImage} setVisible={setShowInsertImage} />
    </div>
    )
  }
  
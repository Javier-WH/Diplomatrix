import { Dialog } from 'primereact/dialog';
import PropTypes from "prop-types"
import FontSelector from './editTextComponets/fontSelector';
import FontSizeSelector from './editTextComponets/fontSizeSelector';
import { MenuContext } from '../../../contexts/menuContext';
import { useContext } from 'react';
import "./editTextStyles.css"

export default function EditText() {

  const { showEditText: visible, setShowEditText:setVisible } = useContext(MenuContext)

  return (
    <div className="card flex justify-content-center">
      <Dialog header="Editar Texto" modal={false} closeOnEscape={false} visible={visible} style={{ width: '25%', height: '70%' }} position='right' onHide={() => setVisible(false)}>
        <div id='editText-main-container'>
          <div className='editText-component-container'>
            <label className='editText-componet-Label'>Fuente</label>
            <FontSelector />
          </div>
          <div className='editText-component-container'>
            <label className='editText-componet-Label'>Tamaño de Fuente</label>
            <FontSizeSelector />
          </div>
        </div>
      </Dialog>
    </div>
  )
}

EditText.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  elements: PropTypes.array,
  selectedElement: PropTypes.number
};
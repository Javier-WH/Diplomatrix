import { Dialog } from 'primereact/dialog';
import PropTypes from "prop-types"
import FontSelector from './editTextComponets/fontSelector';

export default function EditText({ visible, setVisible, elements, selectedElement }) {

  return (
    <div className="card flex justify-content-center">
      <Dialog header="Editar Texto" modal={false} closeOnEscape={false} visible={visible} style={{ width: '25%', height: '70%' }} position='right' onHide={() => setVisible(false)}>
        <label>Fuente</label>
        <FontSelector />
  
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
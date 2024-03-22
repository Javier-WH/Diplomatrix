import { Dialog } from 'primereact/dialog';
import PropTypes from "prop-types"
import { useEffect, useState } from 'react';

export default function EditText({ visible, setVisible, elements, selectedElement }) {


  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    // Obtiene la lista de fuentes disponibles en el navegador
    const allFonts = document.fonts;

    // Convierte la colección de fuentes a un array
    const fontArray = Array.from(allFonts).map(fontFace => fontFace.family);

    // Establece el estado con el array de fuentes
    setFonts(fontArray);
  }, []);

  return (
    <div className="card flex justify-content-center">
      <Dialog header="Editar Texto" modal={false} closeOnEscape={false} visible={visible} style={{ width: '25%', height: '70%' }} position='right' onHide={() => setVisible(false)}>
        <div>
          <h1>Lista de fuentes disponibles:</h1>
          <ul>
            {fonts.map((font, index) => (
              <li key={index}>{font}</li>
            ))}
          </ul>
        </div>
  
      </Dialog>
    </div>
  )
}

EditText.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  elements: PropTypes.array,
  selectedElement: PropTypes.func
};
import { useContext } from "react"
import { MainContext } from "../../../contexts/mainContext"

export default function Edit({ setShowInsertImage }) {

  const { setNewElemntData } = useContext(MainContext)


  return {
    label: 'Edición',
    icon: 'pi pi-file-edit',
    items: [
      {
        label: 'Insertar Imagen',
        icon: 'pi pi-images',
        command: () => setShowInsertImage(true)
      },
      {
        label: 'Insertar Texto',
        icon: 'pi pi-comment',
        command: () => {
    
        }
      },
      {
        label: 'Cambiar Filtro',
        icon: 'pi pi-sliders-h',
        command: () => { }
      },
      {
        label: 'Insertar Marcos',
        icon: 'pi pi-stop',
        command: () => { }
      },
      {
        label: 'Cambiar Fondo',
        icon: 'pi pi-ticket',
        command: () => { }
      },
    ]
  }
}
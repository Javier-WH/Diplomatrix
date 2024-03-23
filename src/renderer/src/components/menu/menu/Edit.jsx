import { useContext } from "react"
import { MainContext } from "../../../contexts/mainContext.jsx"
import { MenuContext } from "../../../contexts/menuContext.jsx";

export default function Edit() {

  const {setNewElemntData } = useContext(MainContext);
  const { setShowInsertImage, showInsertImage, showEditText, setShowEditText } = useContext(MenuContext)

  return {
    label: 'Edición',
    icon: 'pi pi-file-edit',
    items: [
      {
        label: 'Insertar Imagen',
        icon: showInsertImage ? "pi pi-check" :'pi pi-images',
        command: () => setShowInsertImage(true)
      },
      {
        label: 'Insertar Texto',
        icon: 'pi pi-comment',
        command: ()=>{
          setNewElemntData({
            content: "Dobleclick para modificar el texto",
            imageWidth: 260,
            imageHeight: 25,
            type: "txt",
          })
        }
      },
      {
        label: 'Editar Texto',
        icon: showEditText ? "pi pi-check" : 'pi pi-pencil',
        command: () => setShowEditText(true)
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
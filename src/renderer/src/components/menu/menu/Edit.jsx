import { useContext } from "react"
import { MainContext } from "../../../contexts/mainContext.jsx"


export default function Edit() {

  
  const { setShowInsertImage, setNewElemntData } = useContext(MainContext);

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
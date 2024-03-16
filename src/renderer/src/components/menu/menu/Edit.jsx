import { useContext } from "react"
import { MainContext } from "../../../contexts/mainContext"


export default function Edit() {

  const { setNewElemntData } = useContext(MainContext)

  return {
    label: 'Edición',
    icon: 'pi pi-file-edit',
    items: [
      {
        label: 'Insertar Imagen',
        icon: 'pi pi-images',
        command: () => {
          setNewElemntData({
            image: "../../appAssets/borders/java-4.svg",
            imageWidth: 100,
            imageHeight: 100,
            type: "svg"
          })
        }
      },
      {
        label: 'Insertar Texto',
        icon: 'pi pi-comment',
        command: () => {
          setNewElemntData({
            image: "../../assets/electron.svg",
            imageWidth: 100,
            imageHeight: 100,
            type: "svg"
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
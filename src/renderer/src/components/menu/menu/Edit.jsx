
export default function Edit() {

  return {
    label: 'Edición',
    icon: 'pi pi-file-edit',
    items: [
      {
        label: 'Insertar Imagen',
        icon: 'pi pi-images',
        command: () => { alert('hola') }
      },
      {
        label: 'Insertar Texto',
        icon: 'pi pi-comment',
        command: () => { }
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

export default function File(){

  return {
    key:"dfsdf",
    label: 'Archivo',
    icon: 'pi pi-file',
    items: [
      {
        key: "ddsad",
        label: 'Nuevo',
        icon: 'pi pi-plus',
        command: () => { alert('hola') }
      },
      {
        key: "df23e",
        label: 'Guardar',
        icon: 'pi pi-save',
        command: () => {}
      },
      {
        key: "wqe",
        label: 'Abrir',
        icon: 'pi pi-folder-open',
        command: () => { }
      },
      {
        key: "dfsdewqe",
        label: 'Imprimir',
        icon: 'pi pi-print',
        command: () => { }
      },
      {
        key: "dfsdf22",
        label: 'Crear Imagen',
        icon: 'pi pi-image',
        command: () => { }
      }, 
      {
        key: "dfsdfswdlkk",
        separator: true
      },
      {
        key: "dfsd23213213d",
        label: 'Salir',
        icon: 'pi pi-sign-out',
        command: () => { }
      },
    ]
  }
}
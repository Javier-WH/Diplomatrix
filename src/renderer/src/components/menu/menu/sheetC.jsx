
export default function SheetC() {

  return {
    label: 'Hoja',
    icon: 'pi pi-tablet',
    items: [
      {
        label: 'Tamaño',
        icon: 'pi pi-tablet',
        command: () => { alert('hola') }
      },
      {
        label: 'Fondo',
        icon: 'pi pi-image',
        command: () => { }
      },
      {
        label: 'Bordes',
        icon: 'pi pi-bookmark',
        command: () => { }
      }
    ]
  }
}
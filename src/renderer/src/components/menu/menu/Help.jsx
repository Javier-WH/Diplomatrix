
export default function Help() {

  return {
    label: 'Ayuda',
    icon: 'pi pi-question',
    items: [
      {
        label: 'Acerca del software',
        icon: 'pi pi-home',
        command: () => { alert('hola') }
      }
    ]
  }
}
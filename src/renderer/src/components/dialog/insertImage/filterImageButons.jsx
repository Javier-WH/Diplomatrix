

import { Dropdown } from 'primereact/dropdown';

export default function FilterSelector({ category, setCategory }) {

  const cities = [
    { name: 'Logos', code: 'logo' },
    { name: 'Marcos', code: 'mark' },
    { name: 'Esquinas', code: 'corner' },
    { name: 'Banderas', code: 'flag' },
    { name: 'Animales', code: 'animal' }
  ];

  return (
    <div className="card flex justify-content-center" id="image-selector-container">
      <Dropdown value={category} onChange={(e) => setCategory(e.value)} options={cities} optionLabel="name"
        showClear placeholder="Selecciona una Categoría" className="w-full md:w-14rem" style={{width: '100%'}} />
    </div>
  )
}

import { MainContext } from "../../../../contexts/mainContext"
import { useContext, useState, useEffect } from "react"
import { Dropdown } from 'primereact/dropdown';
export default function SheetSize(){
  
  const { sheetStyle, setSheetStyle } = useContext(MainContext)
  const [selectedSize, setSelectedSize] = useState(null);
  const { orientation, setOrientation } = useState(sheetStyle?.orientation ?? "landscape");

  const sizes = [
    { name: 'Carta', code: {width: "21,6cm",height: "27,9cm"}},
    { name: 'Oficio <Legal>', code: { width: "21,6cm", height: "35,6cm" } },
    { name: 'Folio', code: { width: "22cm", height: "34cm" } },
    { name: 'tabloide', code: { width: "27,9cm", height: "43,1cm" } },
  ];

  useEffect(()=>{
   getSelectedSize({ sheetStyle, sizes })
  },[selectedSize])

  return<>
    <div className="card flex justify-content-center">
      <Dropdown value={selectedSize} onChange={(e) => setSelectedSize(e.value)} options={sizes} optionLabel="name"
        placeholder="Selecciona un Tamaño" className="w-full md:w-14rem" />
    </div>
  </>
}

function getSelectedSize({sheetStyle, sizes}){

  const orientation = sheetStyle?.orientation ?? "landscape";
  const height = sheetStyle?.height ?? "27,9cm";
  const width = sheetStyle?.width ?? "21,6cm";

  const result = sizes.find(size => {
  
    if (orientation === "landscape"){
      return size.code.width === height && size.code.height === width
    }else{
      return size.code.width === width && size.code.height === height
    }

  });

  return result ?? null;

}
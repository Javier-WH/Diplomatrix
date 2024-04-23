import { MainContext } from "../../../../contexts/mainContext"
import { useContext, useState, useEffect } from "react"
import "./sheetSize.css"

export default function SheetSize() {
  const sizes = [
    { name: 'Carta', code: { width: "21.6cm", height: "27.9cm" } },
    { name: 'Oficio <Legal>', code: { width: "21.6cm", height: "35.6cm" } },
    { name: 'Folio', code: { width: "22cm", height: "34cm" } },
    { name: 'tabloide', code: { width: "27.9cm", height: "43.1cm" } },
  ];

  const { sheetStyle, setSheetStyle } = useContext(MainContext)
  const [selectedSize, setSelectedSize] = useState(getSelectedSize({ sheetStyle, sizes }));
  const [orientation, setOrientation] = useState(sheetStyle?.orientation ?? "landscape");

  useEffect(() => {
    if (!selectedSize) return
    const { width, height } = selectedSize.code

    const _sheetStyle = JSON.parse(JSON.stringify(sheetStyle));
    _sheetStyle.width = orientation === "landscape" ? height : width
    _sheetStyle.height = orientation === "landscape" ? width : height
    setSheetStyle(_sheetStyle)
  }, [selectedSize, orientation])


  useEffect(() => {
    setOrientation(sheetStyle?.orientation ?? "landscape")
  }, [sheetStyle])

  return <div className = "sheetSizeSelector-container">
    <span >Tamaño</span>
    <select value={selectedSize?.name} onChange={(e) => setSelectedSize(sizes.find(size => size.name === e.target.value))} >
      {
        sizes.map(size => <option key={size.name} value={size.name}>{size.name}</option>)
      }
    </select>
  </div>
}

function getSelectedSize({ sheetStyle, sizes }) {
  const orientation = sheetStyle?.orientation ?? "landscape";
  const height = sheetStyle?.height ?? "27.9cm";
  const width = sheetStyle?.width ?? "21.6cm";

  const result = sizes.find(size => {
    const { width: sizeWidth, height: sizeHeight } = size.code;

    if (orientation === "landscape") {
      return width === sizeHeight && height === sizeWidth
    } else {
      return width === sizeWidth && height === sizeHeight
    }
  });

  return result ?? { name: 'Carta', code: { width: "21.6cm", height: "27.9cm" } }

}



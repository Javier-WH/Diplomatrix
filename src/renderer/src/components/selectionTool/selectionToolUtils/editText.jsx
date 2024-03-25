import { useContext, useEffect, useState} from "react"
import { MainContext } from "../../../contexts/mainContext";
import { InputText } from "primereact/inputtext";
import PropTypes from "prop-types"
import "./editText.css"

export default function EditText({ op }){

  const { selectedElement, elements, setElements } = useContext(MainContext);
  const [value, setValue] = useState('');
  const [text, setText] = useState('')

  //cuando se pisa la techa enter, se cambia el valor de text
  const onKeyPress = (e) =>{
    if(e.key === "Enter"){
      setText(value)
      op.current.hide()
    }
  }

  //cuando se cambia el valor de text, se actualiza el elemento
  useEffect(()=>{
    if (text.length === 0) return
    let _elements = JSON.parse(JSON.stringify(elements));
    _elements[selectedElement].header.content = text
    setElements(_elements)
  },[text])


  //actualiza el valor de value, si el elemento tiene un texto
  useEffect(()=>{
    let _elements = JSON.parse(JSON.stringify(elements));
    let content = _elements[selectedElement].header.content
    if (content === "Dobleclick para modificar el texto"){
      content = ""
    }
    setValue(content)


  },[])

  return <div id="editText-overlay-panel-container">
    <span>Debe pisar enter para que el texto se actualice</span>
    <InputText value={value} onChange={(e) => setValue(e.target.value)} onKeyPress={onKeyPress} style={{width:"100%"}} />
  </div>

}

EditText.propTypes = {
  op: PropTypes.object
};
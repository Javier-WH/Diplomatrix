import { Slider } from "primereact/slider";
import { InputNumber } from 'primereact/inputnumber';
import PropTypes from "prop-types"
import "./RangeValue.css"


export default function RangeValue({value, setValue, min = 0, max = 100, title =""}){
  
  return <div className="range-value">
    <span className="range-value-title">{title}</span>
    <InputNumber value={value} onValueChange={(e) => setValue(e.value)} mode="decimal" showButtons inputStyle={{ width: "100%" }} min={min} max={max} />
    <Slider value={value} onChange={(e) => setValue(e.value)} className="w-full" style={{ width: "100%" }} min={min} max={ max} />
  </div>


}


RangeValue.propTypes = {
  value: PropTypes.number,
  setValue: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  title: PropTypes.string
};


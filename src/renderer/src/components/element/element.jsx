import PropTypes from "prop-types"
import './element.css'

export default function Element({ elemetData }) {

  const { header, style } = elemetData
  const { image, index} = header

  return <div id={`element-${index}`} style={style}>
    <img src={image} alt="" className="element-img" />
  </div>

}

Element.propTypes = {
  elemetData: PropTypes.object
};

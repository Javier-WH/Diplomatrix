import PropTypes from "prop-types"
import './element.css'
import { useEffect, useState } from "react";

export default function Element({ elemetData }) {

  const { header, style } = elemetData
  const { image, index} = header

  const [img, setImg] = useState()

  useEffect(() => {
    const imgURL = new URL(image, import.meta.url).href
    setImg(imgURL)
  }, [image])


  return <div id={`element-${index}`} style={style}>
    <img src={img} alt="" className="element-img" />
  </div>

}

Element.propTypes = {
  elemetData: PropTypes.object
};

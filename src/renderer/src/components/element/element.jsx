import PropTypes from "prop-types"
import './element.css'
import { useEffect, useState } from "react";

export default function Element({ style, imgAddress, iden }) {

  const [img, setImg] = useState(imgAddress)

  useEffect(() => {
    const imgURL = new URL(imgAddress, import.meta.url).href
    setImg(imgURL)
  }, [imgAddress])


  return <div id={iden} style={style}>
    <img src={img} alt="" className="element-img" />
  </div>

}

Element.propTypes = {
  style: PropTypes.object,
  iden: PropTypes.number,
  imgAddress: PropTypes.string
};

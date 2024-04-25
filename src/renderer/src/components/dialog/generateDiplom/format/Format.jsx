import "./format.css"
import PropTypes from "prop-types";

export default function Format({ format, setFormat }) {
  const handleFormatChange = (event) => {
    const selectedValue = event.target.value;
    setFormat(selectedValue);
  };

  return (

    <div id="format-selector-image-generator-main-container">
      <span>Formato</span>
      <select name="" id="format-selector-image-generator" value={format} onChange={handleFormatChange}>
        <option value="toJpeg">JPEG</option>
        <option value="toPng">PNG</option>
        <option value="toSvg">SVG</option>
      </select>
    </div>

  );
}

Format.propTypes = {
  format: PropTypes.string.isRequired,
  setFormat: PropTypes.func.isRequired,
};

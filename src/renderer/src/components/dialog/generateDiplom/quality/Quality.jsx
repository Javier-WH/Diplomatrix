import "./quality.css"
import PropTypes from "prop-types";

export default function Quality({ quality, setQuality }) {
  const handleQualityChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    setQuality(selectedValue);
  };

  return (
    <div id="quality-selector-image-generator-main-container">
      <span>Calidad</span>
      <select name="" id="quality-selector-image-generator" value={quality} onChange={handleQualityChange}>
        <option value="1">Baja</option>
        <option value="5">Media</option>
        <option value="10">Alta</option>
        <option value="12">Superior</option>
        <option value="15">Maxima</option>
      </select>
    </div>
  );
}

Quality.propTypes = {
  quality: PropTypes.number.isRequired,
  setQuality: PropTypes.func.isRequired,
};

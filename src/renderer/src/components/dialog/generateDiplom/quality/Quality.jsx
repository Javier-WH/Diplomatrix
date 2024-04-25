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
        <option value="0.2">Baja</option>
        <option value="0.4">Media</option>
        <option value="0.6">Alta</option>
        <option value="0.8">Superior</option>
        <option value="1">Maxima</option>
      </select>
    </div>
  );
}

Quality.propTypes = {
  quality: PropTypes.number.isRequired,
  setQuality: PropTypes.func.isRequired,
};

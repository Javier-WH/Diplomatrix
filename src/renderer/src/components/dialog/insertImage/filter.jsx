import PropTypes from 'prop-types';
import { Chips } from "primereact/chips";

export default function Filter({ filterList, setFilterList }) {
  return (
    <div className="card p-fluid">
      <Chips 
        value={filterList} 
        onChange={e => setFilterList(e.value)} 
      />
    </div>
  )
}

Filter.propTypes = {
  filterList: PropTypes.array.isRequired,
  setFilterList: PropTypes.func.isRequired,
};

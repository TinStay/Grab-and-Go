

const FilterSelect = (props) => {
    return (
        <div className="col-6 my-2">
          <p className="mb-2">{props.label}</p>
          <select className="w-100">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
    )
}

export default FilterSelect

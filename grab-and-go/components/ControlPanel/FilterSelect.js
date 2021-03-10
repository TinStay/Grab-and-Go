import React from 'react'

const FilterSelect = () => {
    return (
        <div className="col-6">
          <p className="mb-2">Store type</p>
          <select className="w-100">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
    )
}

export default FilterSelect

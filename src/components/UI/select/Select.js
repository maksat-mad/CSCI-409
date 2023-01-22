import React from 'react';
import './Select.css';

const Select = ({options, defaultValue, value, onChange}) => {
    return (
        <select
            id={"my-select"}
            value={value}
            onChange={event => event.target.value}
        >
            <option disabled value="">{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default Select;
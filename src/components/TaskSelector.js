import React, { useState } from 'react';
import Select from 'react-select';

const TaskSelector = ({options, onChange}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (e) => {
        setSelectedOption(e);
        onChange(e);
    }

    return (
        <Select
            defaultValue={selectedOption}
            onChange={handleChange}
            options={options}
            getOptionLabel={o => o.name}
            getOptionValue={o => o.name}
        />
    );
}

export default TaskSelector;

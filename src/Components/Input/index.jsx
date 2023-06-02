import React from 'react';

import './index.css';

const Input = ({value, setValue, placeholder}) => {
    const changeValue = (e) => {
        setValue(e.target.value);
    }

    return (
        <div className="input__inner">
            {placeholder && <p className="input__placeholder">{placeholder}</p>}

            <input type="text" className="input default__input input__value" value={value} onChange={changeValue} />
        </div>
    )
}

export default Input;
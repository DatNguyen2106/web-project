import React from "react";
const InputRow = (props) => {
    return (
        <div className="form-content-row">
            <label>{props.label}</label>
            <input
                type="text" 
                value={props.value}
                disabled={props.isDisabled}
                onChange={(e) => props.changeContent(props.field, e.target.value)}>
            </input>
            <div className="form-content-row-error">{props.error}</div>
        </div>
    );
};

export default InputRow;
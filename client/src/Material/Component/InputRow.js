import React from "react";
const InputRow = (props) => {
    const render = () => {
        if(props.isDisabled==="disabled"){
            return(
                <div>
                    {props.type === "select" ? props.listContent.find(x => x.key===props.defaultValue).label : (props.value ? props.value : "")}
                </div>
            )
        }else if (props.type === "select"){
            return(
                <select value={props.defaultValue} onChange={props.field ? (e) => props.changeContent(props.field, e.target.value) : (e) => props.changeContent(props.field1, props.field2, e.target.value)}>
                    <option value="" style={{display: "none"}}></option>
                    {props.listContent.map((option) => (
                        <option value={option.key} key={option.key}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )
        }else{
            return(
                <input
                    type={props.type ? props.type : "text"}
                    value={props.value ? props.value : ""}
                    disabled={props.isDisabled}
                    onChange={props.field ? (e) => props.changeContent(props.field, e.target.value) : (e) => props.changeContent(props.field1, props.field2, e.target.value)}>
                </input>
            )
        }
    }

    return (
        <div className="form-content-row">
            <label>{props.label}</label>
            {render()}
            <div className="form-content-row-error">{props.error ? props.error : ""}</div>
        </div>
    );
};

export default InputRow;
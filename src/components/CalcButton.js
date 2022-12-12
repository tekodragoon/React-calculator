import React from "react";

function CalcButton(props) {
  const cl = props.isFunc ? "calc-btn spc-key" : "calc-btn";
  return (
    <button type="button" className={cl} onClick={props.func}>
      {props.text}
    </button>
  );
}

export default CalcButton;

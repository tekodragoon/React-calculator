import React from "react";

function ResetButton(props) {
  return (
    <button id="reset-btn" type="button" className={"calc-btn spc-key"} onClick={props.func}>
      {props.text}
    </button>
  );
}

export default ResetButton;

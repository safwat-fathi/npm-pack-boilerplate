import React from "react";
// import st from "./Button.module.scss";
import "./Button.scss";

const Button = ({ props }: any) => {
  return (
    <button className="btn" onClick={() => console.log("111111111")} {...props}>
      477777777777
    </button>
  );
};

export default Button;

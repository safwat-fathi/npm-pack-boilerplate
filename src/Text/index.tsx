import React from "react";
import ff from "./Text.module.scss";

const Text = ({ value }: { value: string }) => {
  return <p className={ff.text}>{value}</p>;
};

export default Text;

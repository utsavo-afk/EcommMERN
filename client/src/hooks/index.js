import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => setValue("");

  return {
    type,
    value,
    onChange,
    reset,
  };
};

export const useFileField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => setValue(event.target.files[0]);

  const reset = () => setValue("");

  return {
    type,
    value,
    onChange,
    reset,
  };
};

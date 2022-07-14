import { useState } from "react";

export const useForm = (initialFieldValues) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return { values, setValues, handleInputChange, errors, setErrors };
};

export const Form = (props) => {
  return <form autoComplete="off">{props.children}</form>;
};

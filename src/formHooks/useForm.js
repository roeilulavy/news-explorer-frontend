import { useState, useCallback } from 'react';

export function useForm() {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    search: '',
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: event.target.validationMessage});
    setIsValid(event.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { handleChange, values, setValues, isValid, errors, resetForm };
}

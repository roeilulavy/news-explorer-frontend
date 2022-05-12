import './SignInPopup.css';
import React, { useState, useEffect } from "react";
import { useForm } from '../../formHooks/useForm';
import { PopupWithForm } from "../PopupWithForm/PopupWithForm";

export function SignInPopup({ isOpen, onClose, onSignIn, handleSignupPopup }) {

  const { handleChange, values, isValid, errors, resetForm } = useForm();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onSignIn(email, password);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="sign-in"
      title="Sign in"
      buttonText="Sign in"
      onSubmit={handleSubmit}
      linkText="Sign up"
      handlePopup={handleSignupPopup}
      isValid={isValid}
    >

      <label className='popup__label' htmlFor='email'>Email</label>

      <input
        className="popup__input"
        id="signin-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Enter email"
        value={values.email || ''}
        onChange={(e) => {
          setEmail(e.target.value);
          handleChange(e);
        }}
        required
      />

      <span 
        id="input_type_email-error"
        className="popup__error_visible"
      >
        {errors.email ? errors.email : ""}
      </span>


      <label className='popup__label' htmlFor='password'>password</label>

      <input
        className="popup__input"
        id="signin-password"
        name="password"
        type="password"
        autoComplete='password'
        placeholder="Enter password"
        value={values.password || ''}
        minLength={6}
        onChange={(e) => {
          setPassword(e.target.value);
          handleChange(e);
        }}
        required
      />

      <span 
        id="input_type_password-error"
        className="popup__error_visible"
      >
        {errors.password ? errors.password : ""}
      </span>

    </PopupWithForm>
  );
}

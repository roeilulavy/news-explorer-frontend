import './SignUpPopup.css';
import React, { useState, useEffect } from "react";
import { useForm } from '../../formHooks/useForm';
import { PopupWithForm } from "../PopupWithForm/PopupWithForm";

export function SignUpPopup({ isOpen, onClose, onSignUp, handleSigninPopup }) {
  
  const { handleChange, values, isValid, errors, resetForm } = useForm();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !username) {
      return;
    }
    onSignUp(email, password, username);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="sign-up"
      title="Sign up"
      buttonText="Sign up"
      onSubmit={handleSubmit}
      linkText="Sign in"
      handlePopup={handleSigninPopup}
      isValid={isValid}
    >

      <label className='popup__label' htmlFor='email'>Email</label>

      <input
        className="popup__input"
        id="signup-email"
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
        id="input_type_name-error"
        className="popup__error_visible"
      >
        {errors.email ? errors.email : ""}
      </span>


      <label className='popup__label' htmlFor='password'>password</label>

      <input
        className="popup__input"
        id="signup-password"
        name="password"
        type="password"
        autoComplete='off'
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

      <label className='popup__label' htmlFor='username'>Username</label>

      <input
        className="popup__input"
        id="signup-username"
        name="username"
        type="text"
        autoComplete='off'
        placeholder="Enter your Username"
        value={values.username || ''}
        minLength={2}
        onChange={(e) => {
          setUsername(e.target.value);
          handleChange(e);
        }}
        required
      />

      <span
        id="input_type_name-error"
        className="popup__error_visible"
      >
        {errors.username ? errors.username : ""}
      </span>

    </PopupWithForm>
  );
}
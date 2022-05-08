import './SignInPopup.css';
import React, { useState, useEffect } from "react";
import { PopupWithForm } from "../PopupWithForm/PopupWithForm";

export function SignInPopup({ isOpen, onClose, onSignIn, handleSignupPopup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isOpen]);

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
      handlePopup={handleSignupPopup}
      linkText="Sign up"
    >

      <label className='popup__label' htmlFor='email'>Email</label>

      <input
        className="popup__input"
        required
        autoComplete="email"
        id="signin-email"
        name="email"
        type="email"
        placeholder="Enter email"
        value={email || ''}
        onChange={(e) => setEmail(e.target.value)}
      />

      <span id="input_type_name-error" className="popup__error">Invalid email address</span>


      <label className='popup__label' htmlFor='password'>password</label>

      <input
        className="popup__input"
        required
        id="signin-password"
        name="password"
        type="password"
        placeholder="Enter password"
        value={password || ''}
        onChange={(e) => setPassword(e.target.value)}
      />

    </PopupWithForm>
  );
}

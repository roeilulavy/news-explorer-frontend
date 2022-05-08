import './SignUpPopup.css';
import React, { useState, useEffect } from "react";
import { PopupWithForm } from "../PopupWithForm/PopupWithForm";

export function SignUpPopup({ isOpen, onClose, onSignUp, handleSigninPopup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setUsername("");
  }, [isOpen]);

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
      handlePopup={handleSigninPopup}
      linkText="Sign in"
    >

      <label className='popup__label' htmlFor='email'>Email</label>

      <input
        className="popup__input"
        required
        autoComplete="email"
        id="signup-email"
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
        minLength={6}
        id="signup-password"
        name="password"
        type="password"
        placeholder="Enter password"
        value={password || ''}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label className='popup__label' htmlFor='username'>Username</label>

      <input
        className="popup__input"
        required
        minLength={2}
        id="signup-username"
        name="username"
        type="text"
        placeholder="Enter your Username"
        autoComplete='off'
        value={username || ''}
        onChange={(e) => setUsername(e.target.value)}
      />

      <span id="input_type_name-error" className="popup__error">This email is not available</span>

    </PopupWithForm>
  );
}
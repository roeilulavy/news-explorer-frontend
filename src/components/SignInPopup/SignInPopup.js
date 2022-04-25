import React, { useState } from "react";
import { PopupWithForm } from "../PopupWithForm/PopupWithForm";
import './SignInPopup.css';

export function SignInPopup({ isOpen, onClose, onSignInPopup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onSignInPopup(email, password);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="sign-in"
      title="Sign in"
      buttonText="sign in"
      onSubmit={handleSubmit}
      link="/signup"
      linkText="Sign in"
    >

      <div className="popup__input-section">
        <label className='popup__label' htmlFor='email'>Email</label>

        <input
          className="popup__input"
          required
          autoComplete="email"
          id="email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <span id="input_type_name-error" className="popup__error">Invalid email address</span>
      </div>

      <div className="popup__input-section">
        <label className='popup__label' htmlFor='password'>password</label>

        <input
          className="popup__input"
          required
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <span id="input_type_description-error" className="popup__error" />
      </div>
    </PopupWithForm>
  );
}

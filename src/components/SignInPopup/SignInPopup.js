import React, { useState } from "react";
import { Link } from "react-router-dom";

export function SignInPopup (props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    setEmail('');
    setPassword('');
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    props.onSignInPopup(email, password);
  }

  return (
    <div className="signInPopup">
      <p className="signInPopup__header">Sign in</p>
      <form onSubmit={handleSubmit} className="signInPopup__form">
        <p>Email</p>
        <input
          className="signInPopup__input"
          required
          id="email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          className="signInPopup__input"
          required
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="signInPopup__button"
        >
          Sign in
        </button>
      </form>
      <p className="signInPopup__signup">
        or{" "}
        <Link to="/signup" className="signInPopup__link">
          Sign up
        </Link>
      </p>
    </div>
  );
}
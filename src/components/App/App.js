import "./App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Routes, Route, Navigate } from "react-router-dom";
import { Main } from "../Main/Main";
import { SavedNews } from "../SavedNews/SavedNews";
import { Footer } from "../Footer/Footer";
import { SignInPopup } from "../SignInPopup/SignInPopup";
import { testData } from "../../utils/testData";
import * as auth from "../../utils/auth";
import api from "../../utils/api";
import { SignUpPopup } from "../SignUpPopup/SignUpPopup";
import { SuccessPopup } from "../SuccessPopup/SuccessPopup";

function App() {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("jwt");

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [openPage, setOpenPage] = useState('');
  const [isSearchResultOpen, setIsSearchResultOpen] = useState(false);

  const [isInfoTolltipOpen, setIsInfoTolltipPopup] = useState(false);
  const [isSignInPopup, setIsSignInPopup] = useState(false);
  const [isSignUpPopup, setIsSignUpPopup] = useState(false);
  const [isSuccessPopup, setIsSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [savedCardsData, setSavedCardsData] = useState(testData)
  const [allCardsData, setAllCardsData] = useState(testData)

  const navigator = useNavigate();

  const onLogin = (email, password) => {
    closeAllPopups();
    setIsLoggedIn(true);
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    setOpenPage('Home')
    navigator('/')
  };

  const onSignUp = () => {
    closeAllPopups();
    setSuccess(true);
    setIsSuccessPopup(true);
  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  React.useEffect(() => {
    setIsSearchResultOpen(false);
  }, []);

  function handleSigninPopup() {
    closeAllPopups();
    setIsSignInPopup(true);
  }

  function handleSignupPopup() {
    closeAllPopups();
    setIsSignUpPopup(true);
  }

  function closeAllPopups() {
    setIsSignInPopup(false);
    setIsSignUpPopup(false);
    setIsSuccessPopup(false);
  }

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={
              <>
                <Main
                  isLoggedIn={isLoggedIn}
                  handleLogout={onLogout}
                  openPage={openPage}
                  setOpenPage={setOpenPage}
                  isLoading={isLoading}
                  isSearchResultOpen={isSearchResultOpen}
                  handleSigninPopup={handleSigninPopup}
                />

                <SignInPopup
                  isOpen={isSignInPopup}
                  onClose={closeAllPopups}
                  handleSignupPopup={handleSignupPopup}
                  onSignIn={onLogin}
                />

                <SignUpPopup
                  isOpen={isSignUpPopup}
                  onClose={closeAllPopups}
                  handleSigninPopup={handleSigninPopup}
                  onSignUp={onSignUp}
                />

                <SuccessPopup 
                  isOpen={isSuccessPopup}
                  onClose={closeAllPopups}
                  handleSigninPopup={handleSigninPopup}
                />
              </>
            }
          />

          <Route path="/saved-news" element={
              <SavedNews 
                isLoggedIn={isLoggedIn}
                handleLogout={onLogout}
                openPage={openPage}
                setOpenPage={setOpenPage}
                savedCardsData={savedCardsData}
              />
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;

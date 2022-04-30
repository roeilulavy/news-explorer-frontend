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
  }

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={
              <>
                <Main
                  openPage={openPage}
                  setOpenPage={setOpenPage}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  isSearchResultOpen={isSearchResultOpen}
                  handleLogout={onLogout}
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
                  onSignIn={onLogin}
                />
              </>
            }
          />

          <Route path="/saved-news" element={
              <SavedNews 
                isLoggedIn={isLoggedIn}
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

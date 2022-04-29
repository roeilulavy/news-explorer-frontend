import "./App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Routes, Route, Navigate } from "react-router-dom";
import { Main } from "../Main/Main";
import { SavedNews } from "../SavedNews/SavedNews";
import { Footer } from "../Footer/Footer";
import { SignInPopup } from "../SignInPopup/SignInPopup";
import { testData } from "../../utils/testData";
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import * as auth from "../../utils/auth";
import api from "../../utils/api";
import CurrentUserContext from "../../context/CurrentUserContext";

function App() {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("jwt");

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isHomePageOpen, setIsHomePageOpen] = useState(false);
  const [isSaveArticlesPageOpen, setIsSaveArticlesPageOpen] = useState(false);
  const [isSearchResultOpen, setIsSearchResultOpen] = useState(false);

  const [isInfoTolltipOpen, setIsInfoTolltipPopup] = useState(false);
  const [isSignInPopup, setIsSignInPopup] = useState(false);
  const [isSignUpPopup, setIsSignUpPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [savedCardsData, setSavedCardsData] = useState(testData)
  const [allCardsData, setAllCardsData] = useState(testData)

  const navigator = useNavigate();

  const onRegister = (email, password, name) => {
    auth
      .signup(email, password, name)
      .then(() => {
        setSuccess(true);
        setMessage("Registration successfully completed!");
      })
      .catch((err) => {
        console.error(err);
        setSuccess(false);
        setMessage("Oops, something went wrong! Please try again.");
      });
    setIsInfoTolltipPopup(true);
  };

  const onLogin = (email, password) => {
    auth
      .signin(email, password)
      .then((data) => {
        if (data) {
          const userData = {
            email: email,
            token: data,
          };

          setUserData(userData);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setSuccess(false);
        setMessage("Oops, something went wrong! Please try again.");
        setIsInfoTolltipPopup(true);
      });
  };

  const onLogout = () => {
    localStorage.removeItem("jwt");
    setUserData({});
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res){
            setUserData(res);
            setIsLoggedIn(true);
        }
      }).catch((err) => console.error(err));
    }
  }, []);

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

  function handleLogout() {}

  function handleSigninPopup() {
    setIsSignInPopup(true);
  }

  function closeAllPopups() {
    setIsSignInPopup(false);
    setIsSignUpPopup(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route path="/" element={
              <>
                <Main
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  isSearchResultOpen={isSearchResultOpen}
                />

                <SignInPopup
                  isOpen={isSignInPopup}
                  onClose={closeAllPopups}
                />
              </>
            }
          />

          <Route path="/saved-articles" element={
            <ProtectedRoute
              component={SavedNews}
              isLoggedIn={isLoggedIn}
              savedCardsData={savedCardsData}
            />
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

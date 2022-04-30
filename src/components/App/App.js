import "./App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Routes, Route, Navigate } from "react-router-dom";
import { Main } from "../Main/Main";
import { SavedNews } from "../SavedNews/SavedNews";
import { Footer } from "../Footer/Footer";
import { SignInPopup } from "../SignInPopup/SignInPopup";
import { SignUpPopup } from "../SignUpPopup/SignUpPopup";
import { SuccessPopup } from "../SuccessPopup/SuccessPopup";
import { FailurePopup } from "../FailurePopup/FailurePopup";
import { testData } from "../../utils/testData";

function App() {
  const [success, setSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("jwt");

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState(3);
  const[cardsToDisplay, setCardsToDisplay] = useState([]);

  const [openPage, setOpenPage] = useState('');
  const [isSearchResultOpen, setIsSearchResultOpen] = useState(false);

  const [isSignInPopup, setIsSignInPopup] = useState(false);
  const [isSignUpPopup, setIsSignUpPopup] = useState(false);
  const [isSuccessPopup, setIsSuccessPopup] = useState(false);
  const [isFailurePopup, setIsFailurePopup] = useState(false);
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
  }, [openPage]);

  function handleSearch() {
    setIsSearchResultOpen(true);
    setIsLoading(true);
    
    let cardsToRender =[];
    for (let i = 0; i < cards; i++) {
      if (testData[i]) {
        cardsToRender.push(testData[i]);
      }
    }
    setCards(cards + 3);
    
    setIsLoading(false)
    setCardsToDisplay(cardsToRender);
  }

  function showMore() {

  }

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
    setIsFailurePopup(false);
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
                  onSearch={handleSearch}
                  isLoading={isLoading}
                  cardsToDisplay={cardsToDisplay}
                  allCardsData={allCardsData}
                  showMore={showMore}
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

                <FailurePopup 
                  isOpen={isFailurePopup}
                  onClose={closeAllPopups}
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
                savedCardsData={allCardsData}
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

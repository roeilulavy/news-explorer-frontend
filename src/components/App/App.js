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
import { date7DaysAgo, currentDate } from "../../utils/constants";
import NewsApi from "../../utils/NewsApi";
import * as auth from "../../utils/MainApi";
import CurrentUserContext from "../../context/CurrentUserContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const token = localStorage.getItem("jwt");

  // ------------------***** Delete all userData, setUserData and replace with currentUser  *****--------------------------------

  const [openPage, setOpenPage] = useState("");
  const [isSearchResultOpen, setIsSearchResultOpen] = useState(false);

  const [isSignInPopup, setIsSignInPopup] = useState(false);
  const [isSignUpPopup, setIsSignUpPopup] = useState(false);
  const [isSuccessPopup, setIsSuccessPopup] = useState(false);
  const [isFailurePopup, setIsFailurePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchError, setSearchError] = useState(false);
  const [allArticlesData, setAllArticlesData] = useState([]);
  const [cardsToDisplay, setCardsToDisplay] = useState(3);
  const [savedCardsData, setSavedCardsData] = useState([]);

  const navigation = useNavigate();

  const onSignUp = (email, password, username) => {
    auth.signup(email, password, username).then(() => {
        setIsSignUpPopup(false);
        setIsSuccessPopup(true);
      })
      .catch((err) => {
        console.error(err);
        setIsSignUpPopup(false);
        setIsFailurePopup(true);
      });
  };

  const onLogin = (email, password) => {
    auth.signin(email, password).then((data) => {      
        if (data) {
          const userData = {
            email: email,
            token: data,
          };
          setUserData(userData);
          setIsLoggedIn(true);
          setIsSignInPopup(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsSignInPopup(false);
        setIsFailurePopup(true);
      });
  };

  const onLogout = () => {
    localStorage.removeItem("jwt");
    setUserData({});
    setCurrentUser({});
    setIsLoggedIn(false);
    setOpenPage("Home");
    navigation("/");
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
          if (res) {
            setUserData(res);
            setIsLoggedIn(true);
          }
        }).catch((err) => console.error(err));
    } 
    else {
      console.log('There is no JWT')
    }
  },[]);

  React.useEffect(() => {
    if (isLoggedIn) {
      async function getUserData() {
        try {
          const userInfo = await auth.getUserData(token);

          if (userInfo) {
            setCurrentUser(userInfo);
          }
        } catch (error) {
          console.error("Error! ", error);
          alert("Something went wrong getting user data..");
        } 
      }

      getUserData();

    } else {
      navigation("/");
    }
  }, [isLoggedIn, navigation, token]);

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
    setCardsToDisplay(3);
  }, [openPage]);

  async function handleSearch(keyword) {
    setIsSearchResultOpen(true);
    setIsLoading(true);
    setCardsToDisplay(3);

    try {
      const articles = await NewsApi.getArticles(
        keyword,
        date7DaysAgo,
        currentDate
      );

      if (articles) {
        const allArticles = articles.articles;
        localStorage.setItem("searchKeyword", keyword);
        localStorage.setItem("articles", JSON.stringify(allArticles));
        setAllArticlesData(allArticles);
      }
    } catch (err) {
      setSearchError(true);
      setAllArticlesData([]);
    } finally {
      setIsLoading(false);
    }
  }

  const showMore = () => {
    setCardsToDisplay((prevValue) => prevValue + 3);
  };

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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main
                  isLoggedIn={isLoggedIn}
                  handleLogout={onLogout}
                  openPage={openPage}
                  setOpenPage={setOpenPage}
                  onSearch={handleSearch}
                  isLoading={isLoading}
                  allArticlesData={allArticlesData}
                  cardsToDisplay={cardsToDisplay}
                  savedCardsData={savedCardsData}
                  showMore={showMore}
                  searchError={searchError}
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

          <Route
            path="/saved-news"
            element={
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
    </CurrentUserContext.Provider>
  );
}

export default App;

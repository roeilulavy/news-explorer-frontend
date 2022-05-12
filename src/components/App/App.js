import "./App.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Routes, Route, Navigate } from "react-router-dom";
import uuid from 'react-uuid';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const token = localStorage.getItem("jwt");

  const [openPage, setOpenPage] = useState("");
  const [isSearchResultOpen, setIsSearchResultOpen] = useState(false);

  const [isSignInPopup, setIsSignInPopup] = useState(false);
  const [isSignUpPopup, setIsSignUpPopup] = useState(false);
  const [isSuccessPopup, setIsSuccessPopup] = useState(false);
  const [isFailurePopup, setIsFailurePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchError, setSearchError] = useState(false);
  const [allArticlesData, setAllArticlesData] = useState([]);
  const [cardsToDisplay, setCardsToDisplay] = useState(3);
  const [savedCardsData, setSavedCardsData] = useState([]);
  const [operationSuccess, setOperationSuccess] = useState(false);
  const [isCardSaved, setIsCardSaved] = useState(false)

  const navigation = useNavigate();

  //Get JWT
  React.useEffect(() => {
    if (!token) {
      return;
    }
    
    async function checkTokenValidity() {
      try {
        const checkToken = await auth.checkToken(token);

        if (checkToken) {
          setCurrentUser(checkToken);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error(err);
        setIsLoggedIn(false);
        setCurrentUser({});
        localStorage.removeItem('jwt');
      }
    }

    checkTokenValidity();
  },[token]);

  //Get User savedArticles
  React.useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    async function getSavedArticles() {
      try {
        const savedArticles = await auth.getSavedArticles(token);

        if (savedArticles) {
          setSavedCardsData(savedArticles);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getSavedArticles();
    
  }, [isLoggedIn, token]);

  //Reset SearchForm
  React.useEffect(() => {
    setSearchKeyword('');
    setIsSearchResultOpen(false);
    setCardsToDisplay(3);
  }, [openPage]);

  async function onSignUp(email, password, username) {
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

  async function onLogin(email, password) {
    auth.signin(email, password).then((data) => {      
        if (data) {
          const userData = {
            email: email,
            token: data,
          };
          
          setCurrentUser(userData);
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
    setCurrentUser({});
    setIsLoggedIn(false);
    setOpenPage("Home");
    navigation("/");
  };

  async function handleSearch(keyword) {
    setSearchKeyword('');
    setSearchKeyword(keyword);
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

        let cardsWithId = [];
        let card;

        for (let i = 0; i <= allArticles.length; i++) {
          if (allArticles[i]) {
            card = {...allArticles[i], id: uuid()};
            cardsWithId.push(card);
          }
        }

        localStorage.setItem("articlesWithId", JSON.stringify(cardsWithId));
        setAllArticlesData(cardsWithId);
      }
    } catch (err) {
      setSearchError(true);
      setAllArticlesData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const showMore = () => {
    setCardsToDisplay((prevValue) => prevValue + 3);
  };

  function handleSigninPopup() {
    closeAllPopups();
    setIsSignInPopup(true);
  };

  function handleSignupPopup() {
    closeAllPopups();
    setIsSignUpPopup(true);
  };

  function closeAllPopups() {
    setIsSignInPopup(false);
    setIsSignUpPopup(false);
    setIsSuccessPopup(false);
    setIsFailurePopup(false);
  };

  async function handleSaveArticle(title, subtitle, date, source, link, image) {
    try {
      const savedArticle = await auth.saveArticle(searchKeyword, title, subtitle, date, source, link, image, token);

      if(savedArticle) {
        setSavedCardsData([savedArticle, ...savedCardsData])
        setOperationSuccess(true);
      }
    } catch (err) {
      setOperationSuccess(false);
      alert('something went wrong while save the article')
      console.log(err)
    }
  };

  async function handleDeleteArticle(cardId) {
    try {
      const articleToDelete = await auth.deleteArticle(token, cardId);

      if (articleToDelete) {
        const filterList = savedCardsData.filter((item) => item._id !== articleToDelete._id);
        setSavedCardsData(filterList);
        setOperationSuccess(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

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
                  handleSaveArticle={handleSaveArticle}
                  handleDeleteArticle={handleDeleteArticle}
                  operationSuccess={operationSuccess}
                  setOperationSuccess={setOperationSuccess}
                  isCardSaved={isCardSaved}
                  setIsCardSaved={setIsCardSaved}
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
              <ProtectedRoute
                component={SavedNews}
                isLoggedIn={isLoggedIn}
                handleLogout={onLogout}
                openPage={openPage}
                setOpenPage={setOpenPage}
                savedCardsData={savedCardsData}
                handleDeleteArticle={handleDeleteArticle}
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

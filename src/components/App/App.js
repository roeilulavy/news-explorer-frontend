import './App.css';
import React, { useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { SignInPopup } from '../SignInPopup/SignInPopup';
import { NotFound } from '../NotFound/NotFound';
import { PreLoader } from '../PreLoader/PreLoader';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
  const [isHomePageOpen, setIsHomePageOpen] = useState(true)
  const [isSaveArticlesPageOpen, setIsSaveArticlesPageOpen] = useState(false)
  const [isSignInPopup, setIsSignInPopup] = useState(false);
  const [isSignUpPopup, setIsSignUpPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, []);

  function handleLogout() {

  }

  function handleSigninPopup() {
    setIsSignInPopup(true)
  }

  function closeAllPopups() {
    setIsSignInPopup(false);
    setIsSignUpPopup(false);
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<>
          <Header
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          isBurgerMenuOpen={isBurgerMenuOpen}
          setIsBurgerMenuOpen={setIsBurgerMenuOpen}
          isHomePageOpen={isHomePageOpen}
          setIsHomePageOpen={setIsHomePageOpen}
          isSaveArticlesPageIsOpen={isSaveArticlesPageOpen}
          setIsSaveArticlesPageIsOpen={setIsSaveArticlesPageOpen}
          handleSigninPopup={handleSigninPopup}
          />

          <Main
            isLoading={isLoading}
          />
          
          <SignInPopup
            isOpen={isSignInPopup}
            onClose={closeAllPopups}
          />
        </>}
        />

      <Route path='/saved-articles' element={<>
              
            </>}
            />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

import './App.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { SignInPopup } from '../SignInPopup/SignInPopup';
import { testData } from '../../utils/testData';
import { SavedNews } from '../SavedNews/SavedNews';

function App() {

  const navigator = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
  const [isHomePageOpen, setIsHomePageOpen] = useState(false)
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
          <SavedNews />

        </>}
        />

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

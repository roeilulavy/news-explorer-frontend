import './Navigation.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import LogoutIconWhite from '../../images/buttons/logout_icon_white.svg';
import LogoutIconBlack from '../../images/buttons/logout_icon_black.svg';

export function Navigation ({ isLoggedIn, openPage, setOpenPage, handleLogout, handleSigninPopup }) {
  const navigation = useNavigate()
  const [darkNav, setDarkNav] = useState(false);

  React.useEffect(() => {
    if (openPage === 'Saved-news') {
      setDarkNav(true)
    } else {
      setDarkNav(false)
    }
  }, [openPage])

  function handleHomeBtn() {
    setOpenPage('Home')
    navigation('/');
  }

  function handleSavedArticlesBtn() {
    setOpenPage('Saved-news')
    navigation('/saved-news');
  }

  return (
    <nav className={`navigation ${darkNav && 'navigation-dark'}`}>
      <h1 className={`navigation__title ${darkNav && 'navigation__title-dark'}`}>NewsExplorer</h1>
      <ul className='navigation__list'>
        <li className={`navigation__link ${darkNav && 'navigation__link-dark'} ${openPage === 'Home' && `navigation__link_active`}`} onClick={handleHomeBtn}>
          Home
        </li>
        {isLoggedIn ?
        <>
          <li className={`navigation__link ${darkNav && 'navigation__link-dark'} ${openPage === 'Saved-news' && `navigation__link_active-dark`}`} onClick={handleSavedArticlesBtn}>
          Saved articles
          </li>
          <li className={`navigation__button-user ${darkNav && 'navigation__button-user-dark'}`} onClick={handleLogout}>
            User
            <img src={darkNav ? LogoutIconBlack : LogoutIconWhite} alt='Log out'/>
          </li>
        </>
         :
        <li className={`navigation__button ${darkNav && 'navigation__button-dark'}`} onClick={handleSigninPopup}>
          Sign in
        </li>
        }
      </ul>
    </nav>
  )
}
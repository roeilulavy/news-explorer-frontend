import './Navigation.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import LogoutIconWhite from '../../images/buttons/logout_icon_white.svg';
import LogoutIconBlack from '../../images/buttons/logout_icon_black.svg';
import MenuIconWhite from '../../images/buttons/menu_white_icon.svg';
import MenuIconBlack from '../../images/buttons/menu_black_icon.svg';
import CloseIconWhite from '../../images/buttons/close_white_icon.svg';

export function Navigation ({ isLoggedIn, openPage, setOpenPage, handleLogout, handleSigninPopup }) {
  const navigation = useNavigate()
  const [darkNav, setDarkNav] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    setOpenPage('Saved-news');
    navigation('/saved-news');
  }

  return (
    <nav className={`navigation ${darkNav && 'navigation-dark'}`}>
      <h1 className={`${isMenuOpen ? 'navigation__title' : darkNav ? 'navigation__title-dark' : 'navigation__title'}`}>NewsExplorer</h1>

      <img className="navigation__menu-button" src={isMenuOpen ? CloseIconWhite : openPage === 'Saved-news' ? MenuIconBlack : MenuIconWhite} onClick={() => setIsMenuOpen(!isMenuOpen)} alt="menu" />

      {
        isMenuOpen && 
        <div className='navigation__container'>
          <div className='navigation__content'>
            <div className='navigation__content__border' />
            <ul className='navigation__content__list'>
              <li className='navigation__content__link' onClick={handleHomeBtn}>
                Home
              </li>
              {isLoggedIn ?
                <>
                  <li className='navigation__content__link' onClick={handleSavedArticlesBtn}>
                  Saved articles
                  </li>
                  <li className='navigation__content__button' onClick={handleLogout}>
                    User
                    <img src={LogoutIconWhite} alt='Log out'/>
                  </li>
                </>
                :
                <li className='navigation__content__button' onClick={handleSigninPopup}>
                  Sign in
                </li>
                }
            </ul>
          </div>
        </div>
      }

      <ul className='navigation__list'>
        <li className={`navigation__link ${darkNav && 'navigation__link-dark'} ${openPage === 'Home' && `navigation__link_active`}`} onClick={handleHomeBtn}>
          Home
        </li>
        {isLoggedIn ?
        <>
          <li className={`navigation__link ${darkNav && 'navigation__link-dark'} ${openPage === 'Saved-news' && `navigation__link_active-dark`}`} onClick={handleSavedArticlesBtn}>
          Saved articles
          </li>
          <li className={`navigation__logout ${darkNav && 'navigation__logout-dark'}`} onClick={handleLogout}>
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
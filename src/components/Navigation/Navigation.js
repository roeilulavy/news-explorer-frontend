import './Navigation.css';
import { useNavigate } from 'react-router';
import LogoutIconWhite from '../../images/buttons/logout_icon_white.svg';
import LogoutIconBlack from '../../images/buttons/logout_icon_black.svg';

export function Navigation ({ isLoggedIn, onLogout, isHomePageOpen, setIsHomePageOpen, isSaveArticlesPageOpen, setIsSaveArticlesPageOpen, handleSigninPopup }) {
  const navigation = useNavigate()

  function handleHomeBtn() {
    setIsHomePageOpen(true);
    setIsSaveArticlesPageOpen(false);
    navigation('/');
  }

  function handleSavedArticlesBtn() {
    setIsHomePageOpen(false);
    setIsSaveArticlesPageOpen(true);
    navigation('/saved-articles');
  }

  return (
    <nav className='navigation'>
      <h1 className='navigation__title'>NewsExplorer</h1>
      <ul className='navigation__list'>
        <li className={`navigation__link ${isHomePageOpen && 'navigation__link_active'}`} onClick={handleHomeBtn}>
          Home
        </li>
        {isLoggedIn ?
        <>
          <li className={`navigation__link ${isSaveArticlesPageOpen && 'navigation__link_active'}`} onClick={handleSavedArticlesBtn}>
          Saved articles
          </li>
          <li className='navigation__button-user' onClick={onLogout}>
            User
            <img src={LogoutIconWhite} alt='Log out'/>
          </li>
        </>
         :
        <li className='navigation__button' onClick={handleSigninPopup}>
          Sign in
        </li>
        }
      </ul>
    </nav>
  )
}
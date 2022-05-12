import './Header.css'
import { Navigation } from '../Navigation/Navigation'
import { SearchForm } from '../SerchForm/SearchForm'


export function Header({ isLoggedIn, handleLogout, openPage, onSearch, handleSigninPopup }) {

  return (
    <header className='header'>
      <Navigation
        isLoggedIn={isLoggedIn}
        openPage={openPage}
        handleLogout={handleLogout}
        handleSigninPopup={handleSigninPopup}
      />

      <div className='header__content'>
        <h1 className='header__title'>What's going on in the world?</h1>
        <p className='header__subtitle'>Find the latest news on any topic and save them in your personal account.</p>
        
        <SearchForm
          onSearch={onSearch}
        />

      </div>
    </header >
  )
}
import './Header.css'
import { Navigation } from '../Navigation/Navigation'


export function Header({ isLoggedIn, onLogout, handleSigninPopup }) {

  return (
    <header className='header'>
      <Navigation
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        handleSigninPopup={handleSigninPopup}
      />

      <div className='header__content'>
        <h1 className='header__title'>What's going on in the world?</h1>
        <p className='header__subtitle'>Find the latest news on any topic and save them in your personal account.</p>
        <form className='header__form'>
          <input type='text' name="search" className='header__input' placeholder='Enter topic' autoComplete='off'/>
          <button className='header__button' type='submit'>Search</button>
        </form>

      </div>


    </header >
  )
}
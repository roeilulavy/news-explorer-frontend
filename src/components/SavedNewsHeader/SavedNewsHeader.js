import './SavedNewsHeader.css';
import { useContext } from 'react';
import { Navigation } from '../Navigation/Navigation';
import CurrentUserContext from "../../context/CurrentUserContext";

export function SavedNewsHeader({ isLoggedIn, handleLogout, openPage, setOpenPage, savedCardsData }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className='savedNewsHeader'>
      <Navigation
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        openPage={openPage}
        setOpenPage={setOpenPage}
      />

      <div className='savedNewsHeader__content'>
        <p className='savedNewsHeader__title'>Saved articles</p>
        <h1 className='savedNewsHeader__subtitle'>{`${currentUser.name}, you have ${savedCardsData.length} saved articles`}</h1>
        <p className='savedNewsHeader__span'>By keywords:<span className='savedNewsHeader__span-bold'> Nature, Yellowstone, and 2 other</span> </p>
      </div>

    </header>
  )
}
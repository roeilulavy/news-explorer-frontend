import './SavedNewsHeader.css';
import { Navigation } from '../Navigation/Navigation';

export function SavedNewsHeader({ isLoggedIn, onClick}) {
  return (
    <header className='savedNewsHeader'>
      <Navigation
        isLoggedIn={isLoggedIn}
        onClick={onClick}
      />

      <div className='savedNewsHeader__content'>
        <p className='savedNewsHeader__title'>Saved articles</p>
        <h1 className='savedNewsHeader__subtitle'>Elise, you have 5 saved articles</h1>
        <p className='savedNewsHeader__span'>By keywords:<span className='savedNewsHeader__span-bold'> Nature, Yellowstone, and 2 other</span> </p>
      </div>

    </header>
  )
}
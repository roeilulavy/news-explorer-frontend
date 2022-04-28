import './SavedNews.css';
import { SavedNewsHeader } from '../SavedNewsHeader/SavedNewsHeader';
import { SavedNewsList } from '../SavedNewsList/SavedNewsList';

export function SavedNews({ savedCardsData, isLoggedIn, onClick, setIsHomePageOpen, isHomePageOpen, isSaveArticlesPageIsOpen, setIsSaveArticlesPageIsOpen, setIsBurgerMenuOpen, isBurgerMenuOpen }) {

  return (
    <div className='savednews'>
      <SavedNewsHeader
        isLoggedIn={isLoggedIn}
        onClick={onClick}
        isBurgerMenuOpen={isBurgerMenuOpen}
        setIsBurgerMenuOpen={setIsBurgerMenuOpen}
        isHomePageOpen={isHomePageOpen}
        setIsHomePageOpen={setIsHomePageOpen}
        isSaveArticlesPageIsOpen={isSaveArticlesPageIsOpen}
        setIsSaveArticlesPageIsOpen={setIsSaveArticlesPageIsOpen}
      />
      <SavedNewsList
        isSaveArticlesPageIsOpen={isSaveArticlesPageIsOpen}
        savedCardsData={savedCardsData}
        isHomePageOpen={isHomePageOpen}
        isLoggedIn={isLoggedIn}
      />

    </div>
  )
}
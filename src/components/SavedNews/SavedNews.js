import './SavedNews.css';
import { SavedNewsHeader } from '../SavedNewsHeader/SavedNewsHeader';
import { NewsCardList } from '../NewsCardList/NewsCardList';

export function SavedNews({ isLoggedIn, openPage, setOpenPage, savedCardsData }) {

  return (
    <div className='savednews'>
      <SavedNewsHeader
        isLoggedIn={isLoggedIn}
        openPage={openPage}
        setOpenPage={setOpenPage}
      />

      <NewsCardList
        savedCardsData={savedCardsData}
        isLoggedIn={isLoggedIn}
      />

    </div>
  )
}
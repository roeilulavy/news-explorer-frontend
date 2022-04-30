import './SavedNews.css';
import { SavedNewsHeader } from '../SavedNewsHeader/SavedNewsHeader';
import { NewsCardList } from '../NewsCardList/NewsCardList';
import React from 'react';

export function SavedNews({ isLoggedIn, openPage, setOpenPage, savedCardsData }) {

  React.useEffect(() => {
    setOpenPage('Saved-news')
  }, [setOpenPage])

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
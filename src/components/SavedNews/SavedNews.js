import './SavedNews.css';
import { SavedNewsHeader } from '../SavedNewsHeader/SavedNewsHeader';
import { NewsCardList } from '../NewsCardList/NewsCardList';
import React from 'react';

export function SavedNews({ isLoggedIn, handleLogout, openPage, setOpenPage, savedCardsData }) {

  React.useEffect(() => {
    setOpenPage('Saved-news')
  }, [setOpenPage])

  return (
    <div className='savednews'>
      <SavedNewsHeader
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        openPage={openPage}
        setOpenPage={setOpenPage}
      />

      <NewsCardList
        isLoggedIn={isLoggedIn}
        openPage={openPage}
        savedCardsData={savedCardsData}
        text={''}
      />

    </div>
  )
}
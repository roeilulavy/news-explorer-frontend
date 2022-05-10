import { SavedNewsHeader } from '../SavedNewsHeader/SavedNewsHeader';
import { NewsCardList } from '../NewsCardList/NewsCardList';
import React from 'react';

export function SavedNews({ isLoggedIn, handleLogout, setOpenPage, savedCardsData, handleDeleteArticle, operationSuccess, setOperationSuccess }) {

  React.useEffect(() => {
    setOpenPage('Saved-news')
  }, [setOpenPage])

  return (
    <div className='savednews'>
      <SavedNewsHeader
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        openPage={'Saved-news'}
        setOpenPage={setOpenPage}
        savedCardsData={savedCardsData}
      />

      <NewsCardList
        isLoggedIn={isLoggedIn}
        openPage={'Saved-news'}
        savedCardsData={savedCardsData}
        handleDeleteArticle={handleDeleteArticle}
        operationSuccess={operationSuccess}
        setOperationSuccess={setOperationSuccess}
      />
    </div>
  )
}
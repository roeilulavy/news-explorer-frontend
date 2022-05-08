import React from "react";
import { Header } from "../Header/Header";
import { About } from "../About/About";
import { NewsCardList } from "../NewsCardList/NewsCardList";

export function Main({ isLoggedIn, handleLogout, setOpenPage, onSearch, allArticlesData, cardsToDisplay, savedCardsData, showMore, isSearchResultOpen, isLoading, handleSigninPopup, searchError }) {

  React.useEffect(() => {
    setOpenPage('Home')
  }, [setOpenPage])

  return (
    <main>
      <Header
        isLoggedIn={isLoggedIn}
        openPage={'Home'}
        setOpenPage={setOpenPage}
        handleLogout={handleLogout}
        handleSigninPopup={handleSigninPopup}
        onSearch={onSearch}
      />

      {isSearchResultOpen && 
        <NewsCardList
          isLoggedIn={isLoggedIn}
          openPage={'Home'}
          isLoading={isLoading}
          allArticlesData={allArticlesData}
          cardsToDisplay={cardsToDisplay}
          savedCardsData={savedCardsData}
          showMore={showMore}
          searchError={searchError}
        />}

      <About />
    </main>
  );
}

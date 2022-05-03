import { Header } from "../Header/Header";
import { About } from "../About/About";
import { NewsCardList } from "../NewsCardList/NewsCardList";
import React from "react";

export function Main({ isLoggedIn, handleLogout, setOpenPage, onSearch, cards, cardsToDisplay, savedCardsData, showMore, isSearchResultOpen, isLoading, handleSigninPopup }) {

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
          cards={cards}
          cardsToDisplay={cardsToDisplay}
          savedCardsData={savedCardsData}
          showMore={showMore}
          text={'Sorry, but nothing matched your search terms.'}
        />}

      <About />
    </main>
  );
}

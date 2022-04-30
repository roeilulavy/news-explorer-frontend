import "./Main.css";
import { Header } from "../Header/Header";
import { About } from "../About/About";
import { NewsCardList } from "../NewsCardList/NewsCardList";
import React from "react";

export function Main({ isLoggedIn, handleLogout, openPage, setOpenPage, onSearch, isSearchResultOpen, isLoading, handleSigninPopup }) {

  React.useEffect(() => {
    setOpenPage('Home')
  }, [setOpenPage])

  return (
    <main>
      <Header
        isLoggedIn={isLoggedIn}
        openPage={openPage}
        setOpenPage={setOpenPage}
        handleLogout={handleLogout}
        handleSigninPopup={handleSigninPopup}
        onSearch={onSearch}
      />

      {isSearchResultOpen && <NewsCardList isLoading={isLoading} />}

      <About />
    </main>
  );
}

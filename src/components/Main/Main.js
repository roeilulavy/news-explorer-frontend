import "./Main.css";
import { Header } from "../Header/Header";
import { About } from "../About/About";
import { NewsCardList } from "../NewsCardList/NewsCardList";

export function Main({ isLoggedIn, openPage, setOpenPage, handleLogout, handleSigninPopup, isSearchResultOpen, isLoading }) {
  return (
    <main>
      <Header
        isLoggedIn={isLoggedIn}
        openPage={openPage}
        setOpenPage={setOpenPage}
        handleLogout={handleLogout}
        handleSigninPopup={handleSigninPopup}
      />

      {isSearchResultOpen && <NewsCardList isLoading={isLoading} />}

      <About />
    </main>
  );
}

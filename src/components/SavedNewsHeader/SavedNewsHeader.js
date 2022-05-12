import './SavedNewsHeader.css';
import { useContext, useEffect, useState } from 'react';
import { Navigation } from '../Navigation/Navigation';
import CurrentUserContext from "../../context/CurrentUserContext";

export function SavedNewsHeader({ isLoggedIn, handleLogout, openPage, setOpenPage, savedCardsData }) {

  const currentUser = useContext(CurrentUserContext);
  const [keyWordPhrase, setKeyWordPhrase] = useState('');

  useEffect(() => { // algoritm to set the keyword phrase
    if (!savedCardsData) return
    const keyWordCounter = {}
    savedCardsData.forEach((card) => {
      if (!keyWordCounter[card.keyword]) {
        keyWordCounter[card.keyword] = 1
      }
      else {
        keyWordCounter[card.keyword] = keyWordCounter[card.keyword] + 1
      }
    });
    let arrayKeyWords = Object.keys(keyWordCounter).map((item) => {
      return [item, keyWordCounter[item]]
    })

    arrayKeyWords.sort((a, b) => b[1] - a[1])
    arrayKeyWords = arrayKeyWords.flat().filter((item) => typeof (item) === 'string')
    if (arrayKeyWords.length <= 3) {
      arrayKeyWords = arrayKeyWords.join(', ')
      setKeyWordPhrase(arrayKeyWords)
    }
    else {
      const sumOfkeyWord = arrayKeyWords.length
      arrayKeyWords = [arrayKeyWords[0], arrayKeyWords[1]];
      arrayKeyWords = arrayKeyWords.join(', ');
      const phrase = `${arrayKeyWords}, and ${sumOfkeyWord - 2} other`
      setKeyWordPhrase(phrase)
    }

  }, [savedCardsData])

  return (
    <header className='savedNewsHeader'>
      <Navigation
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        openPage={openPage}
        setOpenPage={setOpenPage}
      />

      <div className='savedNewsHeader__content'>
        <p className='savedNewsHeader__title'>Saved articles</p>
        <h1 className='savedNewsHeader__subtitle'>{`${currentUser.name}, you have ${savedCardsData.length} saved articles`}</h1>
        <p className='savedNewsHeader__span'>By keywords: <span className='savedNewsHeader__span-bold'>{keyWordPhrase}</span> </p>
      </div>

    </header>
  )
}
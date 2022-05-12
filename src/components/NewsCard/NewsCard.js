import './NewsCard.css';
import { useEffect, useRef } from 'react';

export function NewsCard({ openPage, isLoggedIn, card, id, cardLink, cardkeyword, cardImg, cardDate, cardTitle, cardSubtitle, cardCaption, handleSigninPopup, handleSaveArticle, handleDeleteArticle, operationSuccess, setOperationSuccess, savedCardsData, setIsCardSaved, isCardSaved }) {

  const button = useRef();
  const text = useRef();

  useEffect(() => {
    if (openPage === 'Saved-news') {
      return;
    }

    savedCardsData.forEach((element) => {
      if (element.text === cardSubtitle) {
        button.current.classList.add(`card__button_type_marked`);
      }
    });
  }, [cardSubtitle, openPage, savedCardsData]);



  function onMouseEnter(e) {
    text.current.style.display = 'block';

    if (e.target.classList.contains(`card__button_type_marked`)) {
      setIsCardSaved(true);
      return;
    }
  }

  function onMouseLeave(e) {
    if (openPage === 'Saved-news') {
      return;
    }

    text.current.style.display = 'none'
    setIsCardSaved(false);
  }

  function handleButtonClick(e) {
    if (isLoggedIn && openPage === 'Home' && !e.target.classList.contains(`card__button_type_marked`)) {

      handleSaveArticle(cardTitle, cardSubtitle, cardDate, cardCaption, cardLink, cardImg);

      if (operationSuccess) {
        setIsCardSaved(!isCardSaved);
        e.target.classList.toggle(`card__button_type_marked`);
        button.current.classList.remove(`card__button_type_save`);
        setOperationSuccess(false);
      }
    }
    
    else if (e.target.classList.contains(`card__button_type_marked`)) {
      const articleToDelete = savedCardsData.find((item) => item.link === cardLink);
      handleDeleteArticle(articleToDelete._id);

      if (operationSuccess) {
        setIsCardSaved(!isCardSaved);
        e.target.classList.toggle(`card__button_type_marked`);
        button.current.classList.add(`card__button_type_save`);
        button.current.classList.remove(`card__button_type_marked`);
        setOperationSuccess(false);
      }
    }

    else if (isLoggedIn && openPage === 'Saved-news') {
      handleDeleteArticle(id);
    }

    else if (!isLoggedIn) {
      handleSigninPopup();
    }
  }

  return (
    <article className='card'>
      <button
        ref={button}
        className={`${isLoggedIn ? 'card__button_type_save' : 'card__button_type_save_disabled'} ${openPage === 'Saved-news' && 'card__button_type_trash'}`}
        type='button'
        onMouseEnter={(e) => onMouseEnter(e)}
        onMouseLeave={(e) => onMouseLeave(e)}
        onClick={(e) => handleButtonClick(e)}
      />

      <span ref={text} className='card__span' >
        {
        (!isLoggedIn && 'Sign in to save articles') ||
        (openPage === 'Saved-news' && 'remove from save') ||
        (!isCardSaved && 'Add to save') ||
        (isCardSaved && 'remove from save')
        }
      </span>

      {openPage === 'Saved-news' &&
        <span className='card__keyword' >
          {cardkeyword}
        </span>
      }

      <a className='card__link' href={cardLink} target="_blank" rel="noreferrer">  
        <img className='card__image' src={cardImg} alt='news card' />
        <div className='card__content'>
          <p className='card__date'>{cardDate}</p>
          <h2 className='card__title'>{cardTitle}</h2>
          <p className='card__subtitle'>{cardSubtitle}</p>
          <span className='card__caption'>{cardCaption}</span>
        </div>
      </a>
    </article>
  )
}
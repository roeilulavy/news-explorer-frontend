import './NewsCard.css';
import { useRef } from 'react';

export function NewsCard({ openPage, isLoggedIn, id, cardLink, cardButtonType, cardSpan, cardkeyword, cardImg, cardDate, cardTitle, cardSubtitle, cardCaption, handleSigninPopup, handleSaveArticle, handleDeleteArticle }) {

  const button = useRef();
  const text = useRef();

  function handleButtonClick(e) {
    if (isLoggedIn && openPage === 'Home') {
      if (e.target.classList.contains(`card__button_type_dave`)) {
        handleDeleteArticle(id);
      } else {
        handleSaveArticle(cardTitle, cardSubtitle, cardDate, cardCaption, cardLink, cardImg);
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
        className={`card__button_type_${cardButtonType} ${isLoggedIn === false && 'card__button_type_save_disabled'}`}
        type='button'
        onMouseEnter={() => text.current.style.display = 'block'}
        onMouseLeave={() => text.current.style.display = 'none'}
        onClick={(e) => handleButtonClick(e)}
      />

      <span ref={text} className='card__span' >
        {cardSpan}
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
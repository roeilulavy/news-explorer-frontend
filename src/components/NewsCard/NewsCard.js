import './NewsCard.css';
import { useEffect, useRef, useState } from 'react';

export function NewsCard({ openPage, isLoggedIn, id, cardLink, cardButtonType, cardSpan, cardkeyword, cardImg, cardDate, cardTitle, cardSubtitle, cardCaption, handleSigninPopup, handleSaveArticle, handleDeleteArticle, operationSuccess }) {

  const button = useRef();
  const text = useRef();

  // const [cardButtonType, setCardButtonType] = useState('');
  // const [cardSpan, setCardSpan] = useState('');

  // useEffect(() => {
  //   if (openPage === 'Saved-new') {
  //     setCardButtonType('Trash');
  //     setCardSpan('Remove from save');
  //   }

  //   if (openPage === 'Home') {
  //     if (isLoggedIn) {
  //       setCardButtonType('Save');
  //       setCardSpan('Add to saved');
  //     } else {
  //       setCardButtonType('Save');
  //       setCardSpan('Sign in to save articles');
  //     }
  //   }
  // }, [isLoggedIn, openPage])

  function handleButtonClick(e) {
    if (isLoggedIn && openPage === 'Home') {
      if (e.target.classList.contains(`card__button_type_marked`)) {
        console.log('Delete save article click')
        console.log("id: " + id)
        handleDeleteArticle(id);
        if (operationSuccess === true) {
          e.target.classList.toggle(`card__button_type_save`);
        }
      } else {
        handleSaveArticle(cardTitle, cardSubtitle, cardDate, cardCaption, cardLink, cardImg);
        if (operationSuccess === true) {
          e.target.classList.toggle(`card__button_type_marked`);
          button.current.classList.toggle('card__button_type_marked')
        }
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
        className={`card__button ${isLoggedIn ? 'card__button_type_save' : 'card__button_type_save_disabled'} ${openPage === 'Saved-news' && 'card__button_type_trash'}`}
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
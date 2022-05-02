import './NewsCard.css';
import { useRef } from 'react';

export function NewsCard({ openPage, cardButtonType, cardSpan, cardkeyword, cardImg, cardDate, cardTitle, cardSubtitle, cardCaption }) {

  const button = useRef();
  const text = useRef();

  return (
    <article className='card'>

      <button
        ref={button}
        className={`card__button_type_${cardButtonType}`}
        type='button'
        onMouseEnter={() => text.current.style.display = 'block'}
        onMouseLeave={() => text.current.style.display = 'none'}
      />

      <span ref={text} className='card__span' >
        {cardSpan}
      </span>

      {openPage === 'Saved-news' &&
        <span className='card__keyword' >
          {cardkeyword}
        </span>
      }
      
      <img className='card__image' src={cardImg} alt='news card' />
      <div className='card__content'>
        <p className='card__date'>{cardDate}</p>
        <h2 className='card__title'>{cardTitle}</h2>
        <p className='card__subtitle'>{cardSubtitle}</p>
        <span className='card__caption'>{cardCaption}</span>
      </div>
    </article>
  )
}
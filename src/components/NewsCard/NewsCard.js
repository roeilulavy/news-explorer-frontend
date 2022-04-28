import './NewsCard.css'

export function NewsCard({ cardImg, cardDate, cardTitle, cardText, cardCaption }) {

  return (
    <article className='card'>

      <img className='card__image' src={cardImg} alt='news card' />

      <div className='card__text-wrapper'>
        <p className='card__date'>{cardDate}</p>
        <h2 className='card__title'>{cardTitle}</h2>
        <p className='card__text'>{cardText}</p>
        <span className='card__caption'>{cardCaption}</span>
      </div>
    </article>
  )
}
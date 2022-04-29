import './NewsCard.css'

export function NewsCard({ cardImg, cardDate, cardTitle, cardSubtitle, cardCaption }) {

  return (
    <article className='card'>

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
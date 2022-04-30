import './NewsCardList.css'
import { PreLoader } from '../PreLoader/PreLoader'
import { NewsCard } from '../NewsCard/NewsCard'
import { NotFound } from '../NotFound/NotFound'

export function NewsCardList({ isLoading, cards, cardsToDisplay, allCardsData, text, showMore }) {

  return (
    <section className='cards'>
      {
        isLoading ? 
          <PreLoader /> :
          cards ?
            <>
              <h2 className='cards__title'>Search Result</h2>
              <div className='cards__wrapper'>
                {cards.slice(0, cardsToDisplay).map((card) => {
                    return (
                      <NewsCard
                      card={card}
                      key={card.id}
                      cardImg={card.img}
                      cardDate={card.date}
                      cardTitle={card.title}
                      cardSubtitle={card.subtitle}
                      cardCaption={card.caption}
                      cardKeyWord={card.keyword}
                      />
                    )
                  })
                }
              </div>
              {
                cards.length !== cardsToDisplay.length &&
                <button type='button' className='cards__button-show-more' onClick={() => showMore()}>Show more</button>
              }
            </>
            : <NotFound
                text={text}
              />
      }
    </section>
  )
}
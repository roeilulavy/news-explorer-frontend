import './NewsCardList.css'
import { PreLoader } from '../PreLoader/PreLoader'
import { NewsCard } from '../NewsCard/NewsCard'
import { NotFound } from '../NotFound/NotFound'

export function NewsCardList({ isLoading, cardsData, allCardsData, showMore }) {

  return (
    <section className='cards'>
      {
        isLoading ? 
          <PreLoader /> :
          cardsData ?
            <>
              <h2 className='cards__title'>Search Result</h2>
              <div className='cards__wrapper'>
                {
                  cardsData.map((card) => {

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
                allCardsData.length !== cardsData.length &&
                <button type='button' className='cards__button-show-more' onClick={() => showMore()}>Show more</button>
              }
            </>
            : <NotFound
                text={'Sorry, but nothing matched your search terms.'}
              />
      }
    </section>
  )
}
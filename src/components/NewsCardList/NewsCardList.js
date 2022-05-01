import './NewsCardList.css'
import { PreLoader } from '../PreLoader/PreLoader'
import { NewsCard } from '../NewsCard/NewsCard'
import { NotFound } from '../NotFound/NotFound'

export function NewsCardList({ openPage, isLoading, cards, cardsToDisplay, savedCardsData, text, showMore }) {

  return (
    <section className='cards'>
      {isLoading ? 
        <PreLoader />
        :
          openPage === 'Home' && cards ?
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
                        cardKeyWord={card.keyword} />
                    )
                  })}
                </div>
                {
                  cards.length !== cardsToDisplay.length &&
                  <button type='button' className='cards__button-show-more' onClick={() => showMore()}>Show more</button>
                }
            </>
        :
          openPage === 'Saved-news' && savedCardsData ?
            <div className='cards__wrapper'>
              {savedCardsData.map((card) => {
                return (
                  <NewsCard
                    card={card}
                    key={card.id}
                    cardImg={card.img}
                    cardDate={card.date}
                    cardTitle={card.title}
                    cardSubtitle={card.subtitle}
                    cardCaption={card.caption}
                    cardKeyWord={card.keyword} />
                )
              })}
            </div>
        :
        <>
          <NotFound
            text={text}
          />
          
          {console.log('openPage: '+openPage + ' || Saved Cards Data'+savedCardsData)}
          
        </>
      }
    </section>
  )
}
import './NewsCardList.css'
import { PreLoader } from '../PreLoader/PreLoader'
import { NewsCard } from '../NewsCard/NewsCard'
import { NotFound } from '../NotFound/NotFound'
import { handelFormat } from '../../utils/constants';

export function NewsCardList({ isLoggedIn, openPage, isLoading, allArticlesData, cardsToDisplay, savedCardsData, text, showMore }) {

  return (
    <section className='cards'>
      {isLoading ? 
        <PreLoader />
        :
          openPage === 'Home' && allArticlesData ?
            <>
              <h2 className='cards__title'>Search Result</h2>
                <div className='cards__wrapper'>
                  {allArticlesData.slice(0, cardsToDisplay).map((card, index) => {
                    return (
                      <NewsCard
                        card={card}
                        id={card._id}
                        key={index}
                        cardImg={card.urlToImage}
                        cardDate={handelFormat(card.publishedAt)}
                        cardTitle={card.title}
                        cardSubtitle={card.description}
                        cardCaption={card.source.name}
                        cardLink={card.url}
                        cardButtonType={'save'}
                        cardSpan={isLoggedIn ? 'Add to saved' : 'Sign in to save articles'}
                        cardkeyword={card.keyword} 
                        />
                    )
                  })}
                </div>
                {
                  allArticlesData.length >= cardsToDisplay &&
                  <button type='button' className='cards__button-show-more' onClick={() => showMore()}>Show more</button> 
                }
            </>
        :
          openPage === 'Saved-news' && savedCardsData ?
            <div className='cards__wrapper'>
              {savedCardsData.map((card, index) => {
                return (
                  <NewsCard
                    openPage={openPage}
                    card={card}
                    id={card._id}
                    key={index}
                    cardImg={card.urlToImage}
                    cardDate={handelFormat(card.publishedAt)}
                    cardTitle={card.title}
                    cardSubtitle={card.description}
                    cardCaption={card.source.name}
                    cardLink={card.url}
                    cardButtonType={'trash'}
                    cardSpan={'Remove from save'}
                    cardkeyword={card.keyword}
                    />
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

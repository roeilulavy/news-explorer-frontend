import './NewsCardList.css'
import { PreLoader } from '../PreLoader/PreLoader'
import { NewsCard } from '../NewsCard/NewsCard'
import { NotFound } from '../NotFound/NotFound'
import { handelFormat } from '../../utils/constants';

export function NewsCardList({ isLoggedIn, openPage, isLoading, allArticlesData, cardsToDisplay, savedCardsData, showMore, searchError, handleSigninPopup, handleSaveArticle, handleDeleteArticle, operationSuccess }) {

  return (
    <section className='cards'>
      {isLoading ? 
        <PreLoader />
        :
          openPage === 'Home' && allArticlesData.length !== 0 ?
            <>
              <h2 className='cards__title'>Search Result</h2>
                <div className='cards__wrapper'>
                  {allArticlesData.slice(0, cardsToDisplay).map((card, index) => {
                    return (
                      <NewsCard
                        isLoggedIn={isLoggedIn}
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

                        cardSpan={isLoggedIn ? 'Add to saved' : 'Sign in to save articles'}

                        handleSigninPopup={handleSigninPopup}
                        handleSaveArticle={handleSaveArticle}
                        handleDeleteArticle={handleDeleteArticle}
                        operationSuccess={operationSuccess}
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
          openPage === 'Saved-news' && savedCardsData.length !== 0 ?
            <div className='cards__wrapper'>
              {savedCardsData.map((card, index) => {
                return (
                  <NewsCard
                    isLoggedIn={isLoggedIn}
                    openPage={openPage}

                    card={card}
                    id={card._id}
                    key={index}
                    cardImg={card.image}
                    cardDate={card.date}
                    cardTitle={card.title}
                    cardSubtitle={card.text}
                    cardCaption={card.source}
                    cardLink={card.link}
                    cardkeyword={card.keyword}

                    cardSpan={'Remove from save'}

                    handleDeleteArticle={handleDeleteArticle}
                    operationSuccess={operationSuccess}
                    />
                )
              })}
            </div>
        :
        <>
          <NotFound
            text={openPage === 'Home' ? searchError === true ? 'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.' : 'Sorry, but nothing matched your search terms.' : openPage === 'Saved-news' && 'You don`t have any saved articles yet.'}
          />          
        </>
      }
    </section>
  )
}

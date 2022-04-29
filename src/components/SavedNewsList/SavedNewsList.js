import './SavedNewsList.css';
import { NewsCard } from '../NewsCard/NewsCard';
import { NotFound } from '../NotFound/NotFound';

export function SavedNewsList({ savedCardsData, isSaveArticlesPageIsOpen, isHomePageOpen, isLoggedIn, isCardHover, setIsCardHover }) {

  return (
    <section className='savedNewsList'>
      {
        savedCardsData ?
          <>
            <div className='savedNewsList__wrapper'>
              {savedCardsData &&
                savedCardsData.map((card) => {
                  return (
                    <NewsCard
                      isSaveArticlesPageIsOpen={isSaveArticlesPageIsOpen}
                      isHomePageOpen={isHomePageOpen}
                      isLoggedIn={isLoggedIn}
                      key={card.id}
                      card={card}
                      isCardHover={isCardHover}
                      setIsCardHover={setIsCardHover}
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


          </>
          : <NotFound text='You dont have any saved articles yet...' />
      }
    </section>
  )
}
# News-Explorer Web App


## Tech MERN Stack:

* Front-End: | ReactJS | CSS | 

* BackEnd: | NodeJS | Express | MongoDB |

* Host source: Gooogle VM Server

_______________________________________

### User experience:

 * In this app users are able to search for news articles by typing a keyword without registration.
 * Users can redirect to the article page by clicking on the article card.
* Users who will register and login will be able to save & delete articles from their main page and saved-articles page. 
* Users who are logged in can leave the page and back to it without additional authorization.

__________________________________________

### App functionality 

* All forms in the app are validated using custom hook. 
* The app using third side NewsAPi, see docs [here](https://newsapi.org/).
* The app is fully responsive (Web, Tablet, Phone) with all styles done in vanilla CSS.
* The app using HOComponent to protect Routes from users that aren't logged in, done by React-Router v6.
* Authentication and authorization handled by the backEnd, using Json Web token that generates and verifies the token.
* The Saved Articles header returns a summary of the top keywords of the articles in descending order. Deleting cards will update this summary in real time.

____________________________________________

<!-- You can try it [here](https://news-searcher.students.nomoreparties.sbs). -->


BackEnd code is [here](https://github.com/roeilulavy/news-explorer-api).
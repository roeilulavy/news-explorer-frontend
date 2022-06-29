# News Explorer


## Tech MERN Stack:

* Front-End: | ReactJS | CSS | 

* BackEnd: | NodeJS | Express | MongoDB |

* Host source: Gooogle Cloud 

_______________________________________

### User experience:

 * In this app users able to search for articles by typing keyword and search without registration.
 * Users can enter to some article by clicking on the card.
* Those users who will register and login in will able to save & delete articles. 
* Users who are logged in can save & delete articles both from the main page and from the saved-articles page.
* Users who are logged in can leave the page and back to it without additional authorization.
* Users can leave a page and their last search result will be saved.

__________________________________________

### App functionality 

* All forms in the app are validated using custom hook. 
* The app using third side NewsAPi , see docs [here](https://newsapi.org/)
* The app is fully responsive with all styles done in vanilla CSS.
* The app using HOComponent to protect Routes from users that aren't logged in, done by React-Router v6
* Authentication and authorization handled by backEnd, using Json Web token that generates and verifies the token.
* The Saved Articles header returns a summary of the top keywords of the articles in descending order. Deleting cards will update this summary in real time.

____________________________________________

You can try it [here](https://roy.news.students.nomoreparties.sbs)

BackEnd code is [here](https://github.com/roeilulavy/news-explorer-api)


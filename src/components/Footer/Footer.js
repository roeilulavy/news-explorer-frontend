import './Footer.css'

export function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__title'>© 2022 Supersite, Powered by News API</p>
      <ul className='footer__nav'>
        <li className='footer__nav-item'>
          <a className='footer__link' href='https://roy.news.students.nomoreparties.sbs' rel="noreferrer">Home</a>
          <a className='footer__link' href='https://practicum.yandex.com/' target='_blank' rel="noreferrer">Practicum by Yandex</a>
        </li>
        <li className='footer__nav-item'>
          <a className='footer__icon footer__icon_type_github' href='https://www.github.com/Roeilulavy' target='_blank' rel="noreferrer"> </a>
          <a className='footer__icon footer__icon_type_facebook' href='https://www.facebook.com/YPracticum' target='_blank' rel="noreferrer"> </a>
        </li>
      </ul>
    </footer>
  );
}
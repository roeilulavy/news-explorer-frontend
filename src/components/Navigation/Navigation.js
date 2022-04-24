import { useNavigate } from 'react-router';
import './Navigation.css';

export function Navigation ({ isLoggedIn }) {
  const navigation = useNavigate()

  return (
    <nav className='navigation'>
      <h1 className='navigation__title'>NewsExplorer</h1>
      <ul className='navigation__list'>
        <li className='navigation__link'>
          Home
        </li>
        <li className='navigation__button'>
          Sign in
        </li>
      </ul>

    </nav>
  )
}
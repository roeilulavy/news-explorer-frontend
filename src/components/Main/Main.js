import './Main.css';
import { About } from '../About/About'
import { NewsCardList } from '../NewsCardList/NewsCardList';

export function Main({ isLoading }) {
  return (
    <main>
      <NewsCardList
       isLoading={isLoading}
      />
      <About />
    </main>
  )
}
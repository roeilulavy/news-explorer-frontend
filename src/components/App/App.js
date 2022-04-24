import './App.css';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { About } from '../About/About';
import { Footer } from '../Footer/Footer';
import { PopupWithForm } from '../PopupWithForm/PopupWithForm';
import { SignInPopup } from '../SignInPopup/SignInPopup';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <About />
      <Footer />
      <SignInPopup
        isOpen='true'
      />
    </div>
  );
}

export default App;

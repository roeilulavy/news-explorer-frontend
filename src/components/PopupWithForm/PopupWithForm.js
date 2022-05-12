import { useEffect, useRef } from 'react';
import './PopupWithForm.css';

export function PopupWithForm(props) {

  const submitButton = useRef();

  useEffect(() => {

    if (!props.isOpen) return;

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        props.onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [props]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    };
  };

  useEffect(() => {
    if((props.name === "sign-in" || props.name === "sign-up")  && props.isOpen){
      if (props.isValid) {
        submitButton.current.removeAttribute("disabled", "");
        submitButton.current.classList.remove(`popup__submit_type_disable`);
      } else {
        submitButton.current.setAttribute("disabled", "");
        submitButton.current.classList.add(`popup__submit_type_disable`);
      }
    }
  }, [props.isOpen, props.isValid, props.name])

  return (
    <div onClick={(e) => handleOverlay(e)} className={`popup popup_type_${props.name} ${props.isOpen && 'popup_is-open'}`}>
      <div className="popup__content">
        <button type="button" className="popup__close" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>

        {props.name !== 'SuccessPopup' && props.name !== 'FailurePopup' ? 
          <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
              {
              props.children
              }
              <button ref={submitButton} type="submit" className="popup__submit">{props.buttonText}</button>
              <span className="popup__span">
                or{" "}
                <span className="popup__span-link" onClick={props.handlePopup}>
                  {props.linkText}
                </span>
              </span>
          </form>
        :
          <div className="popup__only-span">
            <span className="popup__only-span" onClick={props.handlePopup}>
              {props.linkText}
            </span>
          </div>
        }
      </div>
    </div>
  );
}

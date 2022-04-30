import { PopupWithForm } from "../PopupWithForm/PopupWithForm";

export function SuccessPopup({ isOpen, onClose, handleSigninPopup }) {
  return (
    <PopupWithForm 
      isOpen={isOpen}
      onClose={onClose}
      name="SuccessPopup"
      title="Registration successfully completed!"
      handlePopup={handleSigninPopup}
      linkText="Sign in"
    />
  )
}
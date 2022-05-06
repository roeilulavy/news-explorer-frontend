import { PopupWithForm } from "../PopupWithForm/PopupWithForm";

export function FailurePopup({ isOpen, onClose }) {
  return (
    <PopupWithForm 
      isOpen={isOpen}
      onClose={onClose}
      name="FailurePopup"
      title="Oops, Something went wrong, please try again.."
    />
  )
}
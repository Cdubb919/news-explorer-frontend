import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./SuccessModal.css";

function SuccessModal({ isOpen, onClose, onSignIn }) {
  return (
    <ModalWithForm
      title="Registration successfully completed!"
      name="success"
      isOpen={isOpen}
      onClose={onClose}
    >
      <p className="success__signin" onClick={onSignIn}>
        Sign in
      </p>
    </ModalWithForm>
  );
}

export default SuccessModal;

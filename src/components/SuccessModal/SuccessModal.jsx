import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SuccessModal({ isOpen, onClose, onSignIn }) {
  return (
    <ModalWithForm
      title="Registration successfully completed!"
      name="success"
      buttonText="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => {
        e.preventDefault();
        onSignIn();
      }}
    >
    </ModalWithForm>
  );
}

export default SuccessModal;

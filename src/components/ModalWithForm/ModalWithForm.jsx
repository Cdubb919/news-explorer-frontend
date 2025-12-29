import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit,
  isValid = true,
  switchToSignUp,
}) {
  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen, onClose]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="modal__content" onMouseDown={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        />

        <div className="modal__container">
          <h2 className="modal__title">{title}</h2>

          <form
            className="modal__form"
            name={name}
            onSubmit={onSubmit}
            noValidate
          >
            {children}

            {buttonText && (
              <button
                type="submit"
                className="modal__submit"
                disabled={!isValid}
              >
                {buttonText}
              </button>
            )}

            {switchToSignUp && (
              <p className="modal__switch">
                or{" "}
                <button
                  type="button"
                  className="modal__switch-button"
                  onClick={switchToSignUp}
                >
                  {buttonText === "Sign up" ? "Sign in" : "Sign up"}
                </button>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalWithForm;

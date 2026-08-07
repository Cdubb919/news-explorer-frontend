import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
  onRegisterSuccess,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  const hasMinimumLength = password.length >= 8;
  const hasUppercaseLetter = /[A-Z]/.test(password);
  const hasSpecialCharacter = /[^A-Za-z0-9]/.test(password);

  const isPasswordValid =
    hasMinimumLength &&
    hasUppercaseLetter &&
    hasSpecialCharacter;

  const isFormValid = Boolean(
    isValidEmail(email) &&
      isPasswordValid &&
      name.trim().length >= 2 &&
      !emailError
  );

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    if (!isFormValid) {
      return;
    }

    if (email.trim().toLowerCase() === "taken@email.com") {
      setSubmitError("This email is not available");
      return;
    }

    onRegisterSuccess({
      email: email.trim(),
      password,
      name: name.trim(),
    });

    setEmail("");
    setPassword("");
    setName("");
    setEmailError("");
  }

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid}
      switchToSignUp={onSwitchToLogin}
    >
      <label className="modal__field">
        Email
        <input
          type="email"
          className="modal__input"
          value={email}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);

            if (value && !isValidEmail(value)) {
              setEmailError("Invalid email address");
            } else {
              setEmailError("");
            }
          }}
          placeholder="Enter email"
          required
        />

        {emailError && (
          <span className="modal__error">{emailError}</span>
        )}
      </label>

      <label className="modal__field">
        Password
        <input
          type="password"
          minLength={8}
          className="modal__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />

        <span className="modal__password-title">
          Password must include:
        </span>

        <ul className="modal__password-requirements">
          <li
            className={
              hasMinimumLength
                ? "modal__requirement modal__requirement_met"
                : "modal__requirement"
            }
          >
            At least 8 characters
          </li>

          <li
            className={
              hasUppercaseLetter
                ? "modal__requirement modal__requirement_met"
                : "modal__requirement"
            }
          >
            At least one uppercase letter
          </li>

          <li
            className={
              hasSpecialCharacter
                ? "modal__requirement modal__requirement_met"
                : "modal__requirement"
            }
          >
            At least one special character
          </li>
        </ul>
      </label>

      <label className="modal__field">
        Username
        <input
          type="text"
          className="modal__input"
          minLength={2}
          maxLength={30}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your username"
          required
        />
      </label>

      {submitError && (
        <span className="modal__error modal__error_centered">
          {submitError}
        </span>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;

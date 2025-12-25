import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const isFormValid = email && password.length >= 8 && name.length >= 2;

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ email, password, name });
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
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="modal__field">
        Password
        <input
          type="password"
          minLength="8"
          className="modal__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <label className="modal__field">
        Username
        <input
          type="text"
          className="modal__input"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;


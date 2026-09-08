import { useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import { validateSignup } from "../utils/validators";

import { ModalWithForm } from "./index";
export const RegisterModal = ({ handleLoginClick, isOpen, onClose }) => {
  const defaultValues = {
    email: "",
    password: "",
    username: "",
  };

  const { values, handleChange /*setValues*/ } = useForm(defaultValues);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    username: false,
  });

  useEffect(() => {
    setErrors(validateSignup(values));
  }, [values]);

  const handleFieldChange = (evt) => {
    const { name } = evt.target;
    handleChange(evt);
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (evt) => {
    const { name } = evt.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const isValid =
    !errors.email &&
    !errors.password &&
    !errors.username &&
    values.email.trim() &&
    values.password.trim() &&
    values.username.trim();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const nextErrors = validateSignup(values);
    setErrors(nextErrors);

    if (!Object.values(nextErrors).every((e) => !e)) {
      setTouched({ email: true, password: true, username: true });
      return;
    }

    // handleLogin(values)
    //   .then(() => {
    //     setValues(defaultValues);
    //     setTouched({ email: false, password: false });
    //     onClose(evt);
    //   })
    //   .catch(console.error);
  };
  return (
    <ModalWithForm
      title={"Sign up"}
      name={"signup"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="modal__field">
        <label className="modal__label" htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            className={`modal__input modal__input_type_text ${
              errors.email && touched.email ? "modal__input_type_error" : ""
            }`}
            placeholder="Enter email"
            required
            onChange={handleFieldChange}
            onBlur={handleBlur}
            value={values.email}
          />
        </label>
        <span
          style={{
            visibility: errors.email && touched.email ? "visible" : "hidden",
          }}
          className="modal__error"
        >
          {errors.email && touched.email ? `${errors.email}` : ""}
        </span>
      </div>

      <div className="modal__field">
        <label className="modal__label" htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            className={`modal__input modal__input_type_text ${
              errors.password && touched.password
                ? "modal__input_type_error"
                : ""
            }`}
            placeholder="Enter password"
            minLength="6"
            maxLength="20"
            required
            onChange={handleFieldChange}
            onBlur={handleBlur}
            value={values.password}
          />
        </label>
        <span
          style={{
            visibility:
              errors.password && touched.password ? "visible" : "hidden",
          }}
          className="modal__error "
        >
          {errors.password && touched.password ? `${errors.password}` : ""}
        </span>
      </div>
      <div className="modal__field">
        <label className="modal__label" htmlFor="username">
          Username
          <input
            type="username"
            name="username"
            id="username"
            className={`modal__input modal__input_type_text ${
              errors.username && touched.username
                ? "modal__input_type_error"
                : ""
            }`}
            placeholder="Enter your username"
            minLength="2"
            maxLength="30"
            required
            onChange={handleFieldChange}
            onBlur={handleBlur}
            value={values.username}
          />
        </label>
        <span
          style={{
            visibility:
              errors.username && touched.username ? "visible" : "hidden",
          }}
          className="modal__error "
        >
          {errors.username && touched.username ? `${errors.username}` : ""}
        </span>
      </div>
      <div className="modal__field modal__field_type_btn">
        <button
          id="form-login-btn"
          type="submit"
          className={`modal__save-btn ${
            !isValid ? "modal__save-btn_disabled" : ""
          }`}
          disabled={!isValid}
          onSubmit={handleSubmit}
        >
          Sign up
        </button>

        <button
          id="form-signup-btn"
          type="button"
          className="modal__save-btn modal__save-btn_type_secondary"
          onClick={handleLoginClick}
        >
          <p className="modal__signup-text">or&nbsp;</p> Sign in
        </button>
      </div>
    </ModalWithForm>
  );
};

import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonBase from "../button/button-base/button-base.component";
import {
  createAuthWithEmailAndPassword,
  createUserDocument,
} from "src/utils/firebase.utils";

interface InputFields {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultInputField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [inputField, setInputField] = useState<InputFields>(defaultInputField);
  const [passwordNotMatch, setPasswordNotMatch] = useState<string>("");
  const [asyncError, setAsyncError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { displayName, email, password, confirmPassword } = inputField;

  const handleInputField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputField((prevState) => ({ ...prevState, [name]: value }));
  };

  const resetFormFields = () => setInputField(defaultInputField);

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordNotMatch("Passwords does not match");
      return;
    }

    try {
      const userCredential = await createAuthWithEmailAndPassword(
        email,
        password
      );

      if (userCredential) {
        const { user } = userCredential;
        await createUserDocument(user, { displayName });
      }

      setPasswordNotMatch("");
      setAsyncError(null);
      resetFormFields();
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/network-request-failed":
          setAsyncError(
            "There was a problem with the network. Please try again."
          );
          break;
        case "auth/invalid-email":
          setAsyncError("Please enter a valid email address.");
          break;
        case "auth/email-already-in-use":
          setAsyncError(
            "The email is already registered. Please try signing in instead."
          );
          break;
        case "auth/weak-password":
          setAsyncError(
            "The password is too weak. Please enter a stronger password."
          );
          break;
        case "firestore/permission-denied":
          setAsyncError(
            "You don't have permission to register a user. Please contact the administrator."
          );
          break;
        default:
          setAsyncError("An unknown error occurred. Please try again.");
          break;
      }
    }
  };

  return (
    <div className="form-container">
      <h1 className="heading__primary heading__primary--black mb-medium">
        Sign Up
      </h1>
      <form onSubmit={handleSubmitForm}>
        <div className="input-box">
          <label>Username:</label>
          <input
            type="text"
            name="displayName"
            placeholder="username"
            value={inputField.displayName}
            onChange={handleInputField}
            required
          />
        </div>
        <div className="input-box">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={inputField.email}
            onChange={handleInputField}
            required
          />
        </div>
        <div className="input-box">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={inputField.password}
            onChange={handleInputField}
            required
          />
        </div>
        <div className="input-box">
          <label>Confirm password:</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            value={inputField.confirmPassword}
            onChange={handleInputField}
            required
          />
        </div>
        {passwordNotMatch && (
          <p className="error-message">{passwordNotMatch}</p>
        )}
        {asyncError && <p className="error-message">{asyncError}</p>}
        <ButtonBase type="submit" className="btn btn__form">
          Sign up
        </ButtonBase>
      </form>
    </div>
  );
};

export default SignUp;

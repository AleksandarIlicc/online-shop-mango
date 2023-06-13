import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonBase from "../button/button-base/button-base.component";
import {
  signInWithGooglePopup,
  createUserDocument,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase.utils";

interface InputFields {
  email: string;
  password: string;
}

const defaultInputField = {
  email: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();
  const [inputField, setInputField] = useState<InputFields>(defaultInputField);
  const [asyncError, setAsyncError] = useState<string | null>(null);

  const { email, password } = inputField;

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocument(user, {});
  };

  const handleInputField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetInputField = () => setInputField(defaultInputField);

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signInUserWithEmailAndPassword(email, password);
      setAsyncError(null);
      resetInputField();
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setAsyncError("Invalid email.");
          break;
        case "auth/user-not-found":
          setAsyncError("User with the provided email does not exist.");
          break;
        case "auth/wrong-password":
          setAsyncError("Incorrect password.");
          break;
        case "auth/user-disabled":
          setAsyncError("Your account is disabled. Please contact support.");
          break;
        default:
          setAsyncError("Error signing in.");
      }
    }
  };

  return (
    <div className="form-container">
      <h1 className="heading__primary heading__primary--black mb-medium">
        Sign In
      </h1>
      <form onSubmit={handleSubmitForm}>
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
        {asyncError && <div className="error-message">{asyncError}</div>}
        <div className="button-container">
          <ButtonBase type="submit" className="btn btn__form">
            Sign in
          </ButtonBase>
          <ButtonBase
            type="button"
            className="btn btn__form"
            onClick={logGoogleUser}
          >
            Sign in with google
          </ButtonBase>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

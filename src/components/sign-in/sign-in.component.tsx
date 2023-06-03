import { signInWithGooglePopup } from "../../utils/firebase.utils";
import "./sign-in.styles.scss";

const SignIn = () => {
  const signInWithGoogle = () => signInWithGooglePopup();

  return (
    <div>
      <h1>Sign In</h1>
      <form>
        <div className="input-box">
          <label>Username:</label>
          <input type="text" placeholder="username" />
        </div>
        <div className="input-box">
          <label>Email:</label>
          <input type="email" placeholder="email" />
        </div>
      </form>
      <button>Sign in</button>
      <button onClick={signInWithGoogle}>Sign in with google</button>
    </div>
  );
};

export default SignIn;

import "./sign-up.styles.scss";

const SignUp = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <div className="input-box">
          <label>Username:</label>
          <input type="text" placeholder="username" />
        </div>
        <div className="input-box">
          <label>Email:</label>
          <input type="email" placeholder="email" />
        </div>
        <div className="input-box">
          <label>Password:</label>
          <input type="password" placeholder="password" />
        </div>
        <div className="input-box">
          <label>Confirm password:</label>
          <input type="password" placeholder="confirm password" />
        </div>
      </form>
      <button>Sign up</button>
    </div>
  );
};

export default SignUp;

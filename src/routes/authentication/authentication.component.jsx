import SignIn from "src/components/sign-in/sign-in.component";
import SignUp from "src/components/sign-up/sign-up.component";
import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Authentication;

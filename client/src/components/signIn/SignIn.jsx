import SignUp from "./SignUp";
import LogIn from "./LogIn";

function SignIn(validationsLogIn) {
    return (
        <div className="signin">
            <div className="signin__signup">
                <SignUp />
            </div>
            <div className="signin__login">
                <LogIn validationsLogIn={validationsLogIn} />
            </div>
        </div>
    );
}

export default SignIn;

import { motion } from "framer-motion";

import SignUp from "./SignUp";
import LogIn from "./LogIn";

function SignIn(validationsLogIn, handleChange, button) {
    return (
        <div className="signin">
            <motion.div
                className="signin__signup"
                transition={{ duration: 2 }}
                animate={button ? { x: -500 } : { x: 0 }}
            >
                <SignUp onClick={handleChange} button={button} />
            </motion.div>
            <motion.div
                className="signin__login"
                initial={{ x: 500 }}
                transition={{ duration: 2 }}
                animate={button ? { x: 0 } : { x: 500 }}
            >
                <LogIn
                    validationsLogIn={validationsLogIn}
                    onClick={handleChange}
                    button={button}
                />
            </motion.div>
        </div>
    );
}

export default SignIn;

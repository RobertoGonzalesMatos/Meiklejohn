var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FlipCard from "../animations/flipcardRouts";
import "../../styles/LoginStyle.css";
const LoginPage = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);
    const [{ email, password }, setCredentials] = useState({
        email: "",
        password: "",
    });
    const signInWithGoogle = () => __awaiter(void 0, void 0, void 0, function* () {
        setAuthing(true);
        try {
            const response = yield signInWithPopup(auth, new GoogleAuthProvider());
            const userEmail = response.user.email || "";
            // Check if the email ends with the allowed domain
            if (userEmail.endsWith("@brown.edu")) {
                console.log(response.user.uid);
                navigate("/");
            }
            else {
                // User is not allowed, sign them out and show a message
                yield auth.signOut();
                console.log("User not allowed. Signed out.");
            }
        }
        catch (error) {
            console.log(error);
            setAuthing(false);
        }
    });
    const logIn = () => __awaiter(void 0, void 0, void 0, function* () {
        setAuthing(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
            console.log(response.user.uid);
            navigate("/");
        })
            .catch((error) => {
            console.log(error);
            setAuthing(false);
        });
    });
    return (_jsx(FlipCard, { children: _jsxs(motion.div, { className: "login-container", children: [_jsx("h1", { children: "Login Page" }), _jsxs("form", { children: [_jsxs("div", { className: "input-field-wrapper", children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { "data-testid": "login-email-input", className: "input-field", placeholder: "Email", value: email, onChange: (event) => setCredentials({ email: event.target.value, password }) })] }), _jsxs("div", { className: "input-field-wrapper", children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { "data-testid": "login-password-input", className: "input-field", placeholder: "Password", type: "password", value: password, onChange: (event) => setCredentials({ email, password: event.target.value }) })] })] }), _jsx("button", { "data-testid": "login-button", className: "login-button", onClick: () => logIn(), disabled: authing, children: "Log In" }), _jsx("button", { "data-testid": "login-button-google", className: "google-login-button", onClick: () => signInWithGoogle(), disabled: authing, children: "Sign in with Google" }), _jsx("button", { className: "register-button", onClick: () => navigate("/register"), disabled: authing, children: "Don't have an account? Register" })] }, "login-page") }));
};
export default LoginPage;

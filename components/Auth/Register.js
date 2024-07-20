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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FlipCard from "../animations/flipcardRouts";
import "../../styles/RegisterPage.css"; // Import your external CSS file if needed
const RegisterPage = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);
    const [{ email, password }, setCredentials] = useState({
        email: "",
        password: "",
    });
    const register = () => __awaiter(void 0, void 0, void 0, function* () {
        setAuthing(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
            console.log(response.user.uid);
            navigate("/");
        })
            .catch((error) => {
            console.log(error);
            setAuthing(false);
        });
    });
    return (_jsx(FlipCard, { children: _jsxs(motion.div, { className: "register-container", children: [_jsx("h1", { children: "Register Page" }), _jsxs("form", { children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { className: "input-field", placeholder: "Email", value: email, onChange: (event) => setCredentials({ email: event.target.value, password }) }), _jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { className: "input-field", placeholder: "Password", type: "password", value: password, onChange: (event) => setCredentials({ email, password: event.target.value }) })] }), _jsx("button", { className: "register-button", onClick: () => register(), disabled: authing, children: "Register" }), _jsx("button", { className: "back-button", onClick: () => navigate("/login"), disabled: authing, children: "Already have an account? Login" })] }, "register-page") }));
};
export default RegisterPage;

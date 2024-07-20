import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, useLocation, } from "react-router-dom";
import HomePage from "../HomePage/Home";
import LogInPage from "./LogIn";
import AuthRoute from "./AuthRoute";
import RegisterPage from "./Register";
import { AnimatePresence } from "framer-motion";
import Meiks from "../Routes/Meiks";
import Profile from "../Routes/Profile";
import NonMeikRoute from "./NoneMeikRoute";
import UserProfile from "../Routes/UserProfile";
function AnimatedRouts() {
    const location = useLocation();
    return (_jsx(AnimatePresence, { mode: "wait", children: _jsxs(Routes, { location: location, children: [_jsx(Route, { path: "/", element: _jsx(AuthRoute, { children: _jsx(HomePage, {}, "home") }, "home") }), _jsx(Route, { path: "/login", element: _jsx(LogInPage, {}, "login") }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}, "register") }), _jsx(Route, { path: "/Meiks", element: _jsx(AuthRoute, { children: _jsx(Meiks, {}, "meiks") }, "meiks") }), _jsx(Route, { path: "/Profile", element: _jsx(AuthRoute, { children: _jsx(NonMeikRoute, { children: _jsx(Profile, {}, "profile") }) }, "profile") }), _jsx(Route, { path: "/UserProfile", element: _jsx(AuthRoute, { children: _jsx(UserProfile, {}, "userProfile") }, "userProfile") })] }, location.pathname) }));
}
export default AnimatedRouts;

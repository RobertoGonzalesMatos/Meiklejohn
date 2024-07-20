import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const AuthRoute = (props) => {
    const { children } = props;
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const AuthCheck = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            }
            else {
                console.log("unauthorized");
                navigate("/login");
            }
        });
        return () => AuthCheck();
    }, [auth]);
    if (loading)
        return _jsx("p", { children: "loading ..." });
    return _jsx(_Fragment, { children: children });
};
export default AuthRoute;

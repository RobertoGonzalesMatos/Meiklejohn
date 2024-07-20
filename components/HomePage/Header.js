import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import "../../styles/Header.css";
const Header = ({ onLinkClickContact, onLinkClickAbout, onLinkClickJoin, }) => {
    const navigate = useNavigate();
    return (_jsx("div", { className: "header", children: _jsxs("div", { className: "header-inner", children: [_jsx("div", { className: "logo", onClick: () => navigate("/"), children: "MeetYourMeiks" }), _jsxs("nav", { className: "nav", children: [_jsx("li", { "data-testid": "meiks-link-test", onClick: () => navigate("/Meiks"), children: _jsx("a", { children: "Meiks!" }) }), _jsx("li", { "data-testid": "profile-link-test", onClick: () => navigate("/Profile"), children: _jsx("a", { children: "Profile" }) }), _jsx("li", { "data-testid": "about-link", onClick: () => {
                                onLinkClickAbout();
                            }, children: _jsx("a", { children: "About" }) }), _jsx("li", { "data-testid": "join-link", onClick: () => {
                                onLinkClickJoin();
                            }, children: _jsx("a", { children: "Why join us?" }) })] }), _jsx("div", { "data-testid": "contact-link", className: "contact", onClick: () => {
                        onLinkClickContact();
                        console.log("hey");
                    }, children: _jsx("a", { children: "Contact us!" }) }), _jsxs("div", { className: "nav-menu", children: [_jsx("span", {}), _jsx("span", {})] })] }) }));
};
export default Header;

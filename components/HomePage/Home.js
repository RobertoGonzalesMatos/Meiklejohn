import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import Banner from "./Banner";
import Loader from "./Loader";
import Header from "./Header";
import { VerticalScroll } from "../Helpers/ScrollComponents";
import "../../styles/AddedPages.css";
import Form from "./contactForm";
import AboutUsPage from "./AboutUs";
import JoinUsPage from "./JoinUs";
import ScrollToTop from "./scrollToTop";
export const scrollToSection = (elementRef, containerRef) => {
    if (elementRef.current && containerRef.current) {
        console.log("Scrolling to:", containerRef.current);
        containerRef.current.scrollTo({
            top: elementRef.current.offsetTop - 125,
            behavior: "smooth",
        });
    }
};
function handleSubmit(data) {
    console.log(data);
}
const HomePage = (props) => {
    const [loading, setLoading] = useState(true);
    const about = useRef(null);
    const join = useRef(null);
    const contact = useRef(null);
    const scrollAAARef = useRef(null);
    const handleLinkClickContacts = () => {
        console.log("scrolling to contact");
        scrollToSection(contact, scrollAAARef);
    };
    const handleLinkClickAbout = () => {
        console.log("scrolling to contact");
        scrollToSection(about, scrollAAARef);
    };
    const handleLinkClickJoin = () => {
        console.log("scrolling to contact");
        scrollToSection(join, scrollAAARef);
    };
    useEffect(() => {
        const bodyElement = document.querySelector("body");
        if (bodyElement) {
            loading
                ? bodyElement.classList.add("loading")
                : bodyElement.classList.remove("loading");
        }
    }, [loading]);
    return (_jsx(_Fragment, { children: loading ? (_jsx(motion.div, { children: _jsx(Loader, { setLoading: setLoading }) }, String(loading))) : (_jsxs("div", { children: [_jsx(Header, { onLinkClickContact: handleLinkClickContacts, onLinkClickAbout: handleLinkClickAbout, onLinkClickJoin: handleLinkClickJoin }), _jsx(motion.div, { className: "transition-body", animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 400 }, transition: { duration: 0.2 }, children: _jsx(VerticalScroll, { children: _jsxs("div", { className: "scrollAAA", ref: scrollAAARef, children: [_jsx(Banner, {}), _jsx(ScrollToTop, { elementRef: scrollAAARef }), !loading && (_jsx(motion.div, { className: "transition-image final", children: _jsx(motion.img, { src: "/images/image-2.jpg", layoutId: "main-image-1", transition: { duration: 0.5 } }) })), _jsx("div", { ref: about, className: "about-div", children: _jsx(AboutUsPage, {}) }), _jsx("div", { ref: join, className: "join-div", children: _jsx(JoinUsPage, {}) }), _jsxs("div", { ref: contact, className: "contact-div", children: [_jsx("h3", { className: "ContactUsPage", children: "Contact us!" }), _jsx(Form, { onSubmit: handleSubmit })] })] }) }) })] })) }));
};
export default HomePage;

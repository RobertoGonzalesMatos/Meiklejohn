import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import "../../styles/scrollToTop.css";
const ScrollToTop = ({ elementRef }) => {
    const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (elementRef.current) {
                setShowScrollToTopButton(elementRef.current.scrollTop > 100);
            }
        };
        if (elementRef.current) {
            elementRef.current.addEventListener("scroll", handleScroll);
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, [elementRef]);
    const scrollTop = () => {
        if (elementRef.current != null) {
            elementRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };
    return (_jsx("div", { children: showScrollToTopButton && (_jsx("button", { className: "top-button", onClick: scrollTop, children: "Top" })) }));
};
export default ScrollToTop;

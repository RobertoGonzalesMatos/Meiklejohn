import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import "../../styles/Banner.css";
import { motion } from "framer-motion";
const banner = {
    animate: {
        transition: {
            delayChildren: 0.08,
            staggerChildren: 0.1,
        },
    },
};
const AnimatedLetters = ({ title }) => (_jsx("span", { className: "row-title", children: [...title].map((letter, index) => (_jsx(motion.span, { className: "row-letter", style: { display: "inline-block" }, initial: { opacity: 0, y: 400 }, animate: {
            opacity: 1,
            y: 0, // Ending state with opacity 1 and y translation 0
            transition: { duration: 0.5, delay: index * 0.08 },
        }, children: letter }, index))) }));
const BannerRowTop = ({ title }) => (_jsxs("div", { className: "banner-row", children: [_jsx("div", { className: "row-col", children: _jsx(AnimatedLetters, { title: title }) }), _jsx(motion.div, { initial: { opacity: 0, y: 80 }, animate: { opacity: 1, y: 0 }, transition: {
                ease: "easeInOut",
                duration: 0.5,
                delay: 0.2,
            }, className: "row-col", children: _jsx("span", { className: "row-message", children: "Brown's PeerAdvisoring Program to guide and aid first-year students to transition into our community" }) })] }));
const BannerRowBottom = ({ title }) => (_jsxs("div", { className: "banner-row center", children: [_jsxs(motion.div, { className: "scroll", initial: { opacity: 0, y: 80 }, animate: { opacity: 1, y: 0 }, transition: {
                ease: "easeInOut",
                duration: 0.5,
                delay: 0.4,
            }, children: [_jsx("span", { children: "scroll" }), _jsx("span", { children: "down!" })] }), _jsx(AnimatedLetters, { title: title })] }));
const BannerRowCenter = ({ title, playMarquee, }) => (_jsx("div", { className: `banner-row marquee  ${playMarquee && "animate"}`, children: _jsxs("div", { className: "marquee__inner", children: [_jsx(AnimatedLetters, { title: title }), _jsx(AnimatedLetters, { title: title }), _jsx(AnimatedLetters, { title: title }), _jsx(AnimatedLetters, { title: title })] }) }));
const Banner = () => {
    const [playMarquee, setPlayMarquee] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setPlayMarquee(true);
        }, 1000);
    }, []);
    return (_jsxs(motion.div, { className: "banner", variants: banner, children: [_jsx(BannerRowTop, { title: "The" }), _jsx(BannerRowCenter, { title: "Meiklejohn", playMarquee: playMarquee }), _jsx(BannerRowBottom, { title: "Program" })] }));
};
export default Banner;

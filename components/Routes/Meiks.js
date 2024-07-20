import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import cardView from "../Search/cardView";
import Header from "../HomePage/Header";
import "../../styles/Meiks.css";
import { motion } from "framer-motion";
import { VerticalScroll } from "../Helpers/ScrollComponents";
import { AllMeikData, updateSearch } from "./MeikHandler";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const Meiks = (props) => {
    const [tags, setTags] = useState([]);
    const [meikObjects, setMeikObjects] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [images, setImages] = useState([]);
    const [imagesBack, setImagesBack] = useState([]);
    const [uid, setUid] = useState("");
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                setUid(user.uid);
            }
        });
        return () => unsubscribe();
    });
    const addTag = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            const tag = inputValue.trim();
            if (tag.length > 1 && !tags.includes(tag)) {
                setTags([...tags, tag]);
                setInputValue("");
            }
        }
    };
    const removeTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };
    useEffect(() => {
        if (meikObjects.length === 0 || tags.length === 0) {
            if (AllMeikData.length === 0) {
                setTimeout(() => { }, 2000);
            }
            setMeikObjects(AllMeikData);
        }
    }, []);
    useEffect(() => {
        const ul = document.querySelector("ul");
        const input = ul === null || ul === void 0 ? void 0 : ul.querySelector("input");
        const handleKey = (ev) => {
            addTag(ev);
        };
        input === null || input === void 0 ? void 0 : input.addEventListener("keyup", handleKey);
        while (AllMeikData.length === 0) {
            setTimeout(() => {
                setMeikObjects(AllMeikData);
            }, 500);
        }
        if (meikObjects.length === 0 || tags.length === 0) {
            setMeikObjects(AllMeikData);
        }
        else {
            setMeikObjects(updateSearch(tags));
        }
        return () => {
            input === null || input === void 0 ? void 0 : input.removeEventListener("keyup", handleKey);
        };
    }, [tags, inputValue]);
    return (_jsxs("div", { children: [_jsx(Header, { onLinkClickContact: function () {
                    throw new Error("Function not implemented.");
                }, onLinkClickAbout: function () {
                    throw new Error("Function not implemented.");
                }, onLinkClickJoin: function () {
                    throw new Error("Function not implemented.");
                } }), _jsxs(VerticalScroll, { children: [" ", _jsxs(motion.div, { className: "MainBody", initial: { opacity: 0, y: -400 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 400 }, transition: { duration: 0.2 }, children: [_jsx("span", { className: "Title", children: "Find the perfect Meik for you!" }), _jsxs("ul", { className: "TagBox", children: [tags.map((tag) => (_jsxs("li", { children: [tag, _jsx("span", { className: "X", onClick: () => removeTag(tag), children: "\u00D7" })] }, tag))), _jsx("input", { "data-testid": "search-bar-test", className: "SearchBarInput", type: "text", value: inputValue, onChange: (e) => setInputValue(e.target.value) })] }), _jsx("div", { className: "MeikBody", children: meikObjects.map((meikObject, index) => (_jsx("div", { className: "Rows", style: { display: "inline-block" }, children: cardView(meikObject) }, index))) })] })] })] }));
};
export default Meiks;

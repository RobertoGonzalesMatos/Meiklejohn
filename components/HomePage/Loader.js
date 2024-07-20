import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Image from "./Image";
import "../../styles/Loader.css";
import { motion } from "framer-motion";
const container = {
    show: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};
const item = {
    hidden: {
        opacity: 0,
        y: 200,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
        },
    },
    exit: {
        opacity: 0,
        y: -200,
        transition: { ease: "easeInOut", duration: 0.2 },
    },
};
const itemMain = {
    hidden: {
        opacity: 0,
        y: 200,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
        },
    },
};
const Loader = ({ setLoading }) => {
    const ranNums = addNumbers();
    const a = ranNums.pop();
    const b = ranNums.pop();
    const c = ranNums.pop();
    const d = ranNums.pop();
    return (_jsx("div", { className: "loader", children: _jsxs(motion.div, { className: "loader-inner", variants: container, initial: "hidden", animate: "show", exit: "exit", onAnimationComplete: () => {
                setLoading(false);
            }, children: [_jsx(motion.div, { className: "transition-image", variants: itemMain, children: _jsx(motion.img, { src: `/images/image-2.jpg`, alt: "random alt", layoutId: "main-image-1", transition: { duration: 0.5 } }) }), _jsx(ImageBlock, { id: "image-" + a, variants: item, cssId: "image-1" }), _jsx(ImageBlock, { id: "image-" + b, variants: item, cssId: "image-3" }), _jsx(ImageBlock, { id: "image-" + c, variants: item, cssId: "image-4" }), _jsx(ImageBlock, { id: "image-" + d, variants: item, cssId: "image-5" })] }) }));
};
function addNumbers() {
    const numb = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const finalList = [];
    for (let i = 0; i < 4; i++) {
        const a = numb.splice(Math.floor(Math.random() * (13 - i)), 1).pop();
        if (a) {
            finalList.push(a);
            console.log(finalList);
        }
    }
    return finalList;
}
export const ImageBlock = ({ id, variants, cssId, }) => {
    return (_jsx(motion.div, { className: `image-block ${cssId}`, variants: variants, children: _jsx(Image, { src: `/images/${id}.webp`, fallback: `/images/${id}.jpg`, alt: id }) }));
};
export default Loader;

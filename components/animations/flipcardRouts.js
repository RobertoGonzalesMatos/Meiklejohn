import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
const FlipCard = ({ children }) => {
    return (_jsx(motion.div, { style: {
            perspective: "1000px",
        }, children: _jsx(motion.div, { initial: { rotateY: -90 }, animate: { rotateY: 0 }, exit: { rotateY: 90 }, transition: { duration: 0.5 }, style: {
                transformStyle: "preserve-3d",
                transformOrigin: "center",
            }, children: children }) }));
};
export default FlipCard;

import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
const FallDown = ({ children }) => {
    return (_jsx(motion.div, { style: {
            perspective: "1000px",
        }, children: _jsx(motion.div, { exit: { y: 200 }, transition: { duration: 0.5 }, style: {
                transformStyle: "preserve-3d",
                transformOrigin: "center",
            }, children: children }) }));
};
export default FallDown;

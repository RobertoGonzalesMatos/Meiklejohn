import { jsx as _jsx } from "react/jsx-runtime";
import "../../styles/scrollComponents.css";
export const HorizontalScroll = ({ children, }) => {
    return (_jsx("div", { className: "horizontal-scroll-container", children: _jsx("div", { className: "horizontal-scroll-content", children: children }) }));
};
export const VerticalScroll = ({ children }) => {
    return (_jsx("div", { className: "vertical-scroll-container", children: _jsx("div", { className: "vertical-scroll-content", children: children }) }));
};

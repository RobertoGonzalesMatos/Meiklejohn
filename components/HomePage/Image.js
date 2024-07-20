import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Image = ({ src, fallback, type = "image/webp", alt, }) => {
    return (_jsxs("picture", { children: [_jsx("source", { srcSet: src, type: type }), _jsx("img", { src: fallback, alt: alt })] }));
};
export default Image;

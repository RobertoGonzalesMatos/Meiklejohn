import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HorizontalScroll } from "../Helpers/ScrollComponents";
import "../../styles/cardView.css";
function cardView(props) {
    const imageHtml = document.createElement("img");
    imageHtml.src = "/images/image-" + props.imageURL + ".webp";
    return (_jsxs("div", { className: "card", children: [_jsx("div", { className: "upper-half", dangerouslySetInnerHTML: { __html: imageHtml.outerHTML } }), _jsxs("div", { className: "lower-half", children: [_jsxs("div", { className: "text-group", children: [_jsx("span", { className: "Name", children: props.name }), _jsx("span", { className: "Location", children: props.location })] }), _jsxs("div", { className: "text-group", children: [_jsx("span", { className: "Concentration", children: props.concentration }), _jsx("span", { className: "Year", children: props.year })] }), _jsx("div", { className: "text-group", children: _jsx("span", { className: "Email", children: props.email }) }), _jsx(HorizontalScroll, { children: _jsx("div", { className: "scroll-content", children: Array.isArray(props.tags) ? (props.tags.map((tag, index) => _jsx("span", { children: tag }, index))) : (_jsx("span", { children: props.tags })) }) })] })] }));
}
export default cardView;

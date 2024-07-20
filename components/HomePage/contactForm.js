import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import "../../styles/contactForm.css";
function Form({ onSubmit }) {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        message: "",
    });
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    }
    function handleTextAreaChange(event) {
        const { name, value } = event.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    }
    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(formData);
    }
    return (_jsx("div", { className: "main-div-form", children: _jsxs("form", { className: "contact-form", onSubmit: handleSubmit, children: [_jsxs("div", { className: "input-group", children: [_jsx("input", { "data-testid": "name-label", className: "input-bar-name", type: "text", id: "name", name: "name", value: formData.name, onChange: handleInputChange }), _jsx("label", { htmlFor: "name", className: "label-name", children: "Name:" })] }), _jsx("br", {}), _jsxs("div", { className: "input-group", children: [_jsx("input", { className: "input-bar-email", type: "text", id: "email", name: "email", value: formData.email, onChange: handleInputChange }), _jsx("label", { htmlFor: "email", className: "label-email", children: "Email:" })] }), _jsx("br", {}), _jsxs("div", { className: "input-group", children: [_jsx("textarea", { className: "input-bar-message", id: "message", name: "message", value: formData.message, onChange: handleTextAreaChange }), _jsx("label", { htmlFor: "message", className: "label-message", children: "Message:" })] }), _jsx("br", {}), _jsx("button", { className: "submit-button", type: "submit", children: "Submit" })] }) }));
}
export default Form;

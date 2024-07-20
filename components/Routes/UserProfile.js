import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../HomePage/Header";
import "../../styles/userProfile.css"; // Import your profile-specific styles
import { concentrations } from "../Helpers/concentrations";
import { VerticalScroll } from "../Helpers/ScrollComponents";
import cardView from "../Search/cardView";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { algoMeiks, changeInfo } from "./MeikHandler";
import { interests } from "../Helpers/tags";
import { stringToImage } from "../Helpers/ImageConvertor";
const UserProfile = (props) => {
    const [username, setUsername] = useState("Name");
    const [email, setEmail] = useState("email");
    const [concentration, setConcentration] = useState("Comp Sci");
    const [concentration2, setConcentration2] = useState("");
    const [concentration3, setConcentration3] = useState("");
    const [concentrationNum, setConNum] = useState(1);
    const [location, setLocation] = useState("example,RI");
    const [year, setYear] = useState("'28");
    const [tags, setTags] = useState([""]);
    const [uid, setUid] = useState("");
    const [allMeiksData, setAllMeiksData] = useState([]);
    const [images, setImages] = useState({});
    const auth = getAuth();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                setUid(user.uid);
            }
        });
        return () => unsubscribe(); // Cleanup the subscription when the component unmounts
    }, []);
    function addCon() {
        if (concentrationNum === 2) {
            return (_jsxs("div", { children: [_jsx("label", { htmlFor: "Concentration2", children: "Concentration 2:" }), _jsx("select", { id: "Concentration2", value: concentration2.replace(" & ", ""), onChange: (e) => {
                            if (e.target.value != "--") {
                                setConcentration2(" & " + e.target.value);
                            }
                            else {
                                setConcentration2("");
                            }
                        }, children: Object.values(concentrations).map((conc) => (_jsx("option", { value: conc, children: conc }, conc))) })] }));
        }
        else if (concentrationNum === 3) {
            return (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "Concentration2", children: "Concentration 2:" }), _jsx("select", { id: "Concentration2", value: concentration2.replace(" & ", ""), onChange: (e) => {
                                    if (e.target.value != "--") {
                                        setConcentration2(" & " + e.target.value);
                                    }
                                    else {
                                        setConcentration2("");
                                    }
                                }, children: Object.values(interests).map((int) => (_jsx("option", { value: int, children: int }, int))) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "Concentration3", children: "Concentration 3:" }), _jsx("select", { id: "Concentration3", value: concentration3.replace(" & ", ""), onChange: (e) => {
                                    if (e.target.value != "--") {
                                        setConcentration3(" & " + e.target.value);
                                    }
                                    else {
                                        setConcentration3("");
                                    }
                                }, children: Object.values(concentrations).map((conc) => (_jsx("option", { value: conc, children: conc }, conc))) })] })] }));
        }
        return null;
    }
    return (_jsxs("div", { children: [_jsx(Header, { onLinkClickContact: function () {
                    throw new Error("Function not implemented.");
                }, onLinkClickAbout: function () {
                    throw new Error("Function not implemented.");
                }, onLinkClickJoin: function () {
                    throw new Error("Function not implemented.");
                } }), _jsx(VerticalScroll, { children: _jsxs(motion.div, { initial: { opacity: 0, y: -400 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 400 }, transition: { duration: 0.2 }, className: "profile-container", children: [_jsx("span", { className: "Title", children: "Edit Your Profile!" }), _jsxs("div", { className: "encapsuler", children: [_jsxs("div", { className: "profile-content", children: [_jsx("input", { type: "text", id: "username", value: username, onChange: (e) => setUsername(e.target.value) }), _jsx("input", { "data-testid": "user-profile-location-input", type: "text", id: "location", value: location, onChange: (e) => setLocation(e.target.value) }), _jsx("select", { id: "Concentration", value: concentration, onChange: (e) => {
                                                setConcentration(e.target.value);
                                            }, children: Object.values(concentrations).map((conc) => (_jsx("option", { value: conc, children: conc }, conc))) }), addCon(), _jsx("button", { onClick: () => {
                                                if (concentrationNum < 3) {
                                                    setConNum(concentrationNum + 1);
                                                }
                                            }, children: "Add Concentration" }), _jsx("select", { id: "Tags", value: tags, onChange: (e) => {
                                                const value = e.target.value;
                                                if (tags.includes(value)) {
                                                    const updatedTags = tags.filter((tag) => tag !== value);
                                                    console.log(updatedTags);
                                                    setTags(updatedTags);
                                                }
                                                else {
                                                    setTags([...tags, e.target.value]);
                                                }
                                            }, multiple: true, children: Object.values(interests).map((conc) => (_jsx("option", { value: conc, children: conc }, conc))) }), _jsxs("select", { id: "year", value: year, onChange: (e) => setYear(e.target.value), children: [_jsx("option", { value: "'27", children: "'27" }), _jsx("option", { value: "'26", children: "'26" }), _jsx("option", { value: "'25", children: "'25" }), _jsx("option", { value: "'24", children: "'24" })] }), _jsx("button", { onClick: () => {
                                                changeInfo(uid, username, location, year, String(tags), concentration + concentration2 + concentration3, "FirstYears");
                                            }, children: "Save Changes" })] }), _jsxs("div", { className: "algoDiv", children: [_jsx("button", { className: "tryButton", onClick: () => {
                                                algoMeiks(uid)
                                                    .then((data) => {
                                                    const imagesObject = data["images"]; // Get the images object
                                                    // Convert each URL string to an image element using stringToImage function
                                                    const imageElements = {};
                                                    Object.entries(imagesObject).forEach(([key, url]) => {
                                                        const img = stringToImage(url);
                                                        img.setAttribute("key", key); // Set a key attribute for identifying images
                                                        imageElements[key] = img;
                                                    });
                                                    console.log(imageElements);
                                                    setImages(imageElements);
                                                    return data["results"]["meiks"];
                                                })
                                                    .then((data) => {
                                                    console.log(data);
                                                    const meikObjects = data.map((item) => typeof item === "string" ? JSON.parse(item) : item);
                                                    setAllMeiksData(meikObjects);
                                                });
                                            }, children: "Try me!" }), _jsx("div", { className: "MeikDiv", children: allMeiksData.map((meikObject, index) => (_jsx("div", { className: "Rows", style: { display: "inline-block" }, children: cardView(meikObject) }, index))) })] })] }), _jsx("button", { className: "SignOut", onClick: () => {
                                signOut(auth);
                            }, children: "Sign Out" })] }) })] }));
};
export default UserProfile;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../HomePage/Header";
import "../../styles/Profile.css"; // Import your profile-specific styles
import { concentrations } from "../Helpers/concentrations";
import { VerticalScroll } from "../Helpers/ScrollComponents";
import cardView from "../Search/cardView";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { changeInfo, singleMeik } from "./MeikHandler";
import { interests } from "../Helpers/tags";

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
  const [username, setUsername] = useState("Name");
  const [email, setEmail] = useState("email");
  const [concentration, setConcentration] = useState("Visual Arts");
  const [concentration2, setConcentration2] = useState("");
  const [concentration3, setConcentration3] = useState("");
  const [doubleConcentrating, addConcentration] = useState(false);
  const [location, setLocation] = useState("example,RI");
  const [year, setYear] = useState("'26");
  const [tags, setTags] = useState([""]);
  const [uid, setUid] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUid(user.uid);
        var data = singleMeik(user.uid);
        setUsername(data.name);
        setLocation(data.location);
        setYear(data.year);
        setTags(data.tags);
        setEmail(data.email);
        const constList = data.concentration.split(" & ");
        setConcentration(constList[0]);
        if (constList[1]) {
          setConcentration2(" & " + constList[1]);
        }
        if (constList[2]) {
          setConcentration3(" & " + constList[2]);
        }
      }
    });

    return () => unsubscribe(); // Cleanup the subscription when the component unmounts
  }, []);

  function addCon() {
    if (doubleConcentrating) {
      return (
        <div>
          <label htmlFor="Concentration2">Concentration 2:</label>
          <select
            id="Concentration2"
            value={concentration2.replace(" & ", "")}
            onChange={(e) => {
              if (e.target.value != "--") {
                setConcentration2(" & " + e.target.value);
              } else {
                setConcentration2("");
              }
            }}
          >
            {Object.values(concentrations).map((conc) => (
              <option key={conc} value={conc}>
                {conc}
              </option>
            ))}
          </select>
        </div>
      );
    }
    return null;
  }

  return (
    <div>
      <Header
        onLinkClickContact={function (): void {
          throw new Error("Function not implemented.");
        }}
        onLinkClickAbout={function (): void {
          throw new Error("Function not implemented.");
        }}
        onLinkClickJoin={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <VerticalScroll>
        <motion.div
          initial={{ opacity: 0, y: -400 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 400 }}
          transition={{ duration: 0.2 }}
          className="profile-container"
        >
          <span className="Title">Edit Your Profile!</span>
          <div className="profile-content">
            <div className="info-container">
              <b className="textHeader">Name:</b>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <b className="textHeader">Location:</b>
              <input
                data-testid="profile-location-input"
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <b className="textHeader">Concentration:</b>
              <select
                id="Concentration"
                value={concentration}
                onChange={(e) => {
                  setConcentration(e.target.value as concentrations);
                }}
              >
                {Object.values(concentrations).map((conc) => (
                  <option key={conc} value={conc}>
                    {conc}
                  </option>
                ))}
              </select>
              {addCon()}
              <button
                className="add-concentration"
                onClick={() => {
                  addConcentration(!doubleConcentrating);
                }}
              >
                Add Concentration
              </button>
              <b className="textHeader">Tags:</b>
              <select
                id="Tags"
                value={tags}
                onChange={(e) => {
                  const value = e.target.value;
                  if (tags.includes(value)) {
                    const updatedTags = tags.filter((tag) => tag !== value);
                    console.log(updatedTags);
                    setTags(updatedTags);
                  } else {
                    setTags([...tags, e.target.value]);
                  }
                }}
                multiple
              >
                {Object.values(interests).map((conc) => (
                  <option key={conc} value={conc}>
                    {conc}
                  </option>
                ))}
              </select>
              <b className="textHeader">Year:</b>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="'27">'27</option>
                <option value="'26">'26</option>
                <option value="'25">'25</option>
                <option value="'24">'24</option>
              </select>
              <button
                className="Save"
                onClick={() => {
                  changeInfo(
                    uid,
                    username,
                    location,
                    year,
                    String(tags),
                    concentration + concentration2 + concentration3,
                    "meiks"
                  );
                }}
              >
                Save Changes
              </button>
              <button
                className="SignOut"
                onClick={() => {
                  signOut(auth);
                }}
              >
                Sign Out
              </button>
            </div>
            <div style={{ transform: "scale(1.5)" }}>
              {cardView({
                name: username,
                concentration: concentration + concentration2 + concentration3,
                email: email,
                year: year,
                location: location,
                id: "",
                imageURL: "10",
                tags: tags,
                text: "",
              })}
            </div>
          </div>
        </motion.div>
      </VerticalScroll>
    </div>
  );
};

export default Profile;

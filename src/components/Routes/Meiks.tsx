import React, { useState, useEffect } from "react";
import cardView from "../Search/cardView";
import Header from "../HomePage/Header";
import "../../styles/Meiks.css";
import { motion } from "framer-motion";
import { VerticalScroll } from "../Helpers/ScrollComponents";
import { AllMeikData, updateSearch } from "./MeikHandler";
import Meik from "./MeikObject";
import { stringToImage } from "../Helpers/ImageConvertor";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface IMeikProps {}

const Meiks: React.FunctionComponent<IMeikProps> = (props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [meikObjects, setMeikObjects] = useState<Meik[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUid(user.uid);
      }
    });

    return () => unsubscribe();
  });
  const addTag = (e: KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const tag = inputValue.trim();
      if (tag.length > 1 && !tags.includes(tag)) {
        setTags([...tags, tag]);
        setInputValue("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  useEffect(() => {
    const ul = document.querySelector("ul");
    const input = ul?.querySelector("input");

    const handleKey = (ev: KeyboardEvent) => {
      // if (ev === KeyboardEvent){
      addTag(ev);
      // }
    };

    input?.addEventListener("keyup", handleKey);

    while (AllMeikData.length === 0) {
      setTimeout(() => {
        setMeikObjects(AllMeikData);
      }, 500);
    }
    if (tags.length !== 0) {
      setMeikObjects(updateSearch(tags));
    } else if (meikObjects.length === 0 || tags.length === 0) {
      setMeikObjects(AllMeikData);
    }
    return () => {
      input?.removeEventListener("keyup", handleKey);
    };
  }, [tags, inputValue]);

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
        {" "}
        <motion.div
          className="MainBody"
          initial={{ opacity: 0, y: -400 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 400 }}
          transition={{ duration: 0.2 }}
        >
          <span className="Title">Find the perfect Meik for you!</span>
          <ul className="TagBox">
            {tags.map((tag) => (
              <li key={tag}>
                {tag}
                <span className="X" onClick={() => removeTag(tag)}>
                  ×
                </span>
              </li>
            ))}
            <input
              data-testid="search-bar-test"
              className="SearchBarInput"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </ul>
          <div className="MeikBody">
            {meikObjects.map((meikObject, index) => (
              <div
                className="Rows"
                key={index}
                style={{ display: "inline-block" }}
              >
                {cardView(meikObject)}
              </div>
            ))}
          </div>
        </motion.div>
      </VerticalScroll>
    </div>
  );
};

export default Meiks;

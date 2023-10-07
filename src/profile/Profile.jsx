import "./profile.css";
import { AiFillGithub } from "react-icons/ai";
import { BsFillPaletteFill, BsFillPersonFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { useHotkeys } from "react-hotkeys-hook";
import Timer from "../stopwatch/stopwatch";
import { useContext, useState } from "react";
import AppContext from "../AppContext";
import SettingsOverlay from "./settings-overlay/Overlay";
 
const Profile = () => {
  const [settingsVisible, setsettingsVisible] = useState(false);

  function loginPopup(){
    console.log("loginpopup called")
  }

  useHotkeys("esc", () => {
    if (settingsVisible) {
      settingsModal();
    }
  });

  
const BackgroundDim = () => {
  
  const dimStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Gray background with 50% opacity
    zIndex: 5, // Ensures the dim overlay is on top of other content
  };

  return <div onClick={settingsModal} style={dimStyle}></div>;
};

  function settingsModal() {
    setsettingsVisible(!settingsVisible);
  }

  function redirectGithub() {
    let url = "https://github.com/Anu78/sudoku-solver";

    window.open(url, "_blank");
  }

  const { userSolving } = useContext(AppContext);
  return (
    <div id="container">
      {settingsVisible ? <SettingsOverlay /> : ""}
      {settingsVisible ? <BackgroundDim/> : ""}
      <div id="profile">
        <div id="settings">
          <span
            id="settings-rotate"
            className="profile-icon icons"
            onClick={settingsModal}
          >
            <FiSettings />
          </span>
        </div>
        <div id="login">
          <span
            id="profile-animate"
            className="profile-icon icons"
            onClick={loginPopup}
          >
            <BsFillPersonFill />
          </span>
          <p>{""}</p>
        </div>
      </div>
      <div id="timer">
        <Timer start={userSolving} stop={!userSolving} />
      </div>
      <div id="footer">
        <div className="footer-half" id="theme">
          <span className="icons">
            <BsFillPaletteFill />
          </span>
          <p className="side-text">default</p>
        </div>
        <div onClick={redirectGithub} className="footer-half" id="github">
          <span className="icons">
            <AiFillGithub />
          </span>
          <p className="side-text">v0.1a</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

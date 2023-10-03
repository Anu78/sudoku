import "./profile.css";
import { AiFillGithub } from "react-icons/ai";
import { BsFillPaletteFill, BsFillPersonFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import Timer from "../stopwatch/stopwatch";
import { useContext } from "react";
import AppContext from "../AppContext";

const Profile = () => {
  function loginPopup() {}

  function settingsModal() {}

  function redirectGithub() {
    let url = "https://github.com/Anu78/sudoku-solver";

    window.open(url, "_blank");
  }

  const { userSolving } = useContext(AppContext);
  return (
    <div id="container">
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

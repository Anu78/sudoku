import { useState } from "react";
import "./overlay.css";
import General from "./settings/general/General";
import Style from "./settings/style/Style";
import Account from "./settings/account/Account";
import Feedback from "./settings/feedback/Feedback";
import Stats from "./settings/stats/stats";
import Solver from "./settings/solver/Solver";

const SettingsOverlay = () => {
  const [selectedCat, setselectedCat] = useState("general");

  const handleCatChange = (event) => {
    const textContent = event.target.textContent;

    setselectedCat(textContent);
  };

  return (
    <div className="settings-overlay">
      <div className="cats-div">
        <h3 id="settings-hd">settings</h3>
        <ul className="cat-container">
          <li
            onClick={handleCatChange}
            className={`cat-list ${
              selectedCat === "general" ? "selected" : ""
            }`}
          >
            general
          </li>
          <li
            onClick={handleCatChange}
            className={`cat-list ${selectedCat === "style" ? "selected" : ""}`}
          >
            style
          </li>
          <li
            onClick={handleCatChange}
            className={`cat-list ${selectedCat === "solver" ? "selected" : ""}`}
          >
            solver
          </li>
          <li
            onClick={handleCatChange}
            className={`cat-list ${
              selectedCat === "account" ? "selected" : ""
            }`}
          >
            account
          </li>

          <li
            onClick={handleCatChange}
            className={`cat-list ${selectedCat === "stats" ? "selected" : ""}`}
          >
            stats
          </li>
          <li
            onClick={handleCatChange}
            className={`cat-list ${
              selectedCat === "feedback" ? "selected" : ""
            }`}
          >
            feedback
          </li>
        </ul>
      </div>
      <div className="options">
        {selectedCat === "general" && <General />}
        {selectedCat === "style" && <Style />}
        {selectedCat === "solver" && <Solver />}
        {selectedCat === "account" && <Account />}
        {selectedCat === "stats" && <Stats />}
        {selectedCat === "feedback" && <Feedback />}
      </div>
    </div>
  );
};

export default SettingsOverlay;

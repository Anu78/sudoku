import { useState } from "react";
import "./overlay.css";
import General from "./settings/general/General";
import Style from "./settings/style/Style";

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
          <li onClick={handleCatChange} className="cat-list">
            general
          </li>
          <li onClick={handleCatChange} className="cat-list">
            style
          </li>
          <li onClick={handleCatChange} className="cat-list">
            solver
          </li>
          <li onClick={handleCatChange} className="cat-list">
            account
          </li>
          <li onClick={handleCatChange} className="cat-list">
            stats
          </li>
          <li onClick={handleCatChange} className="cat-list">
            keyboard
          </li>
          <li onClick={handleCatChange} className="cat-list">
            feedback
          </li>
        </ul>
      </div>
      <div className="options">
        {selectedCat === "general" && <General />}
        {selectedCat === "style" && <Style />}
        {selectedCat === "solver" && <Style />}
        {selectedCat === "account" && <Style />}
        {selectedCat === "stats" && <Style />}
        {selectedCat === "keyboard" && <Style />}
        {selectedCat === "feedback" && <Style />}
      </div>
    </div>
  );
};

export default SettingsOverlay;

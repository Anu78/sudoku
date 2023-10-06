import "./overlay.css"

const ShortcutOverlay = () => {
    return ( 
        <div className="shortcut-overlay">
            <h2 className="overlayHeading">keyboard shortcuts</h2>
            <ul className="key-items">
                <li><span className="keys">?</span> - show overlay</li>
                <li><span className="keys">s</span> - solve board</li>
                <li><span className="keys">r</span> - reset board</li>
                <li><span className="keys">g</span> - generate new puzzle</li>
                <li><span className="keys">h</span> - toggle board highlight</li>
                <li><span className="keys">v</span> - toggle board verification</li>
                <li><span className="keys">esc</span> - interrupt solving</li>
            </ul>
        </div>
    );
}
 
export default ShortcutOverlay;
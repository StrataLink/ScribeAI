import React from "react";
import "./Sidebar.css";

const Sidebar = ({ entries, createFunc }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <button className="create-button" onClick={createFunc}>
          +
        </button>
        <div className="placeholder-div"></div>
      </div>
      <div className="entries">
        {entries.map((entry) => (
          <div key={entry._id} className="entry">
            <span className="entry-title">{entry.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

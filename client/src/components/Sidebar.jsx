import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sidebar.css";

const Sidebar = ( {entries, createFunc, profileFunc } ) => {

    const handleCreateEntry = () => {
        createFunc();
    }

    return (
      <div className="sidebar-wrapper">
        <button onClick={handleCreateEntry}></button>
        <div className="entrylist-div">{entries.map((entry) => {
            <div key={entry._id} className="entry-div">
                <input type="text" />
            </div>
        })}</div>
      </div>
    );
    
}

export default Sidebar;
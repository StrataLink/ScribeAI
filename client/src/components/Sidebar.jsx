import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from 'react-icons/fa';
import { FaChevronLeft } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ entries, setEntries, createFunc, deleteFunc, user  }) => {
  const navigate = useNavigate();

  const handleOnClick = async (entryCode) => {
    navigate(`/main/${entryCode}`);
  };

  const handleDelete = async (entryId, e) => {
    e.stopPropagation(); // Prevent onClick event from firing when the delete button is clicked
    try {
      await fetch(`http://localhost:3001/api/entry/delete-entry/${entryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const indexToDelete = entries.findIndex((item) => item._id === entryId);

      // If the item is found (index is not -1), remove it from the list
      if (indexToDelete !== -1) {
        const updatedItems = [...entries];
        updatedItems.splice(indexToDelete, 1);
        setEntries(updatedItems);
      }
      navigate("/main");
    } catch (error) {
      // Handle error (e.g., show error message, log the error, etc.)
      console.error("Error deleting room:", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <button className="create-button" onClick={createFunc}>
          <FaPlus/> Create
        </button>
        <div className="placeholder-div"><FaChevronLeft/></div>
      </div>
      <div className="entries">
        {entries.map((entry) => (
          <div
            key={entry._id}
            className="entry"
            onClick={() => handleOnClick(entry._id)}
          >
            <span className="entry-title">{entry.title}</span>
            <button
              className="delete-button"
              onClick={(e) => handleDelete(entry._id, e)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="user-display">
          <div className="user-avatar">
            <img src="/path-to-avatar-image.jpg" alt="User Avatar" />
          </div>
          <div className="user-info">
            <h3 className="user-name">{user}</h3>
          </div>
        </div>
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";

const AddNoteModal = ({ isOpen, onClose, onSave }) => {
  const [note, setNote] = useState("");

  const handleSaveNote = () => {
    onSave(note);
    setNote("");
  };

  return (
    <div className={`modal fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-1/4 mt-80 mx-auto p-4 rounded shadow-lg relative z-60">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Note</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <input
          className="w-full h-24 border rounded p-2 mb-4"
          placeholder="Enter your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
            onClick={handleSaveNote}
          >
            Save
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;

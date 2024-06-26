import React, { useState } from "react";
import axios from "axios";
import Modal from "./NewTaskModal"; // Assuming TaskModal exists and handles task creation/editing
import EditTaskModal from "./EdittaskModal"; // Import the new EditTaskModal component

const Dropdown = ({
  task,
  onDuplicateTask,
  onChangeStatusToClosed,
  onUpdateTask,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
  const [editTask, setEditTask] = useState(null); // State to hold task being edited

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEditClick = () => {
    setEditTask(task); // Set the task to be edited
    setIsEditModalOpen(true); // Open the edit modal
    setIsDropdownOpen(false); // Close the dropdown
  };

  const handleDuplicateClick = () => {
    onDuplicateTask(task); // Duplicate the task
    setIsDropdownOpen(false); // Close the dropdown
  };

  const handleStatusClick = () => {
    onChangeStatusToClosed(task); // Change task status to closed
    setIsDropdownOpen(false); // Close the dropdown
  };

  const handleSaveEdit = (updatedTask) => {
    onUpdateTask(updatedTask); // Update the task in the parent component
    setIsEditModalOpen(false); // Close the edit modal
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={toggleDropdown}
      >
        Options
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          className="absolute right-0 mr-12 z-50 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          style={{ zIndex: 50 }}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              type="button"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              type="button"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
              onClick={handleDuplicateClick}
            >
              Duplicate
            </button>
            <button
              type="button"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
              onClick={handleStatusClick}
            >
              Change Status to Closed
            </button>
          </div>
        </div>
      )}

      {/* Modal for creating new task */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Modal for editing task */}
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        taskId={editTask?.id}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default Dropdown;

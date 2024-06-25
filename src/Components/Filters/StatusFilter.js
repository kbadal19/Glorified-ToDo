import React, { useState } from "react";

const StatusFilter = ({ onFilterChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({
    open: false,
    closed: false,
  });

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCheckboxChange = (status) => {
    setSelectedStatus((prevStatus) => {
      const newStatus = { ...prevStatus, [status]: !prevStatus[status] };
      onFilterChange(newStatus);
      return newStatus;
    });
  };

  return (
    <div className="relative inline-block text-left">
      <button onClick={toggleDropdown} className="focus:outline-none rounded-full hover:bg-slate-300 ml-4 w-6 h-6 items-center justify-center flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div className="p-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedStatus.open}
                onChange={() => handleCheckboxChange("open")}
              />
              <span className="ml-2">Open</span>
            </label>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedStatus.closed}
                onChange={() => handleCheckboxChange("closed")}
              />
              <span className="ml-2">Closed</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusFilter;

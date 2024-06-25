import React, { useState } from "react";

const TopNavbar = () => {
  const [showCompanies, setShowCompanies] = useState(false);

  const toggleCompanies = () => {
    setShowCompanies(!showCompanies);
  };

  const companies = ["Company 1", "Company 2", "Company 3"]; // Replace with your actual company names

  return (
    <nav className="bg-sky-900 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <img
          src="https://blog.privatecircle.co/wp-content/uploads/2022/06/cropped-cropped-1-1-2-1.png"
          className="h-8"
          alt="Logo"
        />
        <span
          className="w-3/4 h-8 bg-white shadow-sm rounded-md cursor-pointer flex items-center"
          onClick={toggleCompanies}
        >
          <div className="w-1/5 h-8 bg-gray-200 rounded-l-md justify-center items-center flex-wrap flex text-md text-gray-700">
            Companies
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 ml-1 transform ${showCompanies ? 'rotate-180' : 'rotate-0'}`}
              viewBox="0 0 24 24"
            >
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
        </span>
        <span className="w-36 h-8 text-white text-end">
          Firstname Lastname
          <div className="text-xs -mt-1 font-thin">
            Company name private lim..
          </div>
        </span>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQg-lr5__zRqY3mRg6erzAD9n4BGp3G8VfA&s"
          alt="Profile"
          className="rounded-full h-8 w-8"
        />
      </div>
      {showCompanies && (
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto h-6 bg-white">
          <div className="text-sky-900 justify-between items-center flex p-2">
            {companies.map((company, index) => (
              <button
                key={index}
                className="mx-2 px-2 -mt-3 text-xs font-normal text-sky-900 hover:bg-gray-200 rounded"
              >
                {company}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto h-6">
        <div className="text-white justify-between items-center flex">
          <button className="mx-2 p-2 -mt-3 text-xs font-semibold ml-24">
            DASHBOARD
          </button>
          <button className="mx-2 p-2 -mt-3 text-xs font-semibold">
            COMPANIES
          </button>
          <button className="mx-2 p-2 -mt-3 text-xs font-semibold">
            FUNDS
          </button>
          <button className="mx-2 p-2 -mt-3 text-xs font-semibold">HNIs</button>
          <button className="mx-2 p-2 -mt-3 text-xs font-normal">
            MESSAGING
          </button>
          <button className="mx-2 p-2 -mt-3 text-xs font-normal">
            MEETINGS
          </button>
          <button className="mx-2 p-2 -mt-3 text-xs font-normal">NOTES</button>
          <button className="mx-2 p-2 -mt-3 text-xs font-normal">
            DOCUMENTS
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
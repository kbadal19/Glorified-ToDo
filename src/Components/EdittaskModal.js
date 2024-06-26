import React, { useState, useEffect } from "react";
import axios from "axios";

const EditTaskModal = ({ isOpen, onClose, taskId, onSave }) => {
  const [entityName, setEntityName] = useState("");
  const [status, setStatus] = useState("open");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [notes, setNotes] = useState("");
  const [taskType, setTaskType] = useState("call");

  useEffect(() => {
    if (isOpen && taskId) {
      // Fetch the task data from the API
      const fetchTask = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/tasks/${taskId}`);
          const task = response.data;
          setEntityName(task.entity_name);
          setStatus(task.status);
          setDate(task.date);
          setTime(task.time);
          setContactPerson(task.contact_person);
          setNotes(task.notes);
          setTaskType(task.task_type);
        } catch (error) {
          console.error("Error fetching task:", error);
        }
      };

      fetchTask();
    }
  }, [isOpen, taskId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = {
      entity_name: entityName,
      status: status,
      date: date,
      time: time,
      contact_person: contactPerson,
      notes: notes,
      task_type: taskType,
    };

    try {
      const response = await axios.put(`http://localhost:5000/tasks/${taskId}`, formData);
      console.log("Task updated:", response.data);
      onClose();
      onSave(response.data); // Pass the updated task back to the parent component
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none shadow-lg">
      <div className="relative w-full max-w-3xl mx-auto my-6">
        <div className="relative p-6 bg-white shadow-md rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-800">Edit Task</h1>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSave}>
            <div className="flex mb-4">
              <button
                type="button"
                className={`py-2 px-4 ${
                  status === "open"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-300 text-gray-800"
                } rounded-l-md`}
                onClick={() => setStatus("open")}
              >
                Open
              </button>
              <button
                type="button"
                className={`py-2 px-4 ${
                  status === "closed"
                    ? "bg-gray-300 text-gray-800"
                    : "bg-orange-500 text-white"
                } rounded-r-md`}
                onClick={() => setStatus("closed")}
              >
                Closed
              </button>
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="entityName"
                placeholder="Entity name"
                value={entityName}
                onChange={(e) => setEntityName(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div className="flex mb-4">
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-1/2 mr-2"
                required
              />
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-1/2"
                required
              />
            </div>
            <div className="mb-4">
              <div className="relative">
                <select
                  id="taskType"
                  value={taskType}
                  onChange={(e) => setTaskType(e.target.value)}
                  className="appearance-none w-full py-2 px-3 border border-gray-300 rounded-md leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="call">Call</option>
                  <option value="meeting">Meeting</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="contactPerson"
                placeholder="Contact person"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="phoneNumber"
                placeholder="Phone number"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <textarea
                id="notes"
                placeholder="Note (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="4"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;

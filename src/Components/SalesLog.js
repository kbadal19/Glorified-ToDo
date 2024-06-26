import React, { useEffect, useState } from "react";
import Modal from "./NewTaskModal";
import axios from "axios";
import AddNoteModal from "./AddNoteModal";
import OptionsDropdown from "./OptionsDropdown";
import StatusFilter from "./Filters/StatusFilter";
import NoteFilter from "./Filters/NoteFilter";

const SalesLog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [addNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [noteFilter, setNoteFilter] = useState({
    hasNotes: true,
    withoutNotes: true,
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);
      setFilteredTasks(response.data); // Initialize filteredTasks with fetched tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    let updatedFilteredTasks = tasks;

    const { hasNotes, withoutNotes } = noteFilter;
    if (!(hasNotes && withoutNotes)) {
      if (hasNotes) {
        updatedFilteredTasks = updatedFilteredTasks.filter(
          (task) => task.notes
        );
      } else if (withoutNotes) {
        updatedFilteredTasks = updatedFilteredTasks.filter(
          (task) => !task.notes
        );
      } else {
        updatedFilteredTasks = [];
      }
    }

    setFilteredTasks(updatedFilteredTasks);
  }, [tasks, noteFilter]);

  const handleStatusFilterChange = (selectedStatus) => {
    const { open, closed } = selectedStatus;
    if (open && closed) {
      setFilteredTasks(tasks);
    } else if (open) {
      setFilteredTasks(tasks.filter((task) => task.status === "open"));
    } else if (closed) {
      setFilteredTasks(tasks.filter((task) => task.status === "closed"));
    } else {
      setFilteredTasks([]);
    }
  };

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleFilterChange = (selectedStatus) => {
    const { open, closed } = selectedStatus;
    if (open && closed) {
      setFilteredTasks(tasks);
    } else if (open) {
      setFilteredTasks(tasks.filter((task) => task.status === "open"));
    } else if (closed) {
      setFilteredTasks(tasks.filter((task) => task.status === "closed"));
    } else {
      setFilteredTasks([]);
    }
  };

  const handleNoteFilterChange = (selectedNoteFilter) => {
    setNoteFilter(selectedNoteFilter);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openNewTaskModal = () => {
    openModal();
  };

  const addNewTask = async (newTaskData) => {
    try {
      await axios.post("http://localhost:5000/tasks/add", newTaskData);
      fetchTasks();
      closeModal();
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  const handleAddNoteClick = (taskId) => {
    setSelectedTaskId(taskId);
    setAddNoteModalOpen(true);
  };

  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  const addNote = async (selectedTaskId, newNote) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${selectedTaskId}`, {
        notes: newNote,
      });
      fetchTasks();
      setAddNoteModalOpen(false);
    } catch (error) {
      console.error("Error adding new note:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="p-4 bg-gray-50 w-3/4 mt-10 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-800">SALES LOG</h1>
          <button
            className="flex items-center bg-transparent hover:bg-gray-300 text-slate-800 font-semibold py-2 px-4 border border-slate-800 rounded ml-4"
            onClick={openNewTaskModal}
          >
            <svg
              className="svg-icon"
              style={{
                width: "1em",
                height: "1em",
                verticalAlign: "middle",
                strokeWidth: "2%",
                marginRight: "0.5em",
              }}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M830.3616 193.6384c-91.8528-91.8528-214.016-142.4384-343.9616-142.4384s-252.0576 50.5856-343.9616 142.4384-142.4384 214.016-142.4384 343.9104 50.5856 252.0576 142.4384 343.9616 214.016 142.4384 343.9616 142.4384 252.0576-50.5856 343.9616-142.4384 142.4384-214.016 142.4384-343.9616-50.5856-252.0576-142.4384-343.9104zM486.4 972.8c-239.9744 0-435.2-195.2256-435.2-435.2s195.2256-435.2 435.2-435.2c239.9744 0 435.2 195.2256 435.2 435.2s-195.2256 435.2-435.2 435.2z"
                stroke="rgb(7 89 133)"
                strokeWidth="24"
              />
              <path
                d="M793.6 512l-281.6 0 0-281.6c0-14.1312-11.4688-25.6-25.6-25.6s-25.6 11.4688-25.6 25.6l0 281.6-281.6 0c-14.1312 0-25.6 11.4688-25.6 25.6s11.4688 25.6 25.6 25.6l281.6 0 0 281.6c0 14.1312 11.4688 25.6 25.6 25.6s25.6-11.4688 25.6-25.6l0-281.6 281.6 0c14.1312 0 25.6-11.4688 25.6-25.6s-11.4688-25.6-25.6-25.6z"
                strokeWidth="24"
              />
            </svg>
            <span>New Task</span>
          </button>
          <input
            type="text"
            placeholder="Search"
            className="ml-auto p-2 border border-gray-300 rounded-md"
          />
        </div>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
          Use the{" "}
          <span className="font-bold mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="inline w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z"
                clipRule="evenodd"
              />
            </svg>
          </span>{" "}
          icon next to the table titles to apply filters
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-4 text-left text-gray-600 font-medium">
                  <div className="flex items-center justify-center">
                    Date
                    <span className="ml-2">
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
                    </span>
                  </div>
                </th>
                <th className="px-2 py-4 text-left text-gray-600 font-medium">
                  <div className="flex items-center justify-center">
                    Entity Name
                    <span className="ml-2">
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
                    </span>
                  </div>
                </th>
                <th className="px-2 py-4 text-left text-gray-600 font-medium">
                  <div className="flex items-center justify-center">
                    Task Type
                    <span className="ml-2">
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
                    </span>
                  </div>
                </th>
                <th className="px-2 py-4 text-left text-gray-600 font-medium">
                  <div className="flex items-center justify-center">
                    Time
                    <span className="ml-2">
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
                    </span>
                  </div>
                </th>
                <th className="px-2 py-4 text-left text-gray-600 font-medium">
                  <div className="flex items-center justify-center">
                    Contact Person
                    <span className="ml-2">
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
                    </span>
                  </div>
                </th>
                <th className="px-2 py-4 text-left text-gray-600 font-medium">
                  <div className="flex items-center justify-center">
                    Notes
                    <span className="ml-2">
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
                    </span>
                  </div>
                </th>
                <th className="px-2 py-4 text-left text-gray-600 font-medium">
                  <div className="flex items-center justify-center">
                    Status
                    <StatusFilter onFilterChange={handleFilterChange} />
                  </div>
                </th>
                <th className="px-2 py-4 text-left text-gray-600 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id} className="border-b">
                  <td className="py-2 text-sm">{task.date}</td>
                  <td className="px-4 py-2 text-blue-600">
                    {task.entity_name}
                  </td>
                  <td className="px-4 py-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={
                          task.task_type === "Meeting"
                            ? "M5.121 19.121A4 4 0 1 0 4 16h16a4 4 0 1 0 1.121 3.121L12 7l-6.879 12.121z"
                            : "M7 7a7.002 7.002 0 0 1 6-6.93V2m-1 20h2a4 4 0 0 0 4-4v-6a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6zm1 0v-4a2 2 0 1 0-4 0v4"
                        }
                      />
                    </svg>
                    {task.task_type}
                  </td>
                  <td className="py-2 text-sm">
                    {convertTo12HourFormat(task.time)}
                  </td>
                  <td className="px-4 py-2">{task.contact_person}</td>
                  <td className="px-4 py-2">
                    {task.notes ? (
                      task.notes
                    ) : (
                      <button
                        className="flex items-center justify-center bg-transparent hover:bg-gray-300 text-slate-800 font-semibold py-2 px-4 border border-slate-800 rounded h-8 w-36 ml-16"
                        onClick={() => handleAddNoteClick(task.id)}
                      >
                        <svg
                          className="svg-icon"
                          style={{
                            width: "1em",
                            height: "1em",
                            verticalAlign: "middle",
                            strokeWidth: "2%",
                            marginRight: "0.5em",
                          }}
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M830.3616 193.6384c-91.8528-91.8528-214.016-142.4384-343.9616-142.4384s-252.0576 50.5856-343.9616 142.4384-142.4384 214.016-142.4384 343.9104 50.5856 252.0576 142.4384 343.9616 214.016 142.4384 343.9616 142.4384 252.0576-50.5856 343.9616-142.4384 142.4384-214.016 142.4384-343.9616-50.5856-252.0576-142.4384-343.9104zM486.4 972.8c-239.9744 0-435.2-195.2256-435.2-435.2s195.2256-435.2 435.2-435.2c239.9744 0 435.2 195.2256 435.2 435.2s-195.2256 435.2-435.2 435.2z"
                            stroke="rgb(7 89 133)"
                            strokeWidth="24"
                          />
                          <path
                            d="M793.6 512l-281.6 0 0-281.6c0-14.1312-11.4688-25.6-25.6-25.6s-25.6 11.4688-25.6 25.6l0 281.6-281.6 0c-14.1312 0-25.6 11.4688-25.6 25.6s11.4688 25.6 25.6 25.6l281.6 0 0 281.6c0 14.1312 11.4688 25.6 25.6 25.6s25.6-11.4688 25.6-25.6l0-281.6 281.6 0c14.1312 0 25.6-11.4688 25.6-25.6s-11.4688-25.6-25.6-25.6z"
                            strokeWidth="24"
                          />
                        </svg>
                        <span>Add Note</span>
                      </button>
                    )}
                  </td>
                  <td
                    className={`px-4 py-2 ${
                      task.status === "open"
                        ? "text-orange-500"
                        : "text-blue-500"
                    }`}
                  >
                    {task.status}
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 hover:underline">
                      <OptionsDropdown />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} onSave={addNewTask} />
        <AddNoteModal
          isOpen={addNoteModalOpen}
          onClose={() => setAddNoteModalOpen(false)}
          onSave={(note) => addNote(selectedTaskId, note)}
        />
      </div>
    </div>
  );
};

export default SalesLog;

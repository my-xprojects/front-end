// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import TaskFormModal from './TaskFormModal';
import TaskDetailsModal from './TaskDetailsModal';
import '../TaskList.css'; // Import your CSS file

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/tasks/');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const tasksArray = Object.values(data);
      setTasks(tasksArray);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleOpenFormModal = () => {
    setIsFormModalOpen(true);
    setSelectedTask(null); // Clear selected task for a new task
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
  };

  const handleOpenDetailsModal = (task) => {
    setIsDetailsModalOpen(true);
    setSelectedTask(task);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsFormModalOpen(true);
  };

  const handleSubmitTask = (newTask) => {
    // For demo purposes, just add the new task to the local state or update the existing task
    const updatedTasks = selectedTask
      ? tasks.map((task) => (task.id === selectedTask.id ? newTask : task))
      : [...tasks, newTask];

    setTasks(updatedTasks);

    // Close the modal
    handleCloseFormModal();
    handleCloseDetailsModal();
  };

  return (
    <div className="task-list-container">
      <div>
        <h2>Task List</h2>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index + 1} className="task-item" onClick={() => handleOpenDetailsModal(task)}>
              <span className="task-title">{task.title}</span>
              <span className="task-descriptione">{task.description}</span>
              <span className="task-due-date">{task.due_date}</span>
            </li>
          ))}
        </ul>
        <TaskDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          selectedTask={selectedTask}
          onEdit={handleEditTask}
        />
      </div>

      <button className="add-task-button" onClick={handleOpenFormModal}>
        Add Task
      </button>

      <TaskFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSubmit={handleSubmitTask}
        selectedTask={selectedTask}
      />
    </div>
  );
};

export default TaskList;

// src/components/TaskDetailsModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import TaskFormModal from './TaskFormModal'; // Import the TaskFormModal

const TaskDetailsModal = ({ isOpen, onClose, selectedTask, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...selectedTask });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const handleClose = () => {
    onClose();
  };

  const handleChange = (field, value) => {
    setEditedTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Task Details Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '400px',
          margin: 'auto',
          padding: '20px',
        },
      }}
    >
      <div>
        <h2>Task Details</h2>
        {isEditing ? (
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
            <label>Description:</label>
            <textarea
              value={editedTask.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
            <label>Due Date:</label>
            <input
              type="date"
              value={editedTask.due_date}
              onChange={(e) => handleChange('due_date', e.target.value)}
            />
            <button onClick={handleSaveClick}>Save</button>
          </div>
        ) : (
          <div>
            <p><strong>Title:</strong> {selectedTask.title}</p>
            <p><strong>Description:</strong> {selectedTask.description}</p>
            <p><strong>Due Date:</strong> {selectedTask.due_date}</p>
            <button onClick={handleEditClick}>Edit</button>
          </div>
        )}
      </div>
      <button onClick={handleClose}>Close</button>
    </Modal>
  );
};

export default TaskDetailsModal;

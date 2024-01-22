// src/components/TaskFormModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';
import './../TaskFormModal.css';

const TaskFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [assignee, setAssignee] = useState('');

  const priorities = ['low', 'medium', 'high'];
  const currentDate = new Date().toISOString().split('T')[0];

  const handleSubmit = async () => {
    try {
      // Check if any of the required fields is empty
      if (!title || !dueDate || !priority || !assignee) {
        console.error('All fields must be filled out.');
        return;
      }

      const newTask = {
        id: uuidv4(),
        title,
        description,
        due_date: dueDate,
        priority,
        assignee,
      };

      const taskID = uuidv4();

      const response = await fetch(`http://localhost:8000/create-task/${taskID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      onSubmit(data);

      // Clear form inputs
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('');
      setAssignee('');

      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Task Form Modal"
      className="modal-container" // Add the class name for the modal container
    >
      <h2 className="modal-header">Add Task</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <label className="form-label">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
        />
  
        <label className="form-label">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
          required
        />
  
        <label className="form-label">Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={currentDate}
          className="form-input"
          required
        />
  
        <label className="form-label">Priority:</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="form-select"
          required
        >
          <option value="">Select Priority</option>
          {priorities.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
  
        <label className="form-label">Assignee:</label>
        <input
          type="text"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="form-input"
          required
        />
  
        {/* <button onClick={handlePreviousStep} className="form-button">Back</button> */}
        <button type="submit" className="form-button">Submit</button>
      </form>
      <button onClick={onClose} className="form-close-button">Close</button>
    </Modal>
  );
};

export default TaskFormModal;

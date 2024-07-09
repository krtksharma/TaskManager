// frontend/src/components/TaskListItem.jsx
import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';

const TaskListItem = ({ task, handleDeleteTask, setSelectedTask, setShowModal }) => {
  // Function to format the dueDate to MM/DD/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();  // Format the date as MM/DD/YYYY
  };

  return (
    <ListGroup.Item className="task-list-item">
      <div className="d-flex justify-content-between align-items-start">
        <div className="task-item-content flex-column">
          <h5 className="text-truncate">{task.name}</h5>
          <p className="description-field"><strong>Description:</strong> {task.description}</p>
          <p><strong>Due Date:</strong> {formatDate(task.dueDate)}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Tags:</strong> {task.tags ? task.tags.join(', ') : ''}</p>  {/* Default to empty string if tags are undefined */}
          <p><strong>Collaborators:</strong> {task.collaborators ? task.collaborators.join(', ') : ''}</p> {/* Default to empty string if collaborators are undefined */}
        </div>
        <div className="task-item-buttons">
          <Button
            variant="secondary"
            onClick={() => {
              setSelectedTask(task);
              setShowModal(true);
            }}
          >
            <FaEdit />
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteTask(task._id)}
            className="mt-2"
          >
            <FaTrash />
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default TaskListItem;

import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";

const TaskList = ({ tasks, onEditTask, handleDeleteTask }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(); // Format the date as MM/DD/YYYY
  };

  return (
    <ListGroup>
      {tasks.map((task) => (
        <ListGroup.Item
          key={task._id}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            <h5>{task.name}</h5>
            <p>{task.description}</p>
            <p>
              <strong>Due Date:</strong> {formatDate(task.dueDate)}
            </p>
            <p>
              <strong>Collaborators:</strong> {task.collaborators.join(", ")}
            </p>
            <p>
              <strong>Tags:</strong> {task.tags.join(", ")}
            </p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
            <p>
              <strong>Priority:</strong> {task.priority}
            </p>
          </div>
          <div>
            <Button
              variant="secondary"
              onClick={() => onEditTask(task)}
              className="me-2"
            >
              {" "}
              <FaEdit />
            </Button>
            <Button variant="danger" onClick={() => handleDeleteTask(task._id)}>
              <FaTrash />
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TaskList;

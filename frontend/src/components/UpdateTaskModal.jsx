import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateTaskModal = ({ task, onHide, onUpdate }) => {
  const [updatedTask, setUpdatedTask] = useState(task);

  useEffect(() => {
    setUpdatedTask(task);
  }, [task]);

  const handleUpdate = (event) => {
    event.preventDefault();
    onUpdate(updatedTask);
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="taskName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={updatedTask.name}
              onChange={(e) => setUpdatedTask({ ...updatedTask, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="taskDescription" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={updatedTask.description}
              onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="taskDueDate" className="mt-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={updatedTask.dueDate}
              onChange={(e) => setUpdatedTask({ ...updatedTask, dueDate: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="taskPriority" className="mt-3">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              value={updatedTask.priority}
              onChange={(e) => setUpdatedTask({ ...updatedTask, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="taskStatus" className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={updatedTask.status}
              onChange={(e) => setUpdatedTask({ ...updatedTask, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="taskTags" className="mt-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              value={updatedTask.tags.join(', ')}
              onChange={(e) => setUpdatedTask({ ...updatedTask, tags: e.target.value.split(',').map(tag => tag.trim()) })}
            />
          </Form.Group>
          <Form.Group controlId="taskCollaborators" className="mt-3">
            <Form.Label>Collaborators</Form.Label>
            <Form.Control
              type="text"
              value={updatedTask.collaborators.join(', ')}
              onChange={(e) => setUpdatedTask({ ...updatedTask, collaborators: e.target.value.split(',').map(collaborator => collaborator.trim()) })}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Update Task
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateTaskModal;

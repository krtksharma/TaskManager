// frontend/src/components/UpdateTaskModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const UpdateTaskModal = ({ showModal, setShowModal, selectedTask, handleUpdateTask, setSelectedTask }) => {
  const [task, setTask] = useState({ ...selectedTask });

  useEffect(() => {
    setTask({ ...selectedTask });
  }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) :
             name === 'collaborators' ? value.split(',').map(collab => collab.trim()) :
             value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateTask(task);
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={task.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={task.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="dueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={task.dueDate ? task.dueDate.substring(0, 10) : ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="priority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="tags">
            <Form.Label>Tags (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              name="tags"
              value={task.tags ? task.tags.join(', ') : ''}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              Enter tags separated by commas.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="collaborators">
            <Form.Label>Collaborators (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              name="collaborators"
              value={task.collaborators ? task.collaborators.join(', ') : ''}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              Enter email addresses of collaborators separated by commas.
            </Form.Text>
          </Form.Group>
          <Button type="submit" className="mt-3" variant="primary">Update Task</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateTaskModal;

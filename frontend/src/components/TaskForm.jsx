// frontend/src/components/TaskForm.jsx
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useUser } from '@clerk/clerk-react';

const TaskForm = ({ newTask, setNewTask, handleCreateTask }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) :
             name === 'collaborators' ? value.split(',').map(collab => collab.trim()) :
             value
    }));
  };

  const { user } = useUser();
  const { emailAddress } = user.emailAddresses[0];

  return (
    <Form onSubmit={handleCreateTask} className="mb-4">
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={newTask.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={newTask.description}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="dueDate">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="priority">
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          name="priority"
          value={newTask.priority}
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
          value={newTask.status}
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
          value={newTask.tags ? newTask.tags.join(', ') : ''}
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
          value={newTask.collaborators ? newTask.collaborators.join(', ') : ''}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          Enter email addresses of collaborators separated by commas.
        </Form.Text>
      </Form.Group>
      <Button type="submit" className="mt-3" variant="primary">Create Task</Button>
    </Form>
  );
};

export default TaskForm;

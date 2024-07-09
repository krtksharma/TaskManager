import React from 'react';
import { Form, Button } from 'react-bootstrap';

const TaskForm = ({ newTask, setNewTask, handleCreateTask }) => {
  return (
    <Form onSubmit={handleCreateTask} className="w-100">
      <Form.Group controlId="taskName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter task name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="taskDescription" className="mt-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter task description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="taskDueDate" className="mt-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="taskPriority" className="mt-3">
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
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
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
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
          placeholder="Enter tags separated by commas"
          value={newTask.tags.join(', ')}
          onChange={(e) => setNewTask({ ...newTask, tags: e.target.value.split(',').map(tag => tag.trim()) })}
        />
      </Form.Group>
      <Form.Group controlId="taskCollaborators" className="mt-3">
        <Form.Label>Collaborators</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter collaborators separated by commas"
          value={newTask.collaborators.join(', ')}
          onChange={(e) => setNewTask({ ...newTask, collaborators: e.target.value.split(',').map(collaborator => collaborator.trim()) })}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Create Task
      </Button>
    </Form>
  );
};

export default TaskForm;

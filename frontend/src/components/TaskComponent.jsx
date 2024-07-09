import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import socket from '../socket';
import { Alert, Spinner, Container, Form, Pagination, Row, Col } from 'react-bootstrap';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import UpdateTaskModal from './UpdateTaskModal';

const TaskComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '', dueDate: '', priority: 'medium', status: 'pending', tags: [] });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [dueDateFilter, setDueDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(2);

  useEffect(() => {
    fetchTasks();
    socket.on('taskCreated', (task) => {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, task];
        filterTasks(updatedTasks);
        return updatedTasks;
      });
      setSuccess('New task created.');
      clearMessages();
    });
    socket.on('taskUpdated', (task) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((t) => (t._id === task._id ? task : t));
        filterTasks(updatedTasks);
        return updatedTasks;
      });
      setSuccess('Task updated.');
      clearMessages();
    });
    socket.on('taskDeleted', (taskId) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((t) => t._id !== taskId);
        filterTasks(updatedTasks);
        return updatedTasks;
      });
      setSuccess('Task deleted.');
      clearMessages();
    });

    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };
  }, [searchQuery, statusFilter, priorityFilter, dueDateFilter]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const tasksData = await getTasks({
        search: searchQuery,
        status: statusFilter,
        priority: priorityFilter,
        dueDate: dueDateFilter,
      });
      setTasks(tasksData);
      filterTasks(tasksData); // Filter tasks and apply pagination
    } catch (err) {
      setError('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (event) => {
    event.preventDefault();
    if (!isValidDate(newTask.dueDate)) {
      setError('Due date must be today or in the future.');
      return;
    }
    try {
      await createTask(newTask);
      setNewTask({ name: '', description: '', dueDate: '', priority: 'medium', status: 'pending', tags: [] });
      setSuccess('Task created successfully.');
      setError(null);
      clearMessages();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task.');
      clearMessages();
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    if (!isValidDate(updatedTask.dueDate)) {
      setError('Due date must be today or in the future.');
      return;
    }
    try {
      await updateTask(updatedTask._id, updatedTask);
      setShowModal(false);
      setSuccess('Task updated successfully.');
      setError(null);
      clearMessages();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task.');
      clearMessages();
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setSuccess('Task deleted successfully.');
      clearMessages();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task.');
      clearMessages();
    }
  };

  const isValidDate = (dateString) => {
    if (!dateString) return true; // Empty date is allowed (optional)
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const clearMessages = () => {
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 5000); // 5000ms = 5 seconds
  };

  const filterTasks = (tasksToFilter = tasks) => {
    const query = searchQuery.toLowerCase();
    const filtered = tasksToFilter.filter((task) =>
      (task.name.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.tags.some(tag => tag.toLowerCase().includes(query))) &&
      (!statusFilter || task.status === statusFilter) &&
      (!priorityFilter || task.priority === priorityFilter) &&
      (!dueDateFilter || new Date(task.dueDate) <= new Date(dueDateFilter))
    );
    setFilteredTasks(filtered);
    setCurrentPage(1); // Reset to the first page on filter change
  };

  const paginateTasks = () => {
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    return filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageCount = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginatedTasks = paginateTasks();

  return (
    <Container className="d-flex flex-column h-100">
      <h1 className="mb-4 text-center">Task Management</h1>
      <Row className="mb-4">
        <Col md={8} className="d-flex flex-column align-items-start task-form-container">
          <TaskForm newTask={newTask} setNewTask={setNewTask} handleCreateTask={handleCreateTask} />
        </Col>
        <Col md={4} className="d-flex flex-column align-items-end">
          <Form.Group controlId="searchQuery" className="mb-3 w-100">
            <Form.Control
              type="text"
              placeholder="Search tasks by name, description, or tags"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={fetchTasks}  // Fetch tasks on search blur
            />
          </Form.Group>
          <div className="w-100">
            <h4>Filter Tasks</h4>
            <Form.Group controlId="statusFilter">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); fetchTasks(); }}>
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="priorityFilter" className="mt-3">
              <Form.Label>Priority</Form.Label>
              <Form.Control as="select" value={priorityFilter} onChange={(e) => { setPriorityFilter(e.target.value); fetchTasks(); }}>
                <option value="">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="dueDateFilter" className="mt-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={dueDateFilter}
                onChange={(e) => { setDueDateFilter(e.target.value); fetchTasks(); }}
              />
            </Form.Group>
          </div>
        </Col>
      </Row>
      {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
      {success && <Alert variant="success" className="mb-4">{success}</Alert>}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <div className="flex-grow-1 overflow-auto">
            <TaskList tasks={paginatedTasks} onEditTask={(task) => { setSelectedTask(task); setShowModal(true); }} onDeleteTask={handleDeleteTask} />
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} />
              {[...Array(pageCount)].map((_, index) => (
                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => currentPage < pageCount && handlePageChange(currentPage + 1)} />
            </Pagination>
          </div>
        </>
      )}
      {selectedTask && (
        <UpdateTaskModal
          show={showModal}
          task={selectedTask}
          onHide={() => setShowModal(false)}
          onUpdateTask={handleUpdateTask}
        />
      )}
    </Container>
  );
};

export default TaskComponent;

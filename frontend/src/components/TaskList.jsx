// frontend/src/components/TaskList.jsx
import React from 'react';
import TaskListItem from './TaskListItem';
import { ListGroup } from 'react-bootstrap';

const TaskList = ({ tasks, handleDeleteTask, setSelectedTask, setShowModal }) => {
  return (
    <ListGroup className="overflow-auto task-list">
      {tasks.map((task) => (
        <TaskListItem
          key={task._id}
          task={task}
          handleDeleteTask={handleDeleteTask}
          setSelectedTask={setSelectedTask}
          setShowModal={setShowModal}
        />
      ))}
    </ListGroup>
  );
};

export default TaskList;

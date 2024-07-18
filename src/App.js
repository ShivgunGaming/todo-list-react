import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import SearchFilter from './components/SearchFilter';
import { Container, Box, Typography, IconButton, Snackbar, Alert, LinearProgress } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useThemeContext } from './components/ThemeContext';
import './App.css';

const StyledIconButton = styled(IconButton)({
  '&:hover': {
    color: '#424242', // Darker shade of gray
  },
  '&:active': {
    color: '#212121', // Even darker shade of gray
  },
});

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const theme = useTheme();
  const { toggleColorMode } = useThemeContext();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setSnackbar({ open: true, message: 'Task added successfully!', severity: 'success' });
  };

  const updateTask = (newTask) => {
    setTasks(
      tasks.map((task, index) =>
        index === editTask.index ? { ...task, ...newTask } : task
      )
    );
    setEditTask(null);
    setSnackbar({ open: true, message: 'Task updated successfully!', severity: 'success' });
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setSnackbar({ open: true, message: 'Task deleted successfully!', severity: 'error' });
  };

  const filteredTasks = tasks
    .filter((task) => {
      return (
        (filterPriority === 'all' || task.priority === filterPriority) &&
        task.text.toLowerCase().includes(searchText.toLowerCase())
      );
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h3" component="h1">
          To-Do List
        </Typography>
        <StyledIconButton onClick={toggleColorMode}>
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </StyledIconButton>
      </Box>
      <Box mb={4} p={2} boxShadow={2} borderRadius={2} bgcolor="background.paper">
        <Typography variant="h5" component="h2" gutterBottom>
          Add a new task
        </Typography>
        <TaskForm addTask={addTask} updateTask={updateTask} editTask={editTask} />
      </Box>
      <Box mb={4} p={2} boxShadow={2} borderRadius={2} bgcolor="background.paper">
        <Typography variant="h5" component="h2" gutterBottom>
          Search & Filter
        </Typography>
        <SearchFilter
          setSearchText={setSearchText}
          setFilterPriority={setFilterPriority}
        />
      </Box>
      <Box mb={4} p={2} boxShadow={2} borderRadius={2} bgcolor="background.paper">
        <Typography variant="h5" component="h2" gutterBottom>
          Progress
        </Typography>
        <LinearProgress variant="determinate" value={completionRate} />
        <Typography variant="body1" align="center">{`Completed ${completedTasks} out of ${totalTasks} tasks`}</Typography>
      </Box>
      <Box>
        <TaskList
          tasks={filteredTasks}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
          setEditTask={setEditTask}
          setTasks={setTasks}
        />
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default App;

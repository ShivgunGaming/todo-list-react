import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Box, Grid } from '@mui/material';

const TaskForm = ({ addTask, updateTask, editTask }) => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editTask) {
      setTask(editTask.text);
      setPriority(editTask.priority);
      setDueDate(editTask.dueDate);
    } else {
      setTask('');
      setPriority('medium');
      setDueDate('');
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      const newTask = { text: task, priority, dueDate, id: Date.now() };
      if (editTask) {
        updateTask(newTask);
      } else {
        addTask(newTask);
      }
      setTask('');
      setPriority('medium');
      setDueDate('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Add a new task"
            variant="outlined"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {editTask ? 'Update Task' : 'Add Task'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskForm;

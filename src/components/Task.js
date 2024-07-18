import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box, Typography } from '@mui/material';
import { CheckCircle, Edit, Delete, PriorityHigh, Event, Warning } from '@mui/icons-material';
import { styled } from '@mui/system';
import { formatDistanceToNow, parseISO } from 'date-fns';

const StyledIconButton = styled(IconButton)({
  '&:hover': {
    color: '#424242',
  },
  '&:active': {
    color: '#212121',
  },
});

const Task = ({ task, index, toggleTaskCompletion, deleteTask, setEditTask }) => {
  const dueDate = parseISO(task.dueDate);
  const isOverdue = new Date() > dueDate;
  const isDueSoon = !isOverdue && formatDistanceToNow(dueDate) <= '3 days';

  return (
    <ListItem
      sx={{
        bgcolor: task.completed ? 'success.light' : 'background.paper',
        textDecoration: task.completed ? 'line-through' : 'none',
      }}
      button
      onClick={() => toggleTaskCompletion(index)}
    >
      <ListItemText
        primary={
          <Box display="flex" alignItems="center">
            {task.priority === 'high' && <PriorityHigh sx={{ color: 'error.main', mr: 1 }} />}
            <Typography>{task.text}</Typography>
            {isOverdue && <Warning sx={{ color: 'error.main', ml: 1 }} />}
            {isDueSoon && !isOverdue && <Warning sx={{ color: 'warning.main', ml: 1 }} />}
          </Box>
        }
        secondary={
          <Box display="flex" alignItems="center">
            <Event sx={{ mr: 1 }} />
            <Typography>{task.dueDate}</Typography>
          </Box>
        }
      />
      <ListItemSecondaryAction>
        <StyledIconButton edge="end" aria-label="edit" onClick={() => setEditTask({ text: task.text, priority: task.priority, dueDate: task.dueDate, index })}>
          <Edit />
        </StyledIconButton>
        <StyledIconButton edge="end" aria-label="delete" onClick={() => deleteTask(index)}>
          <Delete />
        </StyledIconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Task;

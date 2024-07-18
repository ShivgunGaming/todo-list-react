import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box, Typography } from '@mui/material';
import { CheckCircle, Edit, Delete, PriorityHigh, Event } from '@mui/icons-material';
import { styled } from '@mui/system';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const StyledIconButton = styled(IconButton)({
  '&:hover': {
    color: '#424242',
  },
  '&:active': {
    color: '#212121',
  },
});

const TaskList = ({ tasks = [], toggleTaskCompletion, deleteTask, setEditTask, setTasks }) => {
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  const renderTasks = (tasks) => (
    tasks.map((task, index) => (
      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
        {(provided) => (
          <ListItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
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
        )}
      </Draggable>
    ))
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <List {...provided.droppableProps} ref={provided.innerRef}>
            {renderTasks(tasks)}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;

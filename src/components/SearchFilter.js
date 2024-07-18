import React from 'react';
import { TextField, MenuItem, Box } from '@mui/material';

const SearchFilter = ({ setSearchText, setFilterPriority }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Search tasks..."
        variant="outlined"
        onChange={(e) => setSearchText(e.target.value)}
        fullWidth
      />
      <TextField
        select
        label="Priority"
        onChange={(e) => setFilterPriority(e.target.value)}
        variant="outlined"
        fullWidth
      >
        <MenuItem value="all">All Priorities</MenuItem>
        <MenuItem value="high">High</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="low">Low</MenuItem>
      </TextField>
    </Box>
  );
};

export default SearchFilter;

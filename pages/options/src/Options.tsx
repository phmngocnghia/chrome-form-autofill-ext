import React, { useState } from 'react';
import '@src/Options.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { Drawer, List, ListItem, ListItemButton, CssBaseline, Box } from '@mui/material';
import { HashRouter, Routes, Route, NavLink } from 'react-router';

import { type GridRowsProp, type GridColDef, DataGrid } from '@mui/x-data-grid';

const initialRows: GridRowsProp = [
  { id: 1, fieldName: 'Hello', fieldExpr: 'World', fieldValue: 'Demo' },
  { id: 2, fieldName: 'DataGridPro', fieldExpr: 'is Awesome' },
  { id: 3, fieldName: 'MUI', fieldExpr: 'is Amazing' },
];

const initialColumns: GridColDef[] = [
  { field: 'fieldName', headerName: 'Rule Name', editable: true, flex: 1 },
  { field: 'fieldExpr', headerName: 'Field Expression', editable: true, flex: 1 },
  { field: 'fieldValue', headerName: 'Field Value', editable: true, flex: 1 },
];

const drawerWidth = 150;

function App() {
  const [rows, setRows] = useState<GridRowsProp>(initialRows);

  const handleDeleteRow = (id: number) => {
    setRows(prevRows => prevRows.filter(row => row.id !== id));
  };

  const columns: GridColDef[] = [
    ...initialColumns,
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => <button onClick={() => handleDeleteRow(params.row.id)}>Delete</button>,
    },
  ];

  return (
    <div className="flex">
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        open
        anchor="left">
        <List>
          {['Rules', 'Presents'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                {/* <ListItemText primary={text} /> */}
                {/* <NavLink to={index === 0 ? '/' : '/rules'}>{text}</NavLink> */}
                {text}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ p: 4, width: `calc(100% - ${drawerWidth}px)` }}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
      {/* <Routes>
          <Route path='/' element={<DataGrid rows={rows} columns={columns} />} />
          <Route path='/rules' element={<DataGrid rows={rows} columns={columns} />} />
        </Routes> */}
    </div>
  );
}
export default withErrorBoundary(withSuspense(App, <div> Loading ... </div>), <div> Error Occur </div>);

import React from 'react';
import '@src/Options.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { Drawer, List, ListItem, ListItemButton, CssBaseline, Box } from '@mui/material';
import { Presents } from './pages/presents';
import { MemoryRouter, Link, Route, Routes } from 'react-router';
import { Rules } from './pages/rules';

const drawerWidth = 150;

function App() {
  return (
    <MemoryRouter>
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
            {['Rules', 'Presents'].map((text, index) => {
              console.log(`/${text.toLowerCase()}`);

              return (
                <ListItem key={text} disablePadding>
                  <Link className="w-full" to={`/${text.toLowerCase()}`}>
                    <ListItemButton>{text}</ListItemButton>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Drawer>
        <Box sx={{ p: 4, width: `calc(100% - ${drawerWidth}px)` }} className="flex flex-col">
          {/* <Routes>

            <Route path="/presents" element={<Presents />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/" element={<Rules />} />
          </Routes> */}
          <Rules />
          <Presents />
        </Box>
      </div>
    </MemoryRouter>
  );
}
export default withErrorBoundary(withSuspense(App, <div> Loading ... </div>), <div> Error Occur </div>);

import React, { useEffect, useState } from 'react';
import '@src/Options.css';
import { Drawer, List, ListItem, ListItemButton, CssBaseline, Box } from '@mui/material';
import { Presents } from './pages/presents';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { MemoryRouter, Link, Route, Routes, useLocation } from 'react-router';
import { Rules } from './pages/rules';

const drawerWidth = 150;


interface ListItemButtonProps {
  text: string;
  url: string;
}

const LinkItemButton: React.FC<ListItemButtonProps> = ({ text, url }) => {
  const location = useLocation();
  const isActive = location.pathname === url;

  return (
    <Link className="w-full" to={url} >
      <ListItemButton selected={isActive}>
        {text}
      </ListItemButton>
    </Link>
  );
};


const SetupComponent = () => {
  const location = useLocation()

  React.useEffect(() => {
    chrome.storage.sync.set({ lastRoute: location.pathname });
  }, [location]);

  return null
}


function App() {
  const [initialRoute, setInitialRoute] = useState(null);




  useEffect(() => {
    chrome.storage.sync.get("lastRoute", (data) => {

      setInitialRoute(data.lastRoute || "/"); // Default to "/"
    });
  }, []);

  if (initialRoute === null) { return null }



  return (
    <MemoryRouter initialEntries={[initialRoute]} >
      <div className="flex">
        <SetupComponent />
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
          <List >
            {['Rules', 'Presents'].map((text, index) => {
              console.log(`/${text.toLowerCase()}`);

              return (
                <ListItem key={text} disablePadding >
                  <LinkItemButton url={`/${text.toLowerCase()}`} text={text} />
                </ListItem>
              );
            })}
          </List>
        </Drawer>
        <Box sx={{ p: 4, width: `calc(100% - ${drawerWidth}px)` }} className="flex flex-col">
          <Routes>
            <Route path="/presents" element={<Presents />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/" element={<Rules />} />
          </Routes>
        </Box>
      </div>
    </MemoryRouter>
  );
}
export default withErrorBoundary(withSuspense(App, <div> Loading ... </div>), <div> Error Occur </div>);
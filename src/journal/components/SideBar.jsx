/* eslint-disable react/prop-types */

import { TurnedInNot } from '@mui/icons-material';
import { Drawer, Box, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from '@mui/material';

export const SideBar = ( { drawerWidth } ) => {
  console.log( drawerWidth );

  return (
    <Box
        component="nav"
        sx={ { width: { sm: drawerWidth }, flexShrink: { sm: 0 } } }
    >

    <Drawer
      variant='permanent'
      open
      sx={ { display: { xs: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } } }
    >
    <Toolbar>
      <Typography variant='h6' noWrap component="div">Diego Patiño</Typography>
    </Toolbar>
    <Divider/>

    <List>
      {
        [ 'January', 'Febreuary', 'March', 'April', 'May' ].map( text => (
          <ListItem disablePadding key={ text }>
            <ListItemButton>
              <ListItemIcon>
                <TurnedInNot/>
              </ListItemIcon>
              <Grid container>
                <ListItemText primary={ text }/>
                <ListItemText secondary={ 'Lorem insert magical words' }/>
              </Grid>
            </ListItemButton>
          </ListItem>
        ) )
      }
    </List>

    </Drawer>

    </Box>
  );
};

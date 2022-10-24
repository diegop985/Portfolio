/* eslint-disable react/prop-types */

import { ArrowBackIos } from '@mui/icons-material';
import { Drawer, Box, Toolbar, Typography, Divider, List, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setClosed } from '../../store/sidebar/sideBarSlice';
import { SideBarItem } from './SideBarItem';

export const SideBar = ( { drawerWidth } ) => {
  const { displayName } = useSelector( state => state.auth );
  const { isOpen } = useSelector( state => state.sideBar );
  const dispatch = useDispatch();

  const { notes } = useSelector( state => state.journal );

  const closeSideBar = () => {
    dispatch( setClosed() );
  };

  return (
    <Box
        component="nav"
        sx={ { width: { sm: drawerWidth }, flexShrink: { sm: 0 } } }

    >

      <Drawer
        variant='permanent'
        open
        sx={ { display: { xs: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, display: { xs: isOpen === true ? 'block' : 'none', sm: 'block' } } } }
      >
      <Toolbar >
        <Typography variant='h6' noWrap component="div">{ displayName }</Typography>
        <Button sx={ { ml: 2 } } onClick={ closeSideBar }>
          <ArrowBackIos />
        </Button>
      </Toolbar>
      <Divider/>

      <List>
        {
          notes.map( note => (
            <SideBarItem key={ note.id } { ...note } />
          ) )
        }
      </List>

      </Drawer>

    </Box>
  );
};

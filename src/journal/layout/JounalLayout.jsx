/* eslint-disable react/prop-types */
import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { NavBar, SideBar } from '../components';

const drawerWidth = 240;

export const JounalLayout = ( { children } ) => {
  return (

    <Box sx={ { display: 'flex' } } className="animate__animated animate__fadeIn animate__faster">

      <NavBar drawerWidth={ drawerWidth }/>

      <SideBar xs={ { display: 'none' } } drawerWidth={ drawerWidth }/>

      <Box
          component="main"
          sx={ { flexGrow: 1, p: 3 } }
      >

      <Toolbar/>

      { children }

      </Box>
    </Box>

  );
};

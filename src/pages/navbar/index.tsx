// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import { Box, Button, Toolbar, AppBar, Typography, Link, IconButton } from '@mui/material';
// import { FaHome, FaSearch } from 'react-icons/fa';
// import { FiPackage } from 'react-icons/fi';
// import { FaPaperPlane } from 'react-icons/fa';


// const Navbar = () => {
//   const navigate = useNavigate();

//   const handleNavigation = (path: string) => {
//     navigate(path);
//   };

//   return (
//     <AppBar position="static" color="primary">
//       <Toolbar>

//         <Button component={RouterLink} to="/homepage" color="inherit">
//           <IconButton color="inherit">
//             <FaPaperPlane />
//           </IconButton>
//           <Typography variant="h6" component="span" sx={{ ml: 2, textDecoration: 'none', color: 'inherit' }}>
//             Delivery App
//           </Typography>
//         </Button>
//         {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           Delivery App
//         </Typography> */}

//         <Box>
//           <Button
//             component={RouterLink}
//             to="/homepage"
//             variant="contained"
//             color="primary"
//             size="large"
//             sx={{ ml: 2 }}
//             onClick={() => handleNavigation('/homepage')}
//           >
//             <FaHome size={18} style={{ marginRight: '5px' }} />
//             Home
//           </Button>
//           <Button
//             component={RouterLink}
//             to="/"
//             variant="contained"
//             color="primary"
//             size="large"
//             sx={{ ml: 2 }}
//             onClick={() => handleNavigation('/')}
//           >
//             <FiPackage size={18} style={{ marginRight: '5px' }} />
//             Create a Shipment
//           </Button>
//           <Button
//             component={RouterLink}
//             to="/track"
//             variant="contained"
//             color="primary"
//             size="large"
//             sx={{ ml: 2 }}
//             onClick={() => handleNavigation('/track')}
//           >
//             <FaSearch size={18} style={{ marginRight: '5px' }} />
//             Track your Shipment
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Toolbar, AppBar, Typography, Link, IconButton } from '@mui/material';
import { FaHome, FaSearch } from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import { FaPaperPlane } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button component={RouterLink} to="/homepage" color="inherit">
            <IconButton color="inherit">
              <FaPaperPlane />
            </IconButton>
            <Typography variant="h6" component="span" sx={{ ml: 2, textDecoration: 'none', color: 'inherit' }}>
              Delivery App
            </Typography>
          </Button>
        </Box>
        
        <Box>
          <Button
            component={RouterLink}
            to="/homepage"
            variant="contained"
            color="primary"
            size="large"
            sx={{ ml: 2 }}
            onClick={() => handleNavigation('/homepage')}
          >
            <FaHome size={18} style={{ marginRight: '5px' }} />
            Home
          </Button>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            size="large"
            sx={{ ml: 2 }}
            onClick={() => handleNavigation('/')}
          >
            <FiPackage size={18} style={{ marginRight: '5px' }} />
            Create a Shipment
          </Button>
          <Button
            component={RouterLink}
            to="/track"
            variant="contained"
            color="primary"
            size="large"
            sx={{ ml: 2 }}
            onClick={() => handleNavigation('/track')}
          >
            <FaSearch size={18} style={{ marginRight: '5px' }} />
            Track your Shipment
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

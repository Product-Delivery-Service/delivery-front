import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Toolbar, AppBar, Typography, IconButton } from '@mui/material';
import { FaHome, FaSearch } from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import { FaPaperPlane } from 'react-icons/fa';
import { AiFillPrinter } from 'react-icons/ai';
import { IoIosContacts } from 'react-icons/io';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button component={RouterLink} to="/" color="inherit">
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
            to="/print"
            variant="contained"
            color="primary"
            size="large"
            sx={{ ml: 2 }}
            onClick={() => handleNavigation('/print')}
          >
            <AiFillPrinter size={18} style={{ marginRight: '5px' }} />
            Print Label
          </Button>
          <Button
            component={RouterLink}
            to="/createshipment"
            variant="contained"
            color="primary"
            size="large"
            sx={{ ml: 2 }}
            onClick={() => handleNavigation('/createshipment')}
          >
            <FiPackage size={18} style={{ marginRight: '5px' }} />
            Create a Shipment
          </Button>
          <Button
            component={RouterLink}
            to="/trackshipment"
            variant="contained"
            color="primary"
            size="large"
            sx={{ ml: 2 }}
            onClick={() => handleNavigation('/trackshipment')}
          >
            <FaSearch size={18} style={{ marginRight: '5px' }} />
            Track your Shipment
          </Button>
          <Button
            component={RouterLink}
            to="/contact"
            variant="contained"
            color="primary"
            size="large"
            sx={{ ml: 2 }}
            onClick={() => handleNavigation('/contact')}
          >
            <IoIosContacts size={18} style={{ marginRight: '5px' }} />
            Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

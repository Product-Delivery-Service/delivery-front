import React, { useState, } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import axios from "axios"
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { FaPaperPlane } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { BsEnvelope, BsBoxSeam } from 'react-icons/bs';
import toast from 'react-hot-toast';



interface Message {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  trackingCode: string;
  message: string;
}

interface Shipment {
  id: number;
  shipmentDate: string;
  shipmentName: string;
  shipmentService: string;
  trackingCode: string;
  shipmentState: string;
}


const Dashboard: React.FC = () => {
  const API = axios.create({ baseURL: process.env.REACT_APP_MY_API });

  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    // For example, clear user session, navigate to the login page, etc.
    navigate('/admin');
  };

  const [currentButton, setCurrentButton] = useState<string>('Shipments');
  const [tableData, setTableData] = useState<Array<Message | Shipment>>([]);


  const handleButtonClick = (buttonName: string) => {
    console.log(buttonName)
    setCurrentButton(buttonName);
    if (buttonName === 'Messages') {

      getMessages()

    } else if (buttonName === 'Shipments') {
      getShipments()
    }
  };

  const handleStateChange = (shipmentId: number, newState: string) => {
    console.log(newState)
    const updatedTableData = tableData.map((item: Message | Shipment) => {
      if ('shipmentState' in item && item.id === shipmentId) {
        return { ...item, shipmentState: newState } as Shipment;
      }
      return item;
    });
    console.log(updatedTableData)
    setTableData(updatedTableData);
  };
  
  const handleEditSubmit = async (shipmentId: number) => {
    // Send the updated shipment object to the backend
    const updatedShipment = tableData.find((item: Message | Shipment) => {
      return 'shipmentState' in item && item.id === shipmentId;
    }) as Shipment | undefined;
  
    if (updatedShipment) {
      // Make API call to update the shipment with the updatedShipment object
      try {
        const response = await API.post("/command/update", {shipmentState: updatedShipment.shipmentState, id: shipmentId});
          console.log("res", response);
          toast.success('Shipment Updated');
        } catch (error: any) {
          console.log("err", error);
          toast.error('An Error occurred.');
        }
    }
  };

  const getShipments = async () =>{
    console.log("shipment")
    try {
      const response = await API.get("/command", {withCredentials: true});
        console.log("res", response);
        setTableData(response.data.data);
      } catch (error: any) {
        console.log("err", error);
      }
  }

  const getMessages = async () =>{
    try {
      const response = await API.get("/message", {withCredentials: true});
        console.log("res", response);
        setTableData(response.data.data);
      } catch (error: any) {
        console.log("err", error);
      }
  }

  // useEffect(() => {
  //   getShipments()
  // }, [[getShipments]]);

  const renderTable = () => {
    if (currentButton === 'Messages') {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Tracking Code</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(tableData as Message[]).map((message: Message) => (
              <TableRow key={message.id}>
                <TableCell>{message.id}</TableCell>
                <TableCell>{message.fullName}</TableCell>
                <TableCell>{message.phoneNumber}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell>{message.trackingCode}</TableCell>
                <TableCell>{message.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    } else if (currentButton === 'Shipments') {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Tracking Code</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Submit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(tableData as Shipment[]).map((shipment: Shipment) => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.id}</TableCell>
                <TableCell>{shipment.shipmentDate?.toString()?.substring(0,10) + "  " + shipment.shipmentDate?.toString()?.substring(11,16)}</TableCell>
                <TableCell>{shipment.shipmentName}</TableCell>
                <TableCell > 
                  <span
                    style={{
                      backgroundColor:
                        shipment.shipmentService === 'Standard Shipping'
                          ? 'red'
                          : shipment.shipmentService === 'Express Shipping'
                          ? 'yellow'
                          : shipment.shipmentService === 'Overnight Priority'
                          ? 'green'
                          : 'inherit',
                      borderRadius: '0.2rem',
                      color: '#fff',
                      padding: '0.25rem',
                    }}>
                    {shipment.shipmentService} 
                  </span>
                </TableCell>
                <TableCell>{shipment.trackingCode}</TableCell>
                <TableCell>{shipment.shipmentState}</TableCell>
                <TableCell>
                  <select
                    value={shipment.shipmentState}
                    onChange={(e) => handleStateChange(shipment.id, e.target.value)}
                  >
                    <option value="Shipment Created">Shipment Created</option>
                    <option value="In Transit">In Transit</option>
                    <option value="At Company’s Facility">At Company's Facility</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditSubmit(shipment.id)}
                  >
                    Submit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-container">
        <AppBar position="static">
          <Toolbar>
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
            <Box flexGrow={1}></Box>
              <Button color="inherit" onClick={handleLogout}>
                <IconButton color="inherit">
                  <BiLogOut />
                </IconButton>
                <Typography variant="h6" component="span" sx={{ ml: 2, textDecoration: 'none', color: 'inherit' }}>
                  Logout
                </Typography>
              </Button>
          </Toolbar>
        </AppBar>
    <br />

        
        <div className="button-container">
          <Button variant="contained" color="primary" onClick={() => handleButtonClick('Shipments')}>
            <span style={{ marginRight: '8px' }}>
              <BsBoxSeam/>
            </span>
            Shipments
          </Button>

          <Button variant="contained" color="primary" onClick={() => handleButtonClick('Messages')}>
            <span style={{ marginRight: '8px' }}>
              <BsEnvelope />
            </span>
            Messages
          </Button>
        </div>
        <div className="table-container">
          {renderTable()}
        </div>
      </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { AiOutlineHome } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

interface Message {
  id: number;
  fullName: string;
  phoneNumber: string;
  trackingCode: string;
  message: string;
}

interface Shipment {
  id: number;
  date: string;
  name: string;
  service: string;
  trackingCode: string;
  state: string;
}

const messagesData: Message[] = [
  {
    id: 1,
    fullName: "John Doe",
    phoneNumber: "1234567890",
    trackingCode: "ABC123",
    message: "Hello, I have a question.",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    phoneNumber: "9876543210",
    trackingCode: "DEF456",
    message: "Need assistance with my order.",
  },
];

const shipmentsData: Shipment[] = [
  {
    id: 1,
    date: "2023-06-01",
    name: "Product A",
    service: "Standard Shipping",
    trackingCode: "SHIP123",
    state: "Shipment Created",
  },
  {
    id: 2,
    date: "2023-05-30",
    name: "Product B",
    service: "Express Shipping",
    trackingCode: "SHIP456",
    state: "Out for Delivery",
  },
];


const Dashboard: React.FC = () => {

  const navigate = useNavigate();

  const handleGoBack: () => void = () => {
    navigate('/');
  };
  
  // const handleGoBack = () => {
  //   navigate('/');
  // };

  const [currentButton, setCurrentButton] = useState<string>('');
  const [tableData, setTableData] = useState<Array<Message | Shipment>>([]);


  const handleButtonClick = (buttonName: string) => {
    setCurrentButton(buttonName);
    // Set the static data based on the button clicked
    if (buttonName === 'Messages') {
      setTableData(messagesData);
    } else if (buttonName === 'Shipments') {
      setTableData(shipmentsData);
    }
  };

  const handleStateChange = (shipmentId: number, newState: string) => {
    // Update the state of the selected shipment in the tableData state
    const updatedTableData = tableData.map((item: Message | Shipment) => {
      if ('state' in item && item.id === shipmentId) {
        return { ...item, state: newState } as Shipment;
      }
      return item;
    });
    setTableData(updatedTableData);
  };
  
  const handleEditSubmit = (shipmentId: number) => {
    // Send the updated shipment object to the backend
    const updatedShipment = tableData.find((item: Message | Shipment) => {
      return 'state' in item && item.id === shipmentId;
    }) as Shipment | undefined;
  
    if (updatedShipment) {
      // Make API call to update the shipment with the updatedShipment object
    }
  };
  

  const renderTable = () => {
    if (currentButton === 'Messages') {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Phone Number</TableCell>
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
                <TableCell>{shipment.date}</TableCell>
                <TableCell>{shipment.name}</TableCell>
                <TableCell>{shipment.service}</TableCell>
                <TableCell>{shipment.trackingCode}</TableCell>
                <TableCell>{shipment.state}</TableCell>
                <TableCell>
                  <select
                    value={shipment.state}
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

  // return (
  //   <div className="dashboard-container">
  //     <div className="button-container">
  //       <Button variant="contained" color="primary" onClick={() => handleButtonClick('Messages')}>
  //         Messages
  //       </Button>
  //       <Button variant="contained" color="primary" onClick={() => handleButtonClick('Shipments')}>
  //         Shipments
  //       </Button>
  //     </div>
  //     {renderTable()}
  //   </div>
  // );
  return (
    <div className="dashboard-container">
        <div className='home-container'>
          <Button variant="outlined" color="primary" onClick={handleGoBack} className="home-button">
          <AiOutlineHome />
            Back to Home
          </Button>
        </div>
        <div className="button-container">
          <Button variant="contained" color="primary" onClick={() => handleButtonClick('Messages')}>
            Messages
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleButtonClick('Shipments')}>
            Shipments
          </Button>
        </div>
        <div className="table-container">
          {renderTable()}
        </div>
      </div>
  );
};

export default Dashboard;

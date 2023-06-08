import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { AiOutlineHome } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import axios from "axios"

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

  const handleGoBack: () => void = () => {
    navigate('/');
  };

  const [currentButton, setCurrentButton] = useState<string>('Shipments');
  const [tableData, setTableData] = useState<Array<Message | Shipment>>([]);


  const handleButtonClick = (buttonName: string) => {
    console.log(buttonName)
    setCurrentButton(buttonName);
    // Set the static data based on the button clicked
    if (buttonName === 'Messages') {
      // setTableData(messagesData);
      getMessages()

    } else if (buttonName === 'Shipments') {
      // setTableData(shipmentsData);
      getShipments()
    }
  };

  const handleStateChange = (shipmentId: number, newState: string) => {
    console.log(newState)
    // Update the state of the selected shipment in the tableData state
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
        } catch (error: any) {
          console.log("err", error);
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

  useEffect(() => {
    getShipments()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Button variant="contained" color="primary" onClick={() => handleButtonClick('Shipments')}>
            Shipments
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleButtonClick('Messages')}>
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

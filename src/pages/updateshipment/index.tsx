import React, { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './UpdateShipment.css';

interface Shipment {
  id: number;
  code: string;
  status: string;
}

const UpdateShipment: React.FC = () => {
  const [shipmentCode, setShipmentCode] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const navigate = useNavigate();

  const fetchShipment = async () => {
    // Simulating a request delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Static data for testing purposes
    const staticData: Shipment = {
      id: 1,
      code: 'ABC123',
      status: 'In Transit',
    };

    setShipment(staticData);
  };

  const updateStatus = async () => {
    // Simulating a request delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Static data for testing purposes
    const updatedShipment: Shipment = {
      id: shipment?.id || 0,
      code: shipment?.code || '',
      status: selectedStatus,
    };

    setShipment(updatedShipment);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <button className="home-button" onClick={handleGoBack}>
        <AiOutlineHome />
        Back to Home
      </button>

      <h1 className="title">Update Shipment</h1>
      <label className="label">
        Shipment Code:
        <input type="text" value={shipmentCode} onChange={(e) => setShipmentCode(e.target.value)} />
      </label>
      <button className="submit-button" onClick={fetchShipment}>Submit</button>

      {shipment && (
        <div className="shipment-details">
          <h2 className="section-title">Shipment Details</h2>
          <p>Code: {shipment.code}</p>
          <p>Status: {shipment.status}</p>

          <h2 className="section-title">Update Status</h2>
          <select className="status-select" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="">Select Status</option>
            <option value="Shipment Lost">Shipment Lost</option>
            <option value="Shipment Delivered">Shipment Delivered</option>
            {/* Add more options as needed */}
          </select>
          <button className="update-button" onClick={updateStatus}>Update</button>
        </div>
      )}
    </div>
  );
};

export default UpdateShipment;


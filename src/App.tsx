import React, {useState} from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import { Home } from "./pages/home";
import { Admin } from "./pages/admin";
import { Contact } from "./pages/contact";
import  Dashboard  from "./pages/dashboard";
import { NotFound } from "./pages/notfound"
import UpdateShipment from './pages/updateshipment';
import TrackShipment from './pages/trackshipment';
import Track from './pages/track';



function App() {
  const [user, setUser] = useState<any>(null);

  return (
          <Routes>
              <Route path="/" element={<Home />} />
              <Route
                  path="/contact"
                  element={<Contact />}
              />
              <Route
                  path="/trackshipment"
                  element={<TrackShipment />}
              />
              <Route
                  path="/track"
                  element={<Track />}
              />
              <Route
                  path="/dashboard"
                  element={<Dashboard />}
              />
              {/* <Route
                  path="/dashboard"
                  element={user ? <Dashboard /> : <Navigate to="../admin" />}
              /> */}
              <Route
                  path="/admin"
                  element={user ? <Navigate to="../" /> : <Admin />}
              />
              <Route
                  path="/updateshipment"
                  element={user ? <Navigate to="../" /> : < UpdateShipment/>}
              />
              <Route path="*" element={<NotFound />} />
          </Routes>
  );
}

export default App;

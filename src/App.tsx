import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Admin from "./pages/admin"
import  Dashboard  from "./pages/dashboard";
import NotFound  from "./pages/notfound"
import Contact from "./pages/contact"
import ShipmentDetails from "./pages/ShipmentDetails"

import UpdateShipment from './pages/updateshipment';
import TrackShipment from './pages/trackshipment';
import Track from './pages/track';



function App() {
    // const [user, setUser] = useState<any>(null);

    // const API = axios.create({ baseURL: process.env.REACT_APP_MY_API });

    // useEffect(() => {
    //     const getUser = async () => {
    //         try {
    //             const response = await API.get("/auth/user", {
    //                 withCredentials: true,
    //             });
    //             console.log("res", response);
    //             setUser(response);
    //         } catch (error: any) {
    //             setUser(null);
    //             console.log("err", error);
    //         }
    //     };
    //     getUser();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

  return (
          <Routes>
              <Route path="/" element={<ShipmentDetails/>} />

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
              <Route
                  path="/admin"
                  element={<Admin />}
              />
              <Route
                  path="/updateshipment"
                  element={< UpdateShipment/>}
              />
              <Route path="*" element={<NotFound />} />
          </Routes>
  );
}

export default App;

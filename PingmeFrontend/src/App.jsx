import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, Card, Button } from "./Components";
import { Features, Hero, Footer } from "./Sections";
import BackgroundImage from "./assets/Background-image.png";

// Pages
import Overview from "./Pages/Overview";
import MyContracts from "./Pages/MyContracts";
import Notifications from "./Pages/Notification";
import ActivityHistory from "./Pages/ActivityHistory";
import Settings from "./Pages/Settings";

function App() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Routes>
        {/* Home / Landing Page */}
        <Route
          path="/"
          element={
            <>
              <div
                className="relative w-full h-[806px] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${BackgroundImage})`,
                  aspectRatio: "134 / 75",
                }}
              >
                <Navbar />
              </div>

              {/* Hero overlaps background */}
              <div className="relative -mt-40 z-10">
                <Hero />
              </div>

              <Card />
              <Button />
              <Features />
              <Footer />
            </>
          }
        />

        {/* Dashboard Pages */}
        <Route path="/overview" element={<Overview />} />
        <Route path="/my-contracts" element={<MyContracts />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/activityhistory" element={<ActivityHistory />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;

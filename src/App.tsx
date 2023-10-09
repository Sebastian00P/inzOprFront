import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import { AuthContext } from './components/utils/AuthContext';
import User from './domain/model/User';
import AdsList from './components/Ads/AdsList';
import AdDetails from './components/Ads/AdDetails';
import UserCache from './domain/data/cache/UsersCache';
import UserAdsList from './components/Ads/UserAdsList';
import CreateAd from './components/Ads/CreateAd';

const App: React.FC = () => {
  const [user, setUser] = useState<User>(UserCache.getInstance().getCurrentUser())

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<AdsList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/ad/:id' element={<AdDetails />} />
            <Route path='/myBooks' element={<UserAdsList />} />
            <Route path='/createAd' element={<CreateAd />} />
          </Routes>
        </>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

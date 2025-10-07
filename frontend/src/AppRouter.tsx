import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { DogDetail } from './pages/DogDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Chat } from './pages/Chat';
import { Community } from './pages/Community';
import { AdoptionApplication } from './pages/AdoptionApplication';
import { Profile } from './pages/Profile';
import { PublishDog } from './pages/PublishDog';
import { Donation } from './pages/Donation';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
export function AppRouter() {
  return <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="dogs/:id" element={<DogDetail />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="chat" element={<Chat />} />
              <Route path="community" element={<Community />} />
              <Route path="adopt/:id" element={<AdoptionApplication />} />
              <Route path="profile" element={<Profile />} />
              <Route path="publish-dog" element={<PublishDog />} />
              <Route path="donation" element={<Donation />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>;
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Activities from './pages/Activities';
import ActivityDetail from './pages/ActivityDetail';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import ActivitiesList from './pages/admin/ActivitiesList';
import ActivityForm from './pages/admin/ActivityForm';
import RegistrationsList from './pages/admin/RegistrationsList';
import GalleryManager from './pages/admin/GalleryManager';
import AdminDashboard from './pages/admin/Dashboard';

import DebugSupabase from './pages/DebugSupabase';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/activities" element={<ActivitiesList />} />
            <Route path="/admin/activities/new" element={<ActivityForm />} />
            <Route path="/admin/activities/edit/:id" element={<ActivityForm />} />
            <Route path="/admin/registrations" element={<RegistrationsList />} />
            <Route path="/admin/gallery" element={<GalleryManager />} />

            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            {/* Debug Route */}
            <Route path="/debug" element={<DebugSupabase />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

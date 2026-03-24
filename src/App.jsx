import { useState } from 'react';
import { LangProvider } from './LangContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Contact from './pages/Contact';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');
  const navigate = (p) => { setPage(p); window.scrollTo(0,0); };

  return (
    <LangProvider>
      <Navbar page={page} navigate={navigate} />
      {page === 'home'     && <Home navigate={navigate} />}
      {page === 'register' && <Register />}
      {page === 'contact'  && <Contact />}
      <Footer navigate={navigate} />
    </LangProvider>
  );
}

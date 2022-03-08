import React, { useState } from 'react';
import Navbar from './Navbar';
import './App.css';
import Home from './Home';
import Footer from './footer';
import DropdownMenu from './DropdonwMenu';

function App() {
  const [categorySelection, setCategorySelection] = useState('slice of life');

  const getCategorySelection = (selection) => {
    setCategorySelection(selection);
  };

  return (
    <div className="App">
      <Navbar />
      <DropdownMenu getCategorySelection={getCategorySelection} />
      <Home categorySelection={categorySelection} />
      <Footer />
    </div>
  );
}

export default App;

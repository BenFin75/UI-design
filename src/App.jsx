import React, { useState, useRef } from 'react';
import Navbar from './Navbar';
import './App.css';
import Home from './Home';
import Footer from './footer';
import DropdownMenu from './DropdownMenu/DropdonwMenu';
import OutsideClickListener from './OutsideClickListener';

function App() {
  const [categorySelection, setCategorySelection] = useState('slice of life');
  const menuUpdater = useRef(null);

  const getCategorySelection = (selection) => {
    setCategorySelection(selection);
  };

  return (
    <div className="App">
      <OutsideClickListener menuUpdater={menuUpdater}>
        <Navbar menuUpdater={menuUpdater} />
        <DropdownMenu getCategorySelection={getCategorySelection} menuUpdater={menuUpdater} />
      </OutsideClickListener>
      <Home categorySelection={categorySelection} menuUpdater={menuUpdater} />
      <Footer />
    </div>
  );
}

export default App;

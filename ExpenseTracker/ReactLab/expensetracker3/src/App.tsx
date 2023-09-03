import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShowList from './components/ShowList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Expensetracker from './components/Expensetracker';

function App() {

  const success=()=>{
    return false
  }

  const cancel=()=>{
    return false
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowList></ShowList>}></Route>
        <Route path="/add" element={<Expensetracker onTrue={success} onClose={cancel}></Expensetracker>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

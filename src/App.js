import './App.css';
import React from 'react';
import Toolbar from './Components/Toolbar';
import { Routes, Route } from 'react-router-dom';
import AddRecord from './Components/AddRecord';
import AddMoney from './Components/AddMoney';
import SpendOthers from './Components/SpendOthers';
import Reimbursements from './Components/Reimbursements';
import HomePage from './Pages/HomePage';
import Analysis from './Components/Analysis';

class App extends React.Component {
  render() {
    return (
      <div>
        <Toolbar />
        <Routes>
          <Route path='/add-record' element={<AddRecord />} />
          <Route path='/add-money' element={<AddMoney />} />
          <Route path='/spend-others' element={<SpendOthers />} />
          <Route path='/reimbursements' element={<Reimbursements />} />
          <Route path='/analysis' element={<Analysis />} />
          <Route path='/' exact element={<HomePage />} />
        </Routes>
      </div>
    );
  }
}

export default App;

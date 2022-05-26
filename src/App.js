
import React from 'react';
import '../src/css/App.css';
import SearchForm from './components/searchForms';
import UserInfo from './components/UserInfo';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';


function App() {
  return (
    
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SearchForm />} />
          <Route path="/user-info/:id" element={<UserInfo />} />
        </Routes>
      </Router>
    </div>
    
    );
  }

export default App;

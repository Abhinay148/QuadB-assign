// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Select from './Select';
import NewPage from './NewPage'; // Import the JobDetails component
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/select" element={<Select />} />
<Route exact key={"home"} path='/job/:id' element={<NewPage />} />

      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();

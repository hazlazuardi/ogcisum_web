import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Create from './pages/Create';
import Share from './pages/Share';
import Edit from './pages/Edit';
import Header from './components/Header/Header';
import { toneObject, toneTransport, tonePart } from "./data/instruments.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<App toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart} />} />
          <Route path="/create" element={<Create toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart} />} />
          <Route path="/share/:sampleId" element={<Share toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart} />} />
          <Route path="/edit/:sampleId" element={<Edit />} />
        </Routes>
      </Header>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


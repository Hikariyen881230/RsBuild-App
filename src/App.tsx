import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import QrcodeScanner from './components/qrcode-scanner';
import Home from './components/home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/qrcode-scanner" element={<QrcodeScanner />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

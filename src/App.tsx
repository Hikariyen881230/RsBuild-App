import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/home';
import StockCalculator from './pages/stock-calculator';
import QrcodeScan from './pages/qrcode-scan';
import Layout from './components/layout';
import CssTest from './pages/css-test';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/qrcode-scan" element={<QrcodeScan />} />
          <Route path="/stock-calculator" element={<StockCalculator />} />
          <Route path="/css-test" element={<CssTest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

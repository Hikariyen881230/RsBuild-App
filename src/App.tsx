import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/home';
import StockCalculator from './pages/stock-calculator';
import QrcodeScan from './pages/qrcode-scan';
import Layout from './components/layout';
import CssTest from './pages/css-test';
import React19 from './pages/react-19';
import { ColorContextProvider } from './context/color-context';
import { NumContextProvider } from './context/num-context';

const App = () => {
  return (
    <ColorContextProvider>
      <NumContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/qrcode-scan" element={<QrcodeScan />} />
              <Route path="/stock-calculator" element={<StockCalculator />} />
              <Route path="/css-test" element={<CssTest />} />
              <Route path="/react-19" element={<React19 />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NumContextProvider>
    </ColorContextProvider>
  );
};

export default App;

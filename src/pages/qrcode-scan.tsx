import { useState } from 'react';
import { useLocation } from 'react-router';
import QrcodeScanner from '../components/qrcode-scanner';

function QrcodeScan() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [text, setText] = useState(location.state?.decodedText ?? '');

  const handleScanned = (decodedText: string) => {
    setText(decodedText);
    setOpen(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto rounded-xl shadow-md space-y-4 border mt-5">
      <button
        className="bg-cyan-700 text-white rounded p-2 px-4 hover:bg-cyan-800 cursor-pointer transition-all duration-150"
        onClick={() => setOpen(true)}
      >
        點擊掃描QR Code
      </button>
      <div>
        解碼文字 : <input type="text" value={text} />
      </div>
      {open && <QrcodeScanner onScanned={handleScanned} />}
    </div>
  );
}

export default QrcodeScan;

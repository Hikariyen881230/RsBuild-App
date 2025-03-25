import { useState } from 'react';
import { Link, useLocation } from 'react-router';

function Home() {
  const location = useLocation();
  const [text, setText] = useState(location.state?.decodedText ?? '');
  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
      <Link to={'/qrcode-scanner'}>點擊掃描QR Code</Link>
      <div>
        QR-Code Text : <input type="text" value={text} onChange={handleText} />
      </div>
    </div>
  );
}

export default Home;

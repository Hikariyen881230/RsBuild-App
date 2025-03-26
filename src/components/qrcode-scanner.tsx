import { Html5QrcodeScanType, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import { useFetchCameras } from '../hooks/use-fetch-cameras';
import { Scanner } from './scanner';
import { useNavigate } from 'react-router';

const CONFIG = {
  fps: 4,
  qrbox: { width: 300, height: 200 },
  formatsToSupport: [
    Html5QrcodeSupportedFormats.CODE_128,
    Html5QrcodeSupportedFormats.QR_CODE,
  ],
  rememberLastUsedCamera: true,
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
};

const QRCODE_REGION = 'ADVANCED_EXAMPLE_QRCODE_REGION';

function QrcodeScanner() {
  const navigate = useNavigate();
  const [selectedCameraId, setSelectedCameraId] = useState<string | undefined>(
    undefined,
  );
  const {
    fetchCameras,
    state: { loading, error, cameraDevices },
  } = useFetchCameras();

  useEffect(() => {
    fetchCameras();
  }, []);

  const onScanned = (text: string) => {
    navigate('/', { state: { decodedText: text } });
  };

  if (loading) {
    return <h3>Detecting available cameras...</h3>;
  }

  if (error) {
    return <h3>Failed to detect cameras</h3>;
  }

  if (cameraDevices.length === 0) {
    return <h3>No available cameras</h3>;
  }

  return (
    <div style={{ width: 450, height: 300 }}>
      <Scanner
        config={CONFIG}
        onCodeScanned={onScanned}
        qrcodeRegionId={QRCODE_REGION}
        cameraId={selectedCameraId ?? cameraDevices[0].id}
      />
      {cameraDevices.length > 1 && (
        <select
          defaultValue={cameraDevices[0].id}
          onChange={(event) => {
            setSelectedCameraId(event.target.value);
          }}
        >
          {cameraDevices.map((device) => (
            <option key={device.id} value={device.id} label={device.label} />
          ))}
        </select>
      )}
    </div>
  );
}

export default QrcodeScanner;

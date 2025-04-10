import { Html5QrcodeScanType, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import { useFetchCameras } from '../hooks/use-fetch-cameras';
import { Scanner } from './scanner';

const CONFIG = {
  fps: 4,
  qrbox: { width: 300, height: 250 },
  formatsToSupport: [
    Html5QrcodeSupportedFormats.CODE_128,
    Html5QrcodeSupportedFormats.QR_CODE,
  ],
  rememberLastUsedCamera: true,
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
};

const QRCODE_REGION = 'ADVANCED_EXAMPLE_QRCODE_REGION';

function QrcodeScanner({ onScanned }: { onScanned: (text: string) => void }) {
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

  const onScanSuccess = (text: string) => {
    onScanned(text);
  };

  if (loading) {
    return <h3>檢查可使用的相機...</h3>;
  }

  if (error) {
    return <h3>偵測相機失敗</h3>;
  }

  if (cameraDevices.length === 0) {
    return <h3>無可用的相機</h3>;
  }

  return (
    <div>
      <Scanner
        config={CONFIG}
        onCodeScanned={onScanSuccess}
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

import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useRef, useState } from 'react';
import {
  Html5QrcodeCameraScanConfig,
  Html5QrcodeConfigs,
} from 'html5-qrcode/esm/html5-qrcode';

export interface Html5QrcodeScannerConfig
  extends Html5QrcodeCameraScanConfig,
    Html5QrcodeConfigs {}

enum SCANNER_STATE {
  Initial = 'initial',
  Starting = 'starting',
  Started = 'started',
  StartingFailed = 'startingFailed',
  StoppingFailed = 'stoppingFailed',
}

interface IScannerProps {
  config: Html5QrcodeScannerConfig;
  cameraId: string;
  onCodeScanned: (code: string) => void;
  qrcodeRegionId: string;
  className?: string;
}

export const Scanner = ({
  config,
  qrcodeRegionId,
  cameraId,
  onCodeScanned,
  className,
}: IScannerProps) => {
  const html5Qrcode = useRef<null | Html5Qrcode>(null);
  const scannerStateRef = useRef<SCANNER_STATE>(SCANNER_STATE.Initial);
  const [error, setError] = useState<string | null>(null);

  const stopScanner = async () => {
    if (html5Qrcode.current?.isScanning) {
      try {
        await html5Qrcode.current.stop();
        scannerStateRef.current = SCANNER_STATE.Initial;
      } catch (err) {
        setError('停止相機失敗');
        throw new Error(err as string);
      }
    }
  };

  // 在組件卸載時和相機切換前調用
  useEffect(() => {
    if (!html5Qrcode.current && qrcodeRegionId) {
      html5Qrcode.current = new Html5Qrcode(qrcodeRegionId);
    }
    return () => {
      stopScanner();
    };
  }, []);

  useEffect(() => {
    const startScanner = async () => {
      if (
        html5Qrcode.current &&
        scannerStateRef.current !== SCANNER_STATE.Starting
      ) {
        try {
          scannerStateRef.current = SCANNER_STATE.Starting;

          // 先停止當前相機
          if (html5Qrcode.current.isScanning) {
            await html5Qrcode.current.stop();
          }

          // 啟動新相機
          await html5Qrcode.current.start(
            { facingMode: { exact: 'environment' } },
            config,
            onCodeScanned,
            () => {},
          );

          scannerStateRef.current = SCANNER_STATE.Started;
          setError(null);
        } catch (err) {
          setError('相機切換失敗');
          scannerStateRef.current = SCANNER_STATE.StartingFailed;
          throw new Error(err as string);
        }
      }
    };

    startScanner();
  }, [cameraId]);

  return (
    <div>
      <div id={qrcodeRegionId} className={className} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanType } from 'html5-qrcode/esm/core';
import {
  Html5QrcodeCameraScanConfig,
  Html5QrcodeConfigs,
} from 'html5-qrcode/esm/html5-qrcode';

export interface Html5QrcodeScannerConfig
  extends Html5QrcodeCameraScanConfig,
    Html5QrcodeConfigs {
  rememberLastUsedCamera?: boolean | undefined;
  supportedScanTypes: Array<Html5QrcodeScanType> | [];
}

enum PluginState {
  Initial = 'initial',
  Starting = 'starting',
  Started = 'started',
  StartingFailed = 'startingFailed',
  StoppingFailed = 'stoppingFailed',
}

interface IHtmlQrcodeAdvancedPluginProps {
  config: Html5QrcodeScannerConfig;
  cameraId: string;
  onCodeScanned: (code: string) => void;
  qrcodeRegionId: string;
  className?: string;
}

export interface IHtmlQrcodePluginForwardedRef {
  pause: () => void;
  resume: () => void;
}

export const Scanner = ({
  config,
  qrcodeRegionId,
  cameraId,
  onCodeScanned,
  className,
}: IHtmlQrcodeAdvancedPluginProps) => {
  const html5Qrcode = useRef<null | Html5Qrcode>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!html5Qrcode.current) {
      html5Qrcode.current = new Html5Qrcode(qrcodeRegionId);
    }
    const prevQrcodeRegionId = qrcodeRegionId;
    return () => {
      if (html5Qrcode.current && prevQrcodeRegionId !== qrcodeRegionId) {
        // stopping due changed qrcodeRegionId
        html5Qrcode.current
          ?.stop()
          .then(() => {
            // camera stopped
          })
          .catch(() => {
            // camera failed to stop
          });
      }
    };
  }, [qrcodeRegionId]);

  const pluginStateRef = useRef<PluginState>(PluginState.Initial);

  useEffect(() => {
    const startScanner = async () => {
      if (
        html5Qrcode.current &&
        pluginStateRef.current !== PluginState.Starting
      ) {
        try {
          pluginStateRef.current = PluginState.Starting;

          // 先停止當前相機
          if (html5Qrcode.current.isScanning) {
            await html5Qrcode.current.stop();
          }

          // 啟動新相機
          await html5Qrcode.current.start(
            cameraId,
            config,
            onCodeScanned,
            () => {},
          );

          pluginStateRef.current = PluginState.Started;
          setError(null);
        } catch (err) {
          console.error('Camera switch failed:', err);
          setError('相機切換失敗');
          pluginStateRef.current = PluginState.StartingFailed;
        }
      }
    };

    startScanner();
  }, [cameraId]);

  const stopScanner = async () => {
    if (html5Qrcode.current?.isScanning) {
      try {
        await html5Qrcode.current.stop();
        pluginStateRef.current = PluginState.Initial;
      } catch (err) {
        console.error('停止相機失敗:', err);
      }
    }
  };

  // 在組件卸載時和相機切換前調用
  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div>
      <div id={qrcodeRegionId} className={className} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

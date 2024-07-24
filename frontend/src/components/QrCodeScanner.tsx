import React, { useState, useRef, useEffect } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { Button } from "@mui/material";
import useTrackUsage from "../hooks/useTrackUsage";

const QrCodeScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const { trackUsage, loading, error, success, subscription } = useTrackUsage();
  const qrCodeRegionId = "html5qr-code-full-region";
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    html5QrCodeRef.current = new Html5Qrcode(qrCodeRegionId);
    return () => {
      if (
        html5QrCodeRef.current?.getState() === Html5QrcodeScannerState.SCANNING
      ) {
        html5QrCodeRef.current.stop().catch((err) => {
          console.error("Unable to stop scanning: ", err);
        });
      }
    };
  }, []);

  const startScanning = async () => {
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText: string) => {
            setScanResult(decodedText);
            trackUsage(decodedText);
            stopScanning(); // Automatically stop scanning after a successful scan
          },
          (errorMessage: string) => {
            console.error("Error scanning QR Code: ", errorMessage);
          }
        );
        setIsScanning(true);
      } catch (err) {
        console.error("Unable to start scanning: ", err);
      }
    }
  };

  const stopScanning = () => {
    if (
      html5QrCodeRef.current?.getState() === Html5QrcodeScannerState.SCANNING
    ) {
      html5QrCodeRef.current.stop().catch((err) => {
        console.error("Unable to stop scanning: ", err);
      });
      setIsScanning(false);
    }
  };

  return (
    <div>
      <h2>Scan User QR Code</h2>
      <Button
        variant="contained"
        onClick={isScanning ? stopScanning : startScanning}
      >
        {isScanning ? "Stop Scanning" : "Start Scanning"}
      </Button>
      <div id={qrCodeRegionId} style={{ marginTop: "20px" }}></div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <div>
          <p style={{ color: "green" }}>{success}</p>
          {subscription && (
            <div>
              <p>Loyalty Program: {subscription}</p>
              <p>Usage Count: {subscription}</p>
            </div>
          )}
        </div>
      )}
      {scanResult && <p>Scanned QR Code: {scanResult}</p>}
    </div>
  );
};

export default QrCodeScanner;

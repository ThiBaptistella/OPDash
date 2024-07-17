import React, { useState, useEffect } from "react";

const NFCReader: React.FC = () => {
  const [status, setStatus] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const startScan = async () => {
    if ("NDEFReader" in window) {
      const ndef = new (window as any).NDEFReader();

      try {
        await ndef.scan();
        setStatus(
          "NFC scan started successfully. Hold your device near an NFC tag."
        );

        ndef.onreading = (event: any) => {
          const { message, serialNumber } = event;
          let outputText = `Serial Number: ${serialNumber}\n`;

          for (const record of message.records) {
            outputText += `Record type: ${record.recordType}\n`;
            outputText += `MIME type: ${record.mediaType}\n`;
            outputText += `Data: ${new TextDecoder().decode(record.data)}\n`;
          }

          setOutput(outputText);

          // You can handle the data here or send it to your backend
          alert(outputText);
        };

        ndef.onreadingerror = () => {
          setStatus("Error reading NFC tag. Please try again.");
        };
      } catch (error) {
        setStatus(`NFC scan failed: ${error}`);
      }
    } else {
      setStatus(
        "Web NFC is not supported on this device. Please use a compatible Android device."
      );
    }
  };

  useEffect(() => {
    startScan();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>NFC Reader</h1>
      <div id="status" style={{ margin: "20px 0" }}>
        {status}
      </div>
      <pre id="output">{output}</pre>
    </div>
  );
};

export default NFCReader;

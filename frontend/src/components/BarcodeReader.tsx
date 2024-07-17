// src/components/BarcodeReader.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  useHtml5QrCodeScanner,
  useAvailableDevices,
} from "react-html5-qrcode-reader";
import useProducts from "../hooks/useProducts";

const html5QrCodeScannerFile = process.env.PUBLIC_URL + "/html5-qrcode.min.js";

const BarcodeReader: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { Html5QrcodeScanner } = useHtml5QrCodeScanner(html5QrCodeScannerFile);
  const { devices, error } = useAvailableDevices(html5QrCodeScannerFile);
  const { lookupProductBySKU } = useProducts();
  const [product, setProduct] = useState<any>(null);
  const [status, setStatus] = useState<string>("");
  const scannerRef = useRef<any>(null); // Ref to store the scanner instance

  useEffect(() => {
    if (Html5QrcodeScanner && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );
      scannerRef.current.render(async (data: any) => {
        setStatus("Barcode scanned successfully.");
        try {
          const productData = await lookupProductBySKU(data);
          setProduct(productData);
        } catch (error) {
          setProduct(null);
          setStatus(`Error fetching product data: ${(error as any).message}`);
        }
      });
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((error: any) => {
          console.error("Failed to clear html5QrcodeScanner:", error);
        });
        scannerRef.current = null;
      }
      // onClose();
    };
  }, [Html5QrcodeScanner, lookupProductBySKU, onClose]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Barcode Reader</h1>
      <div id="reader"></div>
      {error && `Devices error: ${error}`}
      {devices && (
        <div>
          <span>Available devices are:</span>
          <ul>
            {devices.map((v) => (
              <li key={v.id}>
                id: {v.id}
                <br />
                label: {v.label}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div id="status" style={{ margin: "20px 0" }}>
        {status}
      </div>
      {product && (
        <div>
          <h2>Product Details</h2>
          <p>
            <strong>Product Name:</strong> {product.productName}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Category:</strong> {product.productCategory}
          </p>
          <p>
            <strong>Supply Price:</strong> {product.supplyPrice}
          </p>
          <p>
            <strong>Retail Price:</strong> {product.retailPrice}
          </p>
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>Supplier Code:</strong> {product.supplierCode}
          </p>
          <p>
            <strong>Inventory:</strong> {product.inventory}
          </p>
          <p>
            <strong>Active:</strong> {product.active}
          </p>
        </div>
      )}
    </div>
  );
};

export default BarcodeReader;

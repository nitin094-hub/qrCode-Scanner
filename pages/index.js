import Head from "next/head";
import Image from "next/image";
import { useEffect, useReducer, useState } from "react";
import styles from "../styles/Home.module.css";
import { Html5Qrcode } from "html5-qrcode";

export default function Home() {
  const [second, setSecond] = useState(false);
  useEffect(() => {
    function onScanSuccess(decodedText, decodedResult) {
      console.log(`Scan result: ${decodedText}`, decodedResult);
      setSecond(true);
      // html5QrcodeScanner.clear();
      html5QrcodeScanner
        .stop()
        .then((ignore) => {})
        .catch((err) => {});
    }

    var html5QrcodeScanner = new Html5Qrcode("reader1", {
      fps: 10,
      qrbox: 250,
    });
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrcodeScanner.start(
      { facingMode: "environment" },
      config,
      onScanSuccess
    );
  }, []);
  useEffect(() => {
    if (second) {
      function onScanSuccess(decodedText, decodedResult) {
        console.log(`Scan result: ${decodedText}`, decodedResult);
        html5QrcodeScanner
        .stop()
        .then((ignore) => {})
        .catch((err) => {});
      }
      var html5QrcodeScanner = new Html5Qrcode("reader2", {
        fps: 10,
        qrbox: 250,
      });
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      html5QrcodeScanner.start(
        { facingMode: "environment" },
        config,
        onScanSuccess
      );
    }
  }, [second]);

  return (
    <>
      <div
        className={styles.container}
        style={{ width: "20rem", height: "20rem" }}
        id="reader1"
      ></div>
      <div
        className={styles.container}
        style={{ width: "20rem", height: "20rem" }}
        id="reader2"
      ></div>
    </>
  );
}

import React, { useState, useEffect, useRef } from 'react';

// --- QR Code Generator Component (No changes needed, this code is correct) ---
/**
 * A component that generates and displays a QR code that refreshes at a set interval.
 * This component now uses the qrcode.js library, which is loaded dynamically by the main App component.
 * @param {object} props - The component props.
 * @param {object} props.classInfo - Information about the class session to be encoded in the QR code.
 * @param {number} [props.refreshRate=5000] - The refresh rate of the QR code in milliseconds. Defaults to 5 seconds.
 */
export const QRCodeGenerator = ({ classInfo, refreshRate = 5000 }) => {
  const [qrValue, setQrValue] = useState('');
  const qrRef = useRef(null);

  // Effect to generate the QR value string
  useEffect(() => {
    const generateQrValue = () => {
      const timestamp = Date.now();
      const data = JSON.stringify({
        classId: classInfo?.id || 'default-class-id',
        subject: classInfo?.subject || 'default-subject',
        timestamp: timestamp,
      });
      console.log(`New QR Value Generated: ${data}`); // For debugging
      setQrValue(data);
    };

    generateQrValue();
    const intervalId = setInterval(generateQrValue, refreshRate);
    return () => clearInterval(intervalId);
  }, [classInfo, refreshRate]);

  // Effect to render the QR code using the vanilla JS library
  useEffect(() => {
    if (qrValue && qrRef.current && typeof QRCode !== 'undefined') {
        // Clear previous QR code before generating a new one
        qrRef.current.innerHTML = '';
        // Create new QR code
        new QRCode(qrRef.current, {
            text: qrValue,
            width: 192,
            height: 192,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }
  }, [qrValue]); // Re-run this effect whenever the qrValue changes

  return (
    <div className="bg-white p-4 rounded-lg shadow-inner flex items-center justify-center w-[224px] h-[224px]">
      <div ref={qrRef}>
        {!qrValue && (
            <div className="w-48 h-48 flex items-center justify-center text-gray-500">
             Generating QR Code...
            </div>
        )}
      </div>
    </div>
  );
};


// --- QR Code Scanner Component for Student (CORRECTED FIX) ---
/**
 * A component to scan QR codes using the device's camera.
 * @param {object} props - The component props.
 * @param {function} props.onScanSuccess - Callback function executed on a successful scan, passing the decoded data.
 * @param {function} props.onScanError - Callback function for handling errors.
 */
export const QRCodeScanner = ({ onScanSuccess, onScanError }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const isInitialized = useRef(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isInitialized.current) {
        return;
    }
      
    if (typeof jsQR === 'undefined') {
      setError("Scanning library not ready. Please wait.");
      return;
    }
      
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId = null;

    const tick = () => {
      if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code) {
          onScanSuccess(code.data);
          return; // Stop scanning after success
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(stream => {
        streamRef.current = stream; 
        if (video) {
            video.srcObject = stream;
            video.setAttribute("playsinline", true);
            video.play().catch(e => {
                if (e.name !== 'AbortError') {
                    console.error("Video play error:", e);
                }
            });
            animationFrameId = requestAnimationFrame(tick);
        }
        // Mark as initialized so this block doesn't run again on the Strict Mode re-mount.
        isInitialized.current = true;
      })
      .catch(err => {
        console.error("Camera access error:", err);
        setError("Could not access camera. Please check permissions.");
        if(onScanError) onScanError(err);
      });

    return () => {
      // This cleanup function will stop the camera stream when the component is truly unmounted.
      cancelAnimationFrame(animationFrameId);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      // **FIX:** We no longer reset the initialization flag here. This was the source of the bug.
    };
  }, [onScanSuccess, onScanError]);

  return (
    <div className="relative w-full max-w-xs mx-auto aspect-square bg-gray-900 rounded-lg overflow-hidden">
      <video ref={videoRef} className="w-full h-full object-cover" playsInline />
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="absolute inset-0 border-4 border-dashed border-white/50 rounded-lg"></div>
      {error && <p className="absolute bottom-2 left-2 right-2 bg-red-800/80 text-white text-xs text-center p-2 rounded">{error}</p>}
    </div>
  );
};


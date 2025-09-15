import React, { useState, useEffect, useRef } from 'react';

// --- QR Code Scanner Component for Student ---
/**
 * A component to scan QR codes using the device's camera.
 * @param {object} props - The component props.
 * @param {function} props.onScanSuccess - Callback function executed on a successful scan, passing the decoded data.
 * @param {function} props.onScanError - Callback function for handling errors.
 */
const QRCodeScanner = ({ onScanSuccess, onScanError }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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
          return;
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
                if (e.name !== 'AbortError') console.error("Video play error:", e);
            });
            animationFrameId = requestAnimationFrame(tick);
        }
      })
      .catch(err => {
        console.error("Camera access error:", err);
        setError("Could not access camera. Please check permissions.");
        if(onScanError) onScanError(err);
      });

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
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

export default QRCodeScanner;


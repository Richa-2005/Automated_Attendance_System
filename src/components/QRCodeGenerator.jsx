import React, { useState, useEffect, useRef } from 'react';

/**
 * A component to scan QR codes using the device's camera.
 * @param {object} props - The component props.
 * @param {function} props.onScanSuccess - Callback function executed on a successful scan.
 * @param {function} props.onScanError - Callback function for handling errors.
 * @param {object} props.controlRef - A ref object from the parent to expose a 'stop' function.
 */
const QRCodeScanner = ({ onScanSuccess, onScanError, controlRef }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameId = useRef(null); // Use a ref to store the animation frame ID
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof jsQR === 'undefined') {
      setError("Scanning library not ready. Please wait.");
      return;
    }
      
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    
    const stopScanning = () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };

    // --- NEW: Expose the stop function via the controlRef ---
    // This allows the parent component (CheckInModal) to stop the scan on demand.
    if (controlRef) {
      controlRef.current = {
        stop: stopScanning,
      };
    }

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
          // A QR code was found. Let the parent handle it.
          // The parent is now responsible for calling stop() via the ref.
          onScanSuccess(code.data);
          return; // Stop the tick loop for this frame
        }
      }
      animationFrameId.current = requestAnimationFrame(tick);
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
            animationFrameId.current = requestAnimationFrame(tick);
        }
      })
      .catch(err => {
        console.error("Camera access error:", err);
        setError("Could not access camera. Please check permissions.");
        if(onScanError) onScanError(err);
      });

    // The cleanup function will run when the component is unmounted
    return () => {
      stopScanning();
    };
  }, [onScanSuccess, onScanError, controlRef]);

  return (
    <div className="relative w-full max-w-xs mx-auto aspect-square bg-gray-900 rounded-lg overflow-hidden">
      <video ref={videoRef} className="w-full h-full object-cover" playsInline />
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-0" />
      <div className="absolute inset-0 border-4 border-dashed border-white/50 rounded-lg"></div>
      {error && <p className="absolute bottom-2 left-2 right-2 bg-red-800/80 text-white text-xs text-center p-2 rounded">{error}</p>}
    </div>
  );
};

export default QRCodeScanner;

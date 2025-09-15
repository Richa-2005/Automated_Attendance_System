import React, { useState, useEffect, useCallback } from 'react';
import { Fingerprint } from 'lucide-react';

const BiometricAuth = ({ onSuccess }) => {
  const [status, setStatus] = useState('Ready');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  // Helper functions to encode/decode credential IDs for storage
  const bufferEncode = (value) => btoa(String.fromCharCode.apply(null, new Uint8Array(value))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const bufferDecode = (value) => Uint8Array.from(atob(value.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0)).buffer;

  useEffect(() => {
    // Check if WebAuthn is supported by the browser
    if (window.PublicKeyCredential && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(supported => {
        setIsSupported(supported);
        if (!supported) {
          setStatus('Biometric authentication is not supported on this browser.');
        } else {
            // Check if a credential is already stored locally
            if (localStorage.getItem('webauthnCredentialId')) {
              setIsRegistered(true);
              setStatus('Device already registered. Ready to authenticate.');
            }
        }
      });
    }
  }, []);

  const handleRegister = useCallback(async () => {
    try {
      setIsLoading(true);
      setStatus('Awaiting biometric registration...');
      
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);
      
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: { name: "ClassSync Attendance", id: window.location.hostname },
          user: { id: new Uint8Array(16), name: "student@example.com", displayName: "Student" },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }], // ES256
          authenticatorSelection: { authenticatorAttachment: "platform", userVerification: "required" },
          timeout: 60000,
          attestation: "none"
        }
      });

      localStorage.setItem('webauthnCredentialId', bufferEncode(credential.rawId));
      setIsRegistered(true);
      setStatus('Registration successful! You can now authenticate.');
    } catch (err) {
      setStatus(`Registration failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAuthenticate = useCallback(async () => {
    try {
      setIsLoading(true);
      setStatus('Awaiting biometric authentication...');
      
      const credentialId = localStorage.getItem('webauthnCredentialId');
      if (!credentialId) {
        setStatus('No credential registered for this device.');
        setIsLoading(false);
        return;
      }
      
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);
      
      await navigator.credentials.get({
        publicKey: {
          challenge,
          allowCredentials: [{ id: bufferDecode(credentialId), type: 'public-key' }],
          userVerification: "required"
        }
      });

      setStatus('Authentication successful! You are verified.');
      // Call the success callback passed from the parent component
      onSuccess();
    } catch (err) {
      setStatus(`Authentication failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [onSuccess]);

  const handleReset = () => {
    localStorage.removeItem('webauthnCredentialId');
    setIsRegistered(false);
    setStatus('Registration has been reset.');
  };

  if (!isSupported) {
    return (
        <div className="text-center p-4 bg-red-100 rounded-lg">
             <p className="font-bold text-red-700">Biometrics Not Supported</p>
             <p className="text-sm text-red-600">Your browser or device does not support biometric authentication.</p>
        </div>
    );
  }

  return (
    <div className="text-center p-4 border rounded-lg">
      <p className="text-gray-600 mb-4 text-sm">For security, please verify your identity using your device's biometrics (fingerprint/face recognition).</p>
      
      <div className="space-y-3">
        {!isRegistered && (
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Register This Device'}
            </button>
        )}
        
        {isRegistered && (
            <button
              onClick={handleAuthenticate}
              disabled={isLoading}
              className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Authenticate Attendance'}
            </button>
        )}
      </div>

      <div className="mt-4 p-2 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-700">Status: <span className="font-semibold">{status}</span></p>
      </div>
      
      <button
        onClick={handleReset}
        className="mt-2 text-xs text-gray-500 hover:underline"
      >
        Reset Biometric Registration
      </button>
    </div>
  );
};

export default BiometricAuth;

